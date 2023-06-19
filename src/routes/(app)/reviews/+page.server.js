import { error, redirect } from '@sveltejs/kit';
import { types, sorts, genres } from '$lib/review-params';
import { serializeNonPOJOs, getPocketImageURL } from '$lib/server/utils';

export const load = async ({ locals, url }) => {

    const validParams = {
        type: types,
        genre: genres,
        sort: sorts,
    };

    const params = {
        type: url.searchParams.get('type') ?? null,
        genre: url.searchParams.get('genre') ?? null,
        sort: url.searchParams.get('sort') ?? null,
    };

    const allParamsValid = Object.entries(params).every(([key, value]) => {
        if (value === null) {
            return true;
        }

        return validParams[key]?.includes(value);
    });

    if (!allParamsValid) {
        throw redirect(303, '/reviews');
    }


    // Construct filter options    
    const typeFilter = params.type
        ? `&& type = "${params.type}"`
        : '';

    const genreFilter = params.genre
        ? `&& genres ~ "${params.genre}"`
        : '';

    const filter = `visibility = "published"
        ${typeFilter}
        ${genreFilter}`;
    
    
    // Construct sorting option
    const sortMap = {
        'new': '-datetime',
        'old': 'datetime',
        'likes': '-likes'
    };
    
    const sort = sortMap[params.sort] || '-datetime';
    
    
    const page  = Number(url.searchParams.get('page')) || 1;
    const limit = 12;

    const getReviews = async () => {
        try {
            const reviews = serializeNonPOJOs(
                await locals.pb.collection('reviews').getList(page, limit, {
                    filter: filter,
                    sort: sort
                })
            );

            const formattedReviews = {
                ...reviews,
                items: reviews.items.map(item => {
                    const { body, ...rest } = item;

                    return {
                        ...rest,
                        animated_preview: item.animated_preview
                            ? getPocketImageURL(item.collectionId, item.id, item.animated_preview)
                            : null,
                        thumb: getPocketImageURL(item.collectionId, item.id, item.thumb)
                    };
                })
            };

            return formattedReviews;
        } catch (err) {
            console.log(err);
            throw error(404);
        }
    };

    return {
        reviews: getReviews()
    };
};