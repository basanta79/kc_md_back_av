'use strict';

const request = require('supertest');
require('dotenv').config();

//Cargamos la aplicacion que queremos probar
const app = require('../app');

describe('Anuncios', function(done) {
    this.timeout(4000);
    it('should return 200', function(done){
        request(app)
            .get('/anuncios')
            .expect(200)
            .end( (err,res) => {
                if (err){
                    done(err);
                }else{
                    done();
                }
            });
    });
});

//Sintaxis de mocha
describe('Login', function(done) {
    it('should return 404', function(done){
        request(app)
            .get('/login')
            .expect(404)
            .then( response => {
                done();
            }).catch(err => {
                done(err);
            })
    });
});




