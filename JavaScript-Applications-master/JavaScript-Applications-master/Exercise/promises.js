'use strict';

// promises
(function() {
    navigator.geolocation.getCurrentPosition(function(pos) {
        console.log(pos);

        var src = "https://maps.googleapis.com/maps/api/staticmap?center=" + pos.coords.latitude + "," + pos.coords.longitude + "&zoom=13&scale=false&size=600x300&maptype=roadmap&format=png&visual_refresh=true",
            map = document.createElement('img');
        map.setAttribute('src', src);


    }, function error(err) {

    });
})