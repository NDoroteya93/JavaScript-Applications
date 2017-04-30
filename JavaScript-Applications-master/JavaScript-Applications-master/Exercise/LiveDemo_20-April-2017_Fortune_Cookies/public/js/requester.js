// query requester 

function request(url, type, body, headers) {
    const promise = new Promise((resolve, reject) => $.ajax({
        url,
        type,
        contentType: 'application/json',
        headers,
        data: body,
        success: resolve,
        error: reject
    }));

    return promise;
}

function get(url) {
    return request(url, 'GET', '', {});
}

function post(url, body, headers = {}) {
    return request(url, 'POST', JSON.stringify(body), headers);
}

function put(url, body, headers = {}) {
    return request(url, 'PUT', JSON.stringify(body), headers);
}

const requester = {
    get,
    post,
    put
};

export { requester };