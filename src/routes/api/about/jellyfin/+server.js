import { json } from '@sveltejs/kit';
import { serializeNonPOJOs, getPocketImageURL } from '$lib/server/utils';
import dayjs from '$lib/server/day';
import { env } from '$env/dynamic/private';


export const POST = async ({ locals }) => {

    let jfWatched;

    const fetchJfWatched = async () => {
        try {
            const watched = serializeNonPOJOs(
                await locals.pb.collection('jellyfin_watched').getFullList({
                    sort: '-datetime',
                })
            );

            return watched;
        } catch (err) {
            console.log(err);
        }
    }

    const fetchData = async () => {
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Mediabrowser Token=${env.JELLY_API_KEY}`
        };
        const url = `https://${env.JELLY_HOST}/Users/${env.JELLY_USER_ID}/Items?limit=${env.JELLY_ITEM_LIMIT}&recursive=true&sortOrder=Descending&includeItemTypes=Episode&includeItemTypes=Movie&sortBy=DatePlayed&isPlayed=true`;

        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            return jfWatched;
        }

        const data = await response.json();
        await syncDb(data);

        jfWatched = await fetchJfWatched();
        return jfWatched;
    }

    const fetchImg = async (jfItem) => {
        const imgType = jfItem.SeriesName ? 'Primary' : 'Backdrop';
        const url = `https://${env.JELLY_HOST}/Items/${jfItem.Id}/Images/${imgType}?maxWidth=480&quality=96`;
        
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], 'thumb.webp', { type: 'image/webp' });

        return file;
    }

    const syncDb = async (data) => {
        for (const jfItem of data.Items) {
            const formData = new FormData();
            formData.append('plays', jfItem.UserData.PlayCount);
            formData.append('title', jfItem.Name);
            formData.append('datetime', jfItem.UserData.LastPlayedDate);
            formData.append('series', jfItem.SeriesName ?? '');

            const thumb = await fetchImg(jfItem);
            formData.append('thumb', thumb ?? null)

            await locals.pb.collection('jellyfin_watched').create(formData);
        }

        jfWatched = await fetchJfWatched();

        // Delete oldest records until there are only x amount
        if (jfWatched.length < env.JELLY_ITEM_LIMIT) return;

        const oldestItems = [...jfWatched]
            .sort((a, b) => new Date(b.created) - new Date(a.created))
            .slice(env.JELLY_ITEM_LIMIT);

        for (const item of oldestItems) {
            await locals.pb.collection('jellyfin_watched').delete(item.id);
        }
    }
    
    const getWatchedItems = async () => {
        let items;

        jfWatched = await fetchJfWatched();

        const currentDate = new Date();
        const latestItemDate = new Date(jfWatched[0]?.created);
        const latestItemAge = (currentDate - latestItemDate) / 1000;
        
        if (jfWatched && ( latestItemAge < env.JELLY_CACHE_TIMEOUT )) {
            items = jfWatched;
        } else {
            items = await fetchData();
        }

        const formattedItems = items.map(item => {
            const {
                collectionName,
                collectionId,
                id,
                created,
                updated,
                expand,
                ...rest } = item;

            return {
                ...rest,
                thumb: getPocketImageURL(collectionId, id, item.thumb),
                datetime: dayjs.tz(item.datetime).format('M/D/YYYY')
            };
        });

        return formattedItems;
    }

    const response = await getWatchedItems();
    return json(response);
};