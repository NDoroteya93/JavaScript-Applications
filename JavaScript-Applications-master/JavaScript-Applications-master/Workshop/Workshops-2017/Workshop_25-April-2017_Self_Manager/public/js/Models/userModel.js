'use strict';

import { requester } from 'requester';

const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
    LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

class userModel {
    constructor() {
        this._users = requester.get('api/users');
    }

    get users() {
        return this._users;
    }

    getList() {
        return this.users;
    }

    register(username, passHash) {
        var body = {
            username: username,
            passHash: passHash
        }
        return requester.post('http://localhost:3013/api/users', body);
    }

    login(username, passHash) {
        const body = {
            username: username,
            passHash: passHash
        };

        return requester.put('http://localhost:3013/api/users/auth', body);
    }

    logout() {

    }
}

export { userModel };