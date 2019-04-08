'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Anuncio = mongoose.model('Anuncio');
const jwt = require('jsonwebtoken');
const Usuario = mongoose.model('Usuario');
const multer  = require('multer')
const upload = multer({ dest: 'img/' })

const jimp = require('jimp');


router.get('/', (req, res, next) => {

  const start = parseInt(req.query.start) || 0;
  const limit = parseInt(req.query.limit) || 1000; // nuestro api devuelve max 1000 registros
  const sort = req.query.sort || '_id';
  const includeTotal = req.query.includeTotal === 'true';
  const filters = {};
  if (typeof req.query.tag !== 'undefined') {
    filters.tags = req.query.tag;
  }

  if (typeof req.query.venta !== 'undefined') {
    filters.venta = req.query.venta;
  }

  if (typeof req.query.precio !== 'undefined' && req.query.precio !== '-') {
    if (req.query.precio.indexOf('-') !== -1) {
      filters.precio = {};
      let rango = req.query.precio.split('-');
      if (rango[0] !== '') {
        filters.precio.$gte = rango[0];
      }

      if (rango[1] !== '') {
        filters.precio.$lte = rango[1];
      }
    } else {
      filters.precio = req.query.precio;
    }
  }

  if (typeof req.query.nombre !== 'undefined') {
    filters.nombre = new RegExp('^' + req.query.nombre, 'i');
  }

  Anuncio.list(filters, start, limit, sort, includeTotal, function (err, anuncios) {
    if (err) return next(err);
    res.json({ ok: true, result: anuncios });
  });
});

// Return the list of available tags
router.get('/tags', function (req, res) {
  res.json({ ok: true, allowedTags: Anuncio.allowedTags() });
});

router.post('/', async function (req,res,next) {
  try{
    const obj = {
      nombre: req.body.name,
      venta: req.body.venta,
      precio: req.body.precio,
      tags: req.body.tags,
      foto: req.file.filename
    }
    // const anuncio = new Anuncio(obj);
    // const anuncioGuardado = await anuncio.save();
    // res.json(anuncioGuardado);

    console.log(req.file);
    const image = await jimp.read(req.file.path);
    //image.clone();
    image.resize(100, jimp.AUTO);
    image.resize(jimp.AUTO, 100);
    image.write(req.file.destination + 'thumbnail-' + req.file.filename)

    res.json(obj);
    
  } catch (err) {
    return next(err);
  }



})


module.exports = router;
