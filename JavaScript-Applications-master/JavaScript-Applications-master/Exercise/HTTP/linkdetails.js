'use strict';

// finds all <a> elements that have an href attribute
// but not tiltle attribute and add an onmouseover event handler to
// them. The evenet handler makes an XMLHtttpRequest HEAD request to fetch
// details about the linked resources, and then sets those details in the title
// attribute of the link so that the will to displayed as a tooltip

whenReady(function() {
    // Is there any chance that cross-origin request will succeed?
    let supportsCORS = (new XMLHttpRequest().withCredentials != undefined);

    // Loop throught all links in the document
    let links = document.getElementsByTagName('a');

    for (let i = 0; i < links.length; i++) {
        let link = links[i];
        if (!link.href) continue;
        if (link.title) continue;

        // if this cross-origin link 
        if (link.host !== location.host || link.protocol !== localStorage.protocol) {
            link.title = 'Off-site link'; // Assume we can't get any more info 
            if (!supportsCORS) continue; // quit now if no CORS support 

        }

        // Register event handler to download link details on onmouseover
        if (link.addEventListener) {
            link.addEventListener('mouseover', mouseoverHandler, false);
        } else {
            link.attachEvent('onmouseover', mouseoverHandler);
        }
    }

    function mouseoverHandler(e) {
        let link = e.target || e.srcElement; // that <a> elements
        let url = link.href;

        let req = new XMLHttpRequest();
        req.open('HEAD', url); // ask for just the header
        req.onreadystatechange = function() {
            if (req.readyState !== 4) return;
            if (req.status === 200) {
                let type = req.getResponseHeader('Content-Type'); // get
                let size = req.getResponseHeader('Content-Length'); // link
                let date = req.getResponseHeader('Last-Modified'); //details
                link.title = `Type: ${type} \n Size: ${size} \n Date: ${date}`;
            } else {
                // If request failed and the link doesnt already have an 
                // 'Of-site link' tooltip, then display the error.
                if (!link.title) {
                    link.title = `Culdn't fetch details \n ${req.status} ${req.statusText}`;
                }
            };

        }
        req.send(null);

        // Remove handler we only want to fetch these header once
        if (link.removeEventListener) {
            link.removeEventListener('mouseover', mouseoverHandler, false);
        } else {
            link.detachEvent('onmouseover', mouseoverHandler);
        }
    }
})