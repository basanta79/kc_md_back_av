'use strict';

const request = require('supertest');
require('dotenv').config();

//Cargamos la aplicacion que queremos probar
const app = require('../app');

//Sintaxis de mocha
describe('Anuncios', function(done) {
    it('should return 200', function(done){
        request(app)
            .get('/anuncios')
            .expect(200)
            .then( response => {
                done();
            }).catch(err => {
                done(err);
            })
            /* .end( (err,res) => {
                if (err){
                    return done(err);
                }else{
                    return done();
                }
                //process.exit(0);
            }); */
    });
});


