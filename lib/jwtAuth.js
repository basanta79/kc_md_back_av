'use strict';

const jwt = require('jsonwebtoken');

module.exports = function (){
    return function(req, res, next) {
        // leer el token
        const token = req.body.token || req.query.token || req.get('Authorization')
        
        if (!token) {
          const err = new Error('no token provided');
          next(err);
          return;
        }
          
        // verificar que el token es válido
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
          if (err) {
            next(err);
            return;
          }
          req.apiUserId = payload._id;
          next();
        }); 
    };
        
}