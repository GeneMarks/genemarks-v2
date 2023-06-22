import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { serializeNonPOJOs, getPocketImageURL } from '$lib/server/utils';

export const load = async ({ locals }) => {

    const getUserInfo = async () => {
        try {
            const info = serializeNonPOJOs(
                await locals.pb.collection('users').getOne(env.POCKETBASE_ADMIN_ID)
            );

            info.avatar = getPocketImageURL('users', env.POCKETBASE_ADMIN_ID, info.avatar);
            info.banner = info.banner ? getPocketImageURL('users', env.POCKETBASE_ADMIN_ID, info.banner) : null;

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