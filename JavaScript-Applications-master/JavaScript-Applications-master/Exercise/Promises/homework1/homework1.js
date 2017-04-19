'use strict';

(function() {
    let getCurrentLocation = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            resolve(position);
        });
    });

    function parseCoords(pos) {
        return {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
        }
    };

    function initMap(pos) {
        let src = `https://maps.googleapis.com/maps/api/staticmap?center=${pos.latitude},${pos.longitude}&markers=color:red%7Clabel:You%7C${pos.latitude},${pos.longitude}&zoom=17&size=500x500&sensor=false&`,
            img = document.createElement('img');
        img.setAttribute('src', src);

        let map = document.getElementById('map').appendChild(img);
    }



    getCurrentLocation
        .then(parseCoords)
        .then(initMap)
        .catch((error) => {
            let header = document.querySelector('h3');
            header.innerHTML(error.message);
        });
}());