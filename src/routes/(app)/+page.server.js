import { error } from '@sveltejs/kit';
import {
    serializeNonPOJOs,
    getPocketImageURL,
    shuffle }
from '$lib/server/utils';
import dayjs from '$lib/server/day';

export const load = async ({ locals }) => {

    const featuredLimit = 5;
    const rowLimit      = 6;
    const articlesLimit = 4;

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

    const getLatestArticles = async () => {
        try {
            const articles = serializeNonPOJOs(
                await locals.pb.collection('articles').getList(1, articlesLimit, {
                    filter: 'visibility = "published"',
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
            throw error(err.status, err.message);
        }
    };

    return {
        featuredReviews: await getFeaturedReviews(),
        latestReviews: await getLatestReviews(),
        likedReviews: await getLikedReviews(),
        latestArticles: await getLatestArticles()
    };
};