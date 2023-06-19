import { error } from '@sveltejs/kit';
import { serializeNonPOJOs, getPocketImageURL } from '$lib/server/utils';
import parseMarkDown from '$lib/server/markdown-parser';

export const load = async ({ locals, params }) => {

    const getSeason = async (slug) => {
        console.log(slug)
        try {
            const season = serializeNonPOJOs(
                await locals.pb.collection('season').getFirstListItem(`slug="${slug.toLowerCase()}"`, {
                    expand: 'parent_review',
                })
            );

            const { visibility, expand, ...rest } = season;

            if (visibility === 'private') {
                throw error(404)
            }
            
            const parent = expand.parent_review;
            console.log(parent);

            return {
                ...rest,
                body: await parseMarkDown(season.body),
                cover: getPocketImageURL(season.collectionId, season.id, season.cover),
                logo: getPocketImageURL(parent.collectionId, parent.id, parent.logo),
                parent: parent
            };
        } catch (err) {
            console.log(err);
            throw error(err.status, 'Season not found.');
        }
    };

    return {
        season: getSeason(params.slug)
    };
};