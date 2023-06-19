import { error } from '@sveltejs/kit';
import { POCKETBASE_ADMIN_ID } from '$env/static/private';
import { serializeNonPOJOs, getPocketImageURL } from '$lib/server/utils';

export const load = async ({ locals }) => {

    const getUserInfo = async () => {
        try {
            const info = serializeNonPOJOs(
                await locals.pb.collection('users').getOne(POCKETBASE_ADMIN_ID)
            );

            info.avatar = getPocketImageURL('users', POCKETBASE_ADMIN_ID, info.avatar);
            info.banner = info.banner ? getPocketImageURL('users', POCKETBASE_ADMIN_ID, info.banner) : null;

            return info;
        } catch (err) {
            console.log(err);
            throw error(404);
        }
    };
    

    return {
        user: getUserInfo()
    };
}