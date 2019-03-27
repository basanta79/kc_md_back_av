'use strict';

const i18n = require('i18n');
const path = require('path');

module.exports = function(){
    
    i18n.configure({
        locales: ['en','es'],
        directory: path.join(__dirname, '..','locales'),
        defaultLocale: 'es',
        queryParameter: 'Lang',
        autoReload: true,
        syncfiles: true,
        updateFiles: true,
        objectNotation: true,
        register: global,
    });

    // Para su uso fuera de express
    i18n.setLocale('en');

    return i18n;

}
