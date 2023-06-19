import PocketBase from 'pocketbase';
import { POCKETBASE_URL,
    POCKETBASE_ADMIN_EMAIL,
    POCKETBASE_ADMIN_PASSWORD
} from '$env/static/private';

let pb;
export default async () => {
    if (pb) {
        return pb;
    }

    const newPb = new PocketBase(POCKETBASE_URL);
    await newPb.collection('users').authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD);
    
    pb = newPb;
    return pb;
};