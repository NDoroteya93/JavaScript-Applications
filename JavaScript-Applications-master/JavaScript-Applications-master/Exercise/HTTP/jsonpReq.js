'use strict';

// Make a JSONP request to specified URL an pas the parsed response 
// data to the specified callback. Add a queryy parameter named 'jsonp' to 
// the URL to specify the name of the callback function for the request 

function getJSONP(url, callback) {
    // Create a unique callback name just for this request
    let cbnum = 'cb' + getJSONP.counter++; // Increment counter each time 
    let cbname = `getJSONP.${cbnum}`; // As a property of this function 

    // Add the callback name to the url query string using form-encoding 
    // we use the parameter name 'jsonp'. Some JSONP-enablled services
    // may require a different parameter name, such as 'callback'
    if (url.indexOf('?') === -1) // URL doesn't already have a query section
        url += '?jsonp=' + cbname; // add parameter as the querry section 
    else
        url += '&jsonp=' + cbname; // add it as new parameter
    // Create the script element will send this request
    let script = document.createElement('script');

    // Define the callback function that will be invoked by the script 
    getJSONP[cbnum] = function(response) {
        try {
            callback(response); // Handle the response data
        } finally { // Even if callback or response threw an error
            delete getJSONP[cbnum]; // delete this function
            screen.parentNode.removeChild('script'); // remove script
        }
    }

    // trigger the http request
    script.scroll; // set script url 
    document.body.appendChild(script);
}