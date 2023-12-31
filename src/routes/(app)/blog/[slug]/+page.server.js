import { error } from '@sveltejs/kit';
import { serializeNonPOJOs, getPocketImageURL } from '$lib/server/utils';
import parseMarkDown from '$lib/server/markdown-parser';
import dayjs from 'dayjs';

export const load = async ({ locals, params }) => {

    const getArticle = async (slug) => {
        try {
            const article = serializeNonPOJOs(
                await locals.pb.collection('articles').getFirstListItem(`slug="${slug.toLowerCase()}"`)
            );

            const { visibility, ...rest } = article;

            if (visibility === 'private') {
                throw error(404)
            }

            const newDatetime = dayjs.tz(article.datetime);

            return {
                ...rest,
                body: await parseMarkDown(article.body),
                thumb: getPocketImageURL(article.collectionId, article.id, article.thumb),
                datetime: newDatetime.format('MMMM D, YYYY'),
                age: newDatetime.fromNow(),
                isNew: dayjs().diff(newDatetime, 'day') < 7
            };
        } catch (err) {
            console.log(err);
            throw error(404);
        }
    };

    return {
        article: getArticle(params.slug)
    };
};