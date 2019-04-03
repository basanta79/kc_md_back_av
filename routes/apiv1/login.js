'use strict';

const express = require('express');
const router = express.Router(); 
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Usuario = mongoose.model('Usuario');
const bcrypt = require('bcrypt');

require('dotenv').config();

router.post('/', async (req, res, next) => {
    try {
        // Recogemos los datos del body
        const email = req.body.email;
        const password = req.body.password; 
    
        // Obtenemos los usuarios de la base de datos.
        const usuario = await Usuario.findOne({ email: email });
        console.log(usuario);
        
        // Comparamos el password que nos envian
        if (!usuario || !await bcrypt.compare(password, usuario.password)){
          res.json({
            success: false,
            result: 'invalid credentials'
          })
          return;
        }else{
            // Generamos un jsonWebToken que devolvemos
            const token = await new Promise( (resolve, reject) => {
                jwt.sign({ _id: usuario._id}, process.env.JWT_SECRET,{
                    expiresIn: '2d',
                }, (err, token) => {
                    if (err) {
                        reject (err);
                        return;
                    }
                    resolve(token);
                });
            });
            res.json({
                sucess: true,
                token: token
            })
        }
    // Si no es correcto devolver un error
    } catch (error) {
        console.log( error);
        next (error);
        return;
    }
})

module.exports = router;