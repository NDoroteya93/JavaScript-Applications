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
        let src = "https://maps.googleapis.com/maps/api/staticmap?center=" + pos.latitude + "," + pos.longitude + "&zoom=17&size=500x500&sensor=false",
            map = document.getElementById('map');
        map.setAttribute('src', src);

        // let marker = new google.maps.Marker({
        //     position: pos,
        //     map: map
        // });
    }

    getCurrentLocation
        .then(parseCoords)
        .then(initMap)
        .catch();
}());