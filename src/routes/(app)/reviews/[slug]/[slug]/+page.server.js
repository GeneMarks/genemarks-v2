import { error } from '@sveltejs/kit';
import { serializeNonPOJOs, getPocketImageURL } from '$lib/server/utils';
import parseMarkDown from '$lib/server/markdown-parser';

export const load = async ({ locals, params }) => {

    const getSeason = async (slug) => {
        try {
            const season = serializeNonPOJOs(
                await locals.pb.collection('seasons').getFirstListItem(`slug="${slug.toLowerCase()}"`, {
                    expand: 'parent_review',
                })
            );

            const {
                visibility,
                expand,
                ...rest } = season;

            if (visibility === 'private') {
                throw error(404)
            }

            const {
                id: parentId,
                collectionId: parentCollectionId,
                title: parentTitle,
                logo: parentLogo,
                slug: parentSlug } = expand.parent_review;


            // Get all seasons from parent
            const parentExpand = serializeNonPOJOs(
                await locals.pb.collection('reviews').getOne(parentId, {
                    fields: 'expand',
                    expand: 'seasons(parent_review)',
                })
            );

            const seasons = parentExpand.expand['seasons(parent_review)']
                ?.filter(item => item.visibility === 'published')
                .map(({ body, ...rest }) => rest)
                .sort((a, b) => a.season_number - b.season_number);
            
            
            return {
                ...rest,
                body: await parseMarkDown(season.body),
                cover: getPocketImageURL(season.collectionId, season.id, season.cover),
                logo: getPocketImageURL(parentCollectionId, parentId, parentLogo),
                parentSlug,
                parentTitle,
                seasons
            };
        } catch (err) {
            console.log(err);
            throw error(404);
        }
    };

    return {
        season: getSeason(params.slug)
    };
};