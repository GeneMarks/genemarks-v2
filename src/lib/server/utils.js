import { POCKETBASE_PUBLIC_URL } from '$env/static/private';

export const serializeNonPOJOs = (obj) => {
    return structuredClone(obj);
};

export const getPocketImageURL = (collectionId, recordId, fileName, size='0x0') => {
    return `${POCKETBASE_PUBLIC_URL}/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
};