'use strict';

// post message
function postMessage() {
    let request = new XMLHttpRequest(); // new request 

    request.open('POST', '/log.php'); // post to seerver-side script
    // Send message in plain-text, as the request body
    request.setRequestHeader('Content-Type', // Reqquest body will plain text
        "text/plain;charset=UTF-8");

    request.send(msg); // send msg as the request body
    // The request is done. Ignore any response or any error
};

postMessage();

// Getting an HTTP response onreadystatechange

// Issue an HTTP GET request for the contents of the specified URL 
// When the response arrives successfully, verify that it is plain text
// and if so, pass it to the specidied callback function 

function getText(url, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', url); // specify url to fetch
    request.onreadystatechange = function() { // define event listener
        // if request is complete and was successfull
        if (request.readyState === 4 && request.status === 200) {
            let type = request.getResponseHeader('Content-Type');
            if (type.match(/^text/)) { // make sure rresponse is text
                callback(request.responseText);
            }
        };

    }
    request.send(null); // send to request now

}

// Synchronous responses 

function getTextSyncc(url) {
    let request = new XMLHttpRequest();
    request.open('GET', url, false); // passs false for synchronous 

    requst.send(null);

    if (request.status !== 200) throw new Error(request.statusText);

    // throw an error if type is wrong
    let type = request.getResponseHeader('Content-Type');

    if (!type.match(/^text/)) throw new Error();

    return request.responseText;
}

// Parsing the HTTP response 

function get(url, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.onreadystatechange = function() {
        if (request.status === 200 && request.readyState === 4) {
            let type = request.getResponseHeader('Content-Type');
            // Check type so we don;t get html documents in the future
            if (type.indexOf('xml') !== -1 && request.responseXML) {
                callback(request.responseXML); // Document response
            } else if (type === 'application/json') {
                callback(JSON.parse(request.responseText)); // JSON response text
            } else {
                callback(request.responseText);
            }
        }
    }
}

// Encoding an object for an HTTP request 

// Encode the properties of an object as if they were name/value pairs from 
// an HTML form, usin application/x-www-form-unreloaded format

function encodeFormData(data) {
    if (!data) {
        return ''; // always return a string
    }

    let pairs = []; // to hold namme=value pairs 
    for (const name in data) {
        if (!data.hasOwnProperty(name)) continue; // skip inherited
        if (typeof data[name] === 'function') continue; // skip methods
        let value = data[name].toString();
        name = encodeURIComponent(name.replace(' ', '+')); // encoded name
        value = encodeURIComponent(value.replace(' ', '+')); // encode value
        pairs.push(name + '=' + value);
    }

    return pairs.join('&'); // return joined pairs separated with &
}

// MMaking an HTTP Post request with form-encoded data 
function postData(url, data, callback) {
    let request = new XMLHttpRequest();
    request.open('POST', url);
    request.onreadystatechange = function() {
        if (request.status === 200 && request.readyState === 4) {
            callback(request);
        };

        request.setRequestHeader('Content-Type',
            'application/x-www-form-unreloaded');

        request.send(encodeFormData(data)); // Seend form-encoded data

    }
}


// Making GET request with form-encoded data
function getData(url, data, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', url + '?' + encodeFormData(data));
    request.onreadystatechange = function() {
        if (request.status === 200 && request.readyState === 4) {
            callback(request);
        };
        request.send(null);
    }
}

// Making an HTTP POST request with a JSON-encoded body
function postJSON(url, data, callback) {
    let request = new XMLHttpRequest();
    request.open('POST', url);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            callback(request);
        }

        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(data));
    }
}

// HTTP POST request with an XML document as its body
function postQuery(url, what, where, radius, callback) {
    let request = new XMLHttpRequest();
    request.open('POST', url);
    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
            callback(request)
        }
    }

    // Create an XML document with root element <query>
    let doc = document.implementation.createDocument('', 'query', null);
    let query = doc.documentElement; // the <query> ellement
    let find = doc.createElement('find'); // create <find> element
    query.appendChild(find);
    find.setAttribute('zipcode', where);
    find.setAttribute('radius', radius);
    find.appendChild(doc.createTextNode(what)); // And set content to <find>

    reques.send(doc);
}


/////////////////////// FILE UPLOAD //////////////////////

// Find all <input type='file'/> elemments with a datta-uploadto setAttribute
// and register an onchange handler so that any sselected file is 
// automatically POSTED to the specified 'uploadto' URL. The server's response is ignored 

whenReady(function() { // run when the document is ready
    let elts = document.getElementsByTagName('input');
    for (let i = 0; i < elts.length; ++i) {
        let input = elts[i];
        if (input.type !== 'file') continue;
        let url = input.getAttribute('data-uploadto');
        if (!url) continue

        input.addEventListener('change', function() { // when user select file
            let file = this.files[0]; // assume a single file selection
            if (!file) return;
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url); // POST to the url 
            xhr.send(file); // sennd the fila as boddy
        }, false)
    }
});

// POST multipartform-data request body
function postFormData(url, data, callback) {
    if (typeof FormData === 'undefined') {
        throw new Error();
    }

    let request = new XMLHttpRequest();
    request.open('POST', url);

    request.onreadystatechange = function() {
        if (request.readyState === 4 && request.state === 200) {
            callback(request);
        }

        let formdata = new FormData();
        for (const name in data) {
            if (!data.hasOwnProperty(name)) continue;
            let value = data[name];
            if (typeof value === 'function') continue

            // each properties becomes one 'part' of the request
            // file object are allowed here 
            formdata.append(name, value);
        }

        // send the name/value pairs in a multpart/form-data request body. 
        // Each pair is one part of the request. Note that send automatically setts
        // the Content-Type header when you pass it a FormData object

        request.send(formdata);

        request.onprogress = function(e) {
            if (e.lengthComputable) {
                progress.innerHTML = Math.round(100 * e.loaded / e.total) + '% Complete';
            }
        }
    }
}