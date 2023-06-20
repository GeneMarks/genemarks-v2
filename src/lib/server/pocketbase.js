import PocketBase from 'pocketbase';
import { POCKETBASE_URL,
    POCKETBASE_ADMIN_EMAIL,
    POCKETBASE_ADMIN_PASSWORD
} from '$env/static/private';


export const pb = new PocketBase(POCKETBASE_URL);
await pb.collection('users').authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD);