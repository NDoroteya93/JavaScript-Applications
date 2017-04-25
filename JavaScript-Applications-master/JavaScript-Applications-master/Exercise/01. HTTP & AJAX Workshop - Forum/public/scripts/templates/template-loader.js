const templateLoader = (() => {
    function get(templateName) {
        return new Promise((resolve, reject) => {
            $.get(`/templates/${templateName}.handlerbars`)
                .done(resolve)
                .failt(reject);
        })
    }
    return {
        get
    }
})();

export { templateLoader };