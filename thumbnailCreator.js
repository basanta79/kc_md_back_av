'use strict';

const cote = require('cote');
const jimp = require('jimp');

const responder = new cote.Responder({ name: 'thumbnailCreation'});

responder.on('convert', async(req, done) => {
    try{

        console.log('servicio de thumbnail');
        console.log(req.origin);
        console.log(req.path);
        console.log(req.target);
        
        const image = await jimp.read(req.path);
        const thumbnailName =  'thumbnail-' + req.origin;

        image.resize(100, jimp.AUTO);
        image.resize(jimp.AUTO, 100);
        image.write(req.target + thumbnailName);

        done ({
            result: true,
            thumbnailName: thumbnailName,
        });

    } catch (error) {
        console.log(error);
        done ({
            result: false,
            thumbnailName: "",
        });
    }
    

})