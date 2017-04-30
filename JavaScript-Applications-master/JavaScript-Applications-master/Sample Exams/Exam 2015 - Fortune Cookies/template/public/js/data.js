import * as requester from 'requester';


// get data from server 
export function getUsers() {
    // Add authentication

    return requester.get('api/users'); // promise
}

export function getCookies() {
    return requester.get('api/cookies');
}