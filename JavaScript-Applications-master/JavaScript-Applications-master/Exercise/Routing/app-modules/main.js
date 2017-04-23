'use strict';


// init Navigo 

// $(() => {
//     const result = $('#result'),
//         router = new Navigo(null, false); // Navigo(root, useHash);

//     function print(text) {
//         result.text(JSON.stringify(text));
//     }

//     router.on('test/?:query', (params) => { // localhost/#test
//             console.log(params);
//             console.log(params.query);
//             print(params);
//             print(getQueryParams(params.query));
//         })
//         .on('book/:id/:noteId/?:query', (params) => print(params))
//         .on('book/:id/note/:noteId', print)
//         .on({
//             'book/:id/?:query': params => {
//                 console.log(params);
//                 console.log(params.query);
//                 print(params)
//                 print(getQueryParams(params.query))
//             },
//             'book/:id': params => print(params), // all routs lead to home
//             '*': () => print('home')
//         }).resolve();
// });

// function getQueryParams(query) {
//     let hash, vars = {},
//         hashes = query.substr(1)
//         .split('&').forEach(val => {
//             hash = val.split('=');
//             vars[hash[0]] = hash[1];
//         });
//     return vars;
// }

$(() => {
    const GLYPH_UP = 'glyphicon-chevron-up',
        GLYPH_DOWN = 'glyphicon-chevron-down',
        root = $('#root'),
        navbar = root.find('nav.navbar'),
        mainNav = navbar.find('#main-nav'),
        contentContainer = $('#root #content'),
        loginForm = $('#login'),
        logoutForm = $('#logout'),
        usernameSpan = $('#span-username'),
        usernameInput = $('#login input'),
        alertTemplate = $($('#alert-template').text());

    (function checkForLoginUser() {
        data.users.current()
            .then((user) => {
                if (user) {
                    usernameSpan.text(user);
                    loginForm.addClass('hidden');
                    logoutForm.removeClass('hidden');
                }
            });
    })();

    function showMessage(msg, type, cssClass, delay) {
        let container = alertTemplate.clone(true)
            .addClass(cssClass).text(`${type}: ${msg}`)
            .appendTo(root);

        setTimeout(() => {
            container.remove();
        }, delay || 2000);
    }

    // start threads 
    function loadThreadContent(threads) {
        let container = $($('#threads-container-template').text()),
            threadsContainer = container.find('#thread');

        function getThreadUI(title, id, creator, date) {
            let template = $($('#thread-template').text()).attr('data-id', id),
                threadTitle = template.find('.thread-title').text(title),
                threadCreator = template.find('.thread-creator').text(creator || 'anonymous'),
                threadDate = template.find('.thread-date').text(date || 'unknown');

            return template.clone(true);
        }

        function getAddNewThreadUI() {
            let template = $($('#thread-new-template').html());
            return template.clone(true);
        }

        threads.forEach((th) => {
            let currentThreadUI = getThreadUI(th.title, th.id, th.username, th.date);
            threadsContainer.append(currentThreadUI);
        });

        threadsContainer.append(getAddNewThreadUI());

        contentContainer.find('#container-threads').remove();
        contentContainer.html('').prepend(container);
    }

    function loadMessageContent(data) {
        let container = $($("#messages-container-template").text()),
            messageContainer = container.find('.panel-body');

        container.attr('data-thread-id', data.result.id);
    }

    function getMsgUI(msg, author, date) {
        let template = $($('#messages-template').text());
        template.find('.message-content').text(msg);
        template.find('.message-creator').text(author || 'anonymous');
        template.find('message-date').text(date || 'unknown');
        return template.clone(true);
    }

    function getAddNewMsgUI() {
        let template = $($('#message-new-template').html());
        return template.clone(true);
    }

    if (data.result.messages && data.result.messages.length > 0) {
        data.result.messages.forEach((msg) => {
            messageContainer.append(getMsgUI(msg));
        });
    } else {
        messageContainer.append(getMsgUI('No messages!'));
    }
    messageContainer.append(getAddNewMsgUI());

    container.find('.thread-title').text('data.result.title');
})