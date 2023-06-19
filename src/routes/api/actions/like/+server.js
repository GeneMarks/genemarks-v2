import { error, json } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/server/utils';

export const POST = async ({ locals, request }) => {

    const response = await request.json();
    const { id, collectionName } = response;

    try {
        const record = serializeNonPOJOs(
            await locals.pb.collection(collectionName).getOne(id)
        );

        const { likes } = record;

        await locals.pb.collection(collectionName).update(id, {
            "likes": likes + 1
        });
    } catch (err) {
        console.log(err);
        throw error(404);
    }

    return json({
        status: 200
    });
};