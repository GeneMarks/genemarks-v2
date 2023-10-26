import { building } from '$app/environment';
import PocketBase from 'pocketbase';
import { env } from '$env/dynamic/private';

export let pb;


if (!building) {
    pb = new PocketBase(env.POCKETBASE_URL);
    pb.autoCancellation(false);
}

export const authPb = async (pb) => {
    if (pb.authStore.isValid) return;
    await pb.collection('users').authWithPassword(env.POCKETBASE_ADMIN_EMAIL, env.POCKETBASE_ADMIN_PASSWORD);
};