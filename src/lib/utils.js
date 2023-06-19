export const capitalize = (word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;

export const getParam = (param, url) => url.searchParams.get(param);

export const setParam = (url, key, val) => {
    const newURL = new URL(url);

    if (val) {
        newURL.searchParams.set(key, val);
    } else {
        newURL.searchParams.delete(key);
    }

    // Always reset page param
    newURL.searchParams.delete('page');
    
    return newURL;
};

export const changePage = (url, pageNumber) => {
    const newURL = new URL(url);
    newURL.searchParams.set('page', pageNumber)
    
    return newURL;
};