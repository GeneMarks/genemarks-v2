import { error } from '@sveltejs/kit';
import { serializeNonPOJOs, getPocketImageURL } from '$lib/server/utils';
import parseMarkDown from '$lib/server/markdown-parser';
import dayjs from 'dayjs';

export const load = async ({ locals, params }) => {

    const getReview = async (slug) => {
        try {
            const review = serializeNonPOJOs(
                await locals.pb.collection('reviews').getFirstListItem(`slug="${slug.toLowerCase()}"`, {
                    expand: 'seasons(parent_review)',
                })
            );

            const { visibility, expand, ...rest } = review;

            if (visibility === 'private') {
                throw error(404)
            }
            
            const seasons = expand['seasons(parent_review)']
                ?.filter(item => item.visibility === 'published')
                .map(({ body, ...rest }) => rest)
                .sort((a, b) => a.season_number - b.season_number);


            return {
                ...rest,
                body: await parseMarkDown(review.body),
                cover: getPocketImageURL(review.collectionId, review.id, review.cover),
                logo: getPocketImageURL(review.collectionId, review.id, review.logo),
                seasons: seasons,
                hasNewSeason: seasons?.some(item => dayjs().diff(dayjs.tz(item.datetime), 'day') < 7)
            };
        } catch (err) {
            console.log(err);
            throw error(err.status, 'Review not found.');
        }
    };

    return {
        review: getReview(params.slug)
    };
};