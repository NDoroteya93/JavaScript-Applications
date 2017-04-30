'use strict';


import { requester } from 'requester';

const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
    LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';


class ToDoModel {
    constructor() {

    }

    getList() {
        let headers = { 'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY) }
        return requester.get('api/todos', headers)
            .then((res) => {
                console.log(res);
                return res;
            })
    }

    createToDo(todo) {
        debugger;
        const header = { 'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY) }
        return requester.post('api/todos', todo, header)
            .then((resp) => {
                console.log(resp);
                return resp.result;
            });
    }

    changeState() {

    }


}


export { ToDoModel };