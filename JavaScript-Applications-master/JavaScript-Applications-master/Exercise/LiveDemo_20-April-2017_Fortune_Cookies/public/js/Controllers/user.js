import * as data from 'data';
import { load as loadTemplate } from 'templates';

const $appContainer = $('#app-container');
const LOCALSTORAGE_AUTH_KEY_NAME = 'authkey';
const AUTH_KEY_HEADER = 'x-auth-key';

function get(params) {
    const { category } = params;
    loadTemplate('auth')
        .then((template) => {
            $appContainer.html(template());
        });
}

function login() {
    const username = $('#input-username').val();
    const password = $('#input-password').val();
    const passHash = password; // HASH ME

    data.login(username, passHash)
        .then(result => {
                localStorage.setItem(LOCALSTORAGE_AUTH_KEY_NAME, result.result.authKey);
                $('#auth-btn').addClass('hidden');
                $('#logout-btn').removeClass('hidden');
                location.href = '#/home';
            },
            errorMsg => toastr.error(errorMsg))
}

function register() {
    const username = $('#input-username').val();
    const password = $('#input-password').val();
    const passHash = password; // HASH ME

    data.register(username, passHash)
        .then(
            result => {
                toastr.success(`User ${username} registered successfully`);
                login()
            },
            errorMsg => toastr.error(errorMsg));
}


function logout() {
    localStorage.removeItem(LOCALSTORAGE_AUTH_KEY_NAME)
    $('#auth-btn').removeClass('hidden');
    $('#logout-btn').addClass('hidden');

}
export {get, login, logout, register };