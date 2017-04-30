'use strict';

import { requester } from 'requester';

class loadTemplate {
    constructor(templateName) {
        this.templateName = templateName;
        this._cache = {};
    }

    get cache() {
        return this._cache;
    }

    getTemplate() {

        if (this.cache.hasOwnProperty(this.templateName)) {
            return Promise.resolve(this.cache);
        }
        return requester.get(`js/View/${this.templateName}.handlebars`)
            .then(template => {
                const compiledTemplate = Handlebars.compile(template);
                console.log(compiledTemplate);
                this.cache[this.templateName] = compiledTemplate;
                return Promise.resolve(compiledTemplate);
            })
    }
}
export { loadTemplate };