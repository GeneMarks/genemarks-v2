import { error, redirect } from '@sveltejs/kit';
import { tags } from '$lib/article-params';
import { serializeNonPOJOs, getPocketImageURL } from '$lib/server/utils';
import dayjs from '$lib/server/day';

export const load = async ({ locals, url }) => {

    const validParams = {
        tag: tags,
    };

    const params = {
        tag: url.searchParams.get('tag') ?? null,
    };

    const allParamsValid = Object.entries(params).every(([key, value]) => {
        if (value === null) {
            return true;
        }

        return validParams[key]?.includes(value);
    });

    if (!allParamsValid) {
        throw redirect(303, '/blog');
    }


    // Construct filter options    
    const tagFilter = params.tag
        ? `&& tag = "${params.tag}"`
        : '';

    const filter = `visibility = "published"
        ${tagFilter}`;
    
    
    const page  = Number(url.searchParams.get('page')) || 1;
    const limit = 8;

    const getArticles = async () => {
        try {
            const articles = serializeNonPOJOs(
                await locals.pb.collection('articles').getList(page, limit, {
                    filter: filter,
                    sort: '-datetime'
                })
            );

            const formattedArticles = {
                ...articles,
                items: articles.items.map(item => {
                    const { datetime, body, ...rest } = item;

                    const newDatetime = dayjs.tz(datetime);

                    return {
                        ...rest,
                        thumb: getPocketImageURL(item.collectionId, item.id, item.thumb),
                        datetime: newDatetime.format('MMMM D, YYYY'),
                        age: newDatetime.fromNow(),
                        isNew: dayjs().diff(newDatetime, 'day') < 7
                    };
                })
            };

            return formattedArticles;
        } catch (err) {
            console.log(err);
            throw error(404);
        }
    };

    const getUsedTags = async () => {
        const usedTags = serializeNonPOJOs(
            await locals.pb.collection('articles').getFullList({
                fields: 'tag'
            })
        );

        return usedTags.map(item => item.tag);
    };

    return {
        articles: getArticles(),
        usedTags: getUsedTags()
    };
};