'use strict';

import { userModel } from 'userModel';
import { loadTemplate } from 'loadTemplate';

const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
    LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

class UserController {
    constructor() {
        this._userModel = new userModel;
        this._container = $('#container');
    }

    get userModel() {
        return this._userModel;
    }

    get container() {
        return this._container;
    }

    getTemplate() {
        let lodaTemplate = new loadTemplate('userLoginView');
        lodaTemplate.getTemplate()
            .then(template => {
                this.container.html(template());
            });
    }


    login() {
        const username = $('#input-username').val();
        const password = $('#input-password').val();
        const passHash = sha1(password).toString();

        this.userModel.login(username, passHash)
            .then(result => {
                    let user = result.result;
                    localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, user.username);
                    localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY, user.authKey);
                    $('.signed-user').removeClass('hidden');
                    $('.unsigned-user').addClass('hidden');
                    toastr.success(`Hi, ${username}`);
                    location.href = '#/home';
                },
                errMsg => {
                    toastr.error(`Hi, ${username}`);
                });


    }

    register() {
        const username = $('#reg-username').val();
        const password = $('#reg-password').val();
        const passHash = sha1(password).toString();
        this.userModel.register(username, passHash)
            .then((resp) => {
                    toastr.success(`User ${username} registered successfully`);
                    location.href = '#/login'
                },
                errorMsg => toastr.error(errorMsg));
    }

    logout() {
        localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
        localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
        $('.signed-user').addClass('hidden');
        $('.unsigned-user').removeClass('hidden');

        location.href = '#/home';
    }
}

export { UserController };