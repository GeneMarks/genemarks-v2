import { pb, authPb } from '$lib/server/pocketbase';

export const handle = async ({ event, resolve }) => {
    event.locals.pb = pb;
    await authPb(event.locals.pb);
    const response = await resolve(event);
    
    return response;
}