import { error, json } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/server/utils';
import dayjs from '$lib/server/day';

export const GET = async ({ locals, url }) => {

    const page = Number(url.searchParams.get('page')) || 1;
    const limit = 6;
    
    const getUpdates = async () => {
        try {
            const updates = serializeNonPOJOs(
                await locals.pb.collection('profile_updates').getList(page, limit, {
                    sort: '-datetime',
                })
            );

            const formattedUpdates = {
                ...updates,
                items: updates.items.map(item => ({
                    ...item,
                    datetime: dayjs.tz(item.datetime).fromNow()
                }))
            };

            return formattedUpdates;
        } catch (err) {
            console.log(err);
        }
    }

    const response = await getUpdates();
    return json(response);
};