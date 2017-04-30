'use strict';

function request(url, type, options, headers) {
    const promise = new Promise((resolve, reject) => {
        $.ajax({
            url,
            type,
            headers,
            options,
            success: resolve,
            error: reject
        })
    });

    return promise;
}

export default function get(url) {
    return request(url, 'GET', {}, {});
}

export function post(url) {
    return request(url, 'POST', {}, {});
}

export function put(url) {
    return request(url, 'PUT', {}, {})
}
const requester = {
    get,
    post,
    put
}

export { requester }