import { error } from '@sveltejs/kit';
import {
    serializeNonPOJOs,
    getPocketImageURL,
    shuffle }
from '$lib/server/utils';

export const load = async ({ locals }) => {

    const featuredLimit = 5;
    const rowLimit = 6;

    const getFeaturedReviews = async () => {
        try {
            const reviews = serializeNonPOJOs(
                await locals.pb.collection('reviews').getList(1, featuredLimit, {
                    filter: 'visibility = "published" && featured = true'
                })
            );

            const formattedReviews = {
                ...reviews,
                items: reviews.items.map(item => {
                    const { body, ...rest } = item;

                    return {
                        ...rest,
                        cover: getPocketImageURL(item.collectionId, item.id, item.cover),
                        logo: getPocketImageURL(item.collectionId, item.id, item.logo)
                    };
                })
            };

            shuffle(formattedReviews.items)
            return formattedReviews;
        } catch (err) {
            console.log(err);
            throw error(err.status, err.message);
        }
    };

    const getLatestReviews = async () => {
        try {
            const reviews = serializeNonPOJOs(
                await locals.pb.collection('reviews').getList(1, rowLimit, {
                    filter: 'visibility = "published"',
                    sort: '-datetime'
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
            throw error(err.status, err.message);
        }
    };

    const getLikedReviews = async () => {
        try {
            const reviews = serializeNonPOJOs(
                await locals.pb.collection('reviews').getList(1, rowLimit, {
                    filter: 'visibility = "published"',
                    sort: '-likes'
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
            throw error(err.status, err.message);
        }
    };

    return {
        featuredReviews: await getFeaturedReviews(),
        latestReviews: await getLatestReviews(),
        likedReviews: await getLikedReviews()
    };
};