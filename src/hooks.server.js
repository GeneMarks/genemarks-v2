import { pb } from '$lib/server/pocketbase';

export const handle = async ({ event, resolve }) => {
    event.locals.pb = pb;
    const response = await resolve(event);
    
    return response;
}