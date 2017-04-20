'use strict';

// Issue an HTTP GET request for the contents of the specified URL.
// If the response arrives successfully, pass responseText to the callback 
// If the response does not arrive in less than timeout ms, abort the request
// Browser may fire 'readystatechange' after abort(), and if a partial 
// request has been recieved, the status property may even be set, so we need 
// to set a flag so that we don`t invoke the callback for a partial. 
// timed-out response. This problem does not arise if we use the load event 

function timedGetText(url, timeout, callback) {
    let request = new XMLHttpRequest();
    let timedout = false; // Whether we timed out or not
    // Start a timer tha will abort the request after timeout ms 
    let timer = setTimeout(function() {
        timedout = true; // set a flag and then
        request.abort(); // abort the request
    }, timeout);

    request.open('GET', url);

    request.onreadystatechange = function() {
        if (request.readyState !== 4) return; // ignore incomplete request

        if (timedout) return; // ignore aborted request

        clearTimeout(timer); /// cancel pending timeout 

        if (request.status === 200) {
            callback(request.responseText); // pass response to callbaack
        };

        request.send(null);

    }
}