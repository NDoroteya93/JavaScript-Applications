'use strict';

/////////////////// Callback Hell 
let orders = [];
fetchOrder(function() {
    renedrOderOnPage(function() {
        checkUserLocation(function() {
            calcTax(function() {
                // etc
            });
        });
    });
})

// XHR // 

let request = new XMLHttpRequest();
request.onreadystatechange =
    responseMethod;
request.open('GET', 'http: //example.com');
request.send();

Fetch('http://example.com').then(function(response) {
    responseMethod(response);
});



///// Fetch Request /////
fetch(url).them(function(response) {
    if (!response.ok) {
        throw new Error(response.responseText);
    }

    return (response.json());
}).then(function(response) {
    updateUISuccess(response);
}).catch(function() {
    updateUIError();
});

function updateUISuccess(response) {
    let condition = response.weather[0].main;
    let degC = response.main.temp - 273.15;
    let degCInt = Math.floor(degC);
    let degF = degC * 1.8 + 32;
    let degFInt = Math.floor(degF);
    let weatherBox = document.getElementById('element');
    weatherBox.innerHTML = '<p>' + degCInt + '</p>'
}