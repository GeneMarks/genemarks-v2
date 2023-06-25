import { error, json } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/server/utils';

export const GET = async ({ locals }) => {

    const getRandURL = async () => {
        try {
            const reviews = serializeNonPOJOs(
                await locals.pb.collection('reviews').getFullList({
                    filter: 'visibility = "published"'
                })
            );

            const articles = serializeNonPOJOs(
                await locals.pb.collection('articles').getFullList({
                    filter: 'visibility = "published"'
                })
            );

            const reviewURLs = reviews.map(item => `/reviews/${item.slug}`);
            const articleURLs = articles.map(item => `/blog/${item.slug}`);
            const allURLs = [...reviewURLs, ...articleURLs];

            return allURLs[Math.floor(Math.random() * allURLs.length)];
        } catch (err) {
            console.log(err);
            throw error(500);
        }
    };

    return json({
        url: await getRandURL()
    });
};