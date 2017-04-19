'use strict';

(function() {


    let popup = document.createElement('div'),
        body = document.querySelector('body').appendChild(popup);
    popup.style.border = '1px solid black';
    popup.style.width = '20%';
    popup.style.height = '200px';
    popup.style.padding = '5px';
    popup.style.textAlign = 'center';
    popup.style.fontSize = '24px';
    popup.style.margin = '10% auto';

    popup.innerHTML = 'Hello, Pesho!'


    let promise = new Promise((resolve, reject) => {
        setTimeout(resolve, 2000);
    });

    promise.then(() => {
        window.location.href = "https://telerikacademy.com/";
    })
}());