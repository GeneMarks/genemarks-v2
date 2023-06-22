import { building } from '$app/environment';
import PocketBase from 'pocketbase';
import { POCKETBASE_URL,
    POCKETBASE_ADMIN_EMAIL,
    POCKETBASE_ADMIN_PASSWORD
} from '$env/static/private';

export let pb;

if (!building) {
    pb = new PocketBase(POCKETBASE_URL);
    await pb.collection('users').authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD);
    pb.autoCancellation(false);
}