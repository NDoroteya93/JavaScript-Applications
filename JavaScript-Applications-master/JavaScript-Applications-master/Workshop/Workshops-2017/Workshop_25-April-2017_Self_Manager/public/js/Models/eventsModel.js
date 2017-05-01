'use strict';

import { requester } from 'requester';

const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
    LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

class EventModel {
    constructor() {

    }

    getList() {
        let headers = { 'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY) }
        return requester.get('api/events', headers)
            .then((res) => {
                console.log(res);
                return res;
            });
    }

    createEvents(events) {
        debugger;
        const header = { 'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY) }
        return requester.post('api/events', events, header)
            .then((resp) => {
                console.log(resp);
                return resp.result;
            });
    }
}

export { EventModel };