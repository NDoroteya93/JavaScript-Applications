import { requester } from 'requester';


function load(templateName) {
    const cacheObj = {};
    // Caching after load on other page 
    if (cacheObj.hasOwnProperty(templateName)) {
        return Promise.resolve(cacheObj);
    }
    // return promise
    return requester.get(`templates/${templateName}.handlebars`)
        .then((template) => {
            const compiledTemplate = Handlebars.compile(template);
            cacheObj[templateName] = compiledTemplate;
            return Promise.resolve(compiledTemplate);

        })
}
export { load };