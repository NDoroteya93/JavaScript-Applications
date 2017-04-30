'use strict';

import {get as getRequest } from 'requester';
import { Handlebars } from 'handlebars';

const cacheObj = {};

// get request retun content
export function load(templateName) {
    debugger;
    // Template loading caching!!
    if (cacheObj.hasOwnProperty(templateName)) {
        return Promise.resolve(cacheObj[templateName]);
    }
    return getRequest(`templates/${templateName}.handlebars`) // return promise
        .then(template => {
            const compliedTemplate = Handlebars.compile(template);
            cacheObj[templateName] = compliedTemplate;
            return Promise.resolve(compliedTemplate);
        });
}