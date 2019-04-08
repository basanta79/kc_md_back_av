'use strict';
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/anuncios/')
    },
    filename: function (req, file, cb) {
;      cb(null, Date.now() + '-' + file.originalname)
    }
  })

  module.exports = storage