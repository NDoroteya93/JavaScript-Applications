import * as data from 'data';

function myCookieController() {
    return data.getMyCookie('api/my-cookie');
}

export { myCookieController };