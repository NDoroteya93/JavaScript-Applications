// get cookies
// get users
// Models 

import { requester } from 'requester';

function getUsers() {

    // authentication

    // return promise 
    return requester.get('api/users');
}

// get cookies
function getCookies() {
    return requester.get('api/cookies');
}

function login(username, passHash) {
    const body = {
        username,
        passHash
    }
    return requester.put('api/auth', body);
}

function register(username, passHash) {
    const body = {
        username,
        passHash
    };

    return requester.post('api/users', body);
}
export { getUsers, getCookies, login, register };