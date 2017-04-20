'use strict';

// onprogress and onload 
if ('onprogress' in (new XMLHttpRequest())) {
    // progress events are suported
}

// Monitoring HTTP upload progress

// Find all elements of class 'fileDropTarget' and register DnD event handlers
// to make them respond to file drops. When files are dropped, upload them to 
// the URL specified in the data-uploadto attribute
whenReady(function() {
    let elts = document.getElementsByClassName('fileDropTarget');

    for (let i = 0; i < elts.length; i++) {
        let target = elts[i];
        let url = target.getAttribute('data-uploadto');
        if (!url) continue;

        createFileUploadDropTarget(target.url);
    }

    function createFileUploadDropTarget(target, url) {
        // Keep track of wheather we're curently uploading something so we can 
        // reject drops.. We could handle mupltiple concurrent uploads, but 
        // that would make progress notification too tricky for this example 
        let uploading = false;

        console.log(target.url);

        target.ondragenter = function(e) {
            console.log('dragenter');

            if (uploading) return; // Ignore drags if we're busy
            let types = e.dataTransfer.types;

            if (type &&
                ((types.contains && types.contains('Files')) ||
                    (types.indexOf && types.indexOf('Files') !== -1))) {
                target.classList.add('wantdrop');
                return false;
            }
        };

        target.ondragover = function(e) {
            if (!uploading) return false;
        };

        target.ondragleave = function(e) {
            if (!uploading) target.classList.remove('wantdrop');
        };

        target.ondrop = function(e) {
            if (uploading) {
                return false;
            }
            let files = e.dataTransfer.files;

            if (files && files.length) {
                uploading = true;

                let message = 'Uploading files: <ul>';

                for (let i = 0; i < files.length; i++) {
                    message += '<li>' + files[i].name + '</li>';
                    message += '</ul>';

                    target.innerHTML = message;
                    target.classList.remove('wantdrop');
                    target.classList.add('uploading');

                    let xhr = new XMLHttpRequest();

                    xhr.open('POST', url);
                    let body = new FormData();

                    for (let i = 0; i < files.length; i++) {
                        body.append(i, files[i]);
                    }

                    xhr.onload.onprogress = function(e) {
                        if (e.lengtComputable) {
                            target.innerHTML = message + Math.round(e.loaded / e.target * 100) + '% Complete';
                        }
                    };
                    xhr.upload.onload = function(e) {
                        uploading = false;
                        target.classList.remove('uploading');
                        target.innerHTML = 'Drop  files to upload';
                    };
                    xhr.send(body);

                    return false;
                }

                target.classList.remove('wantdrop');
            }
        }
    }
});


/// Implementing timeouts