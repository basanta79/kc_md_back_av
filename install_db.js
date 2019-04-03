'use strict';

const mongoose = require('mongoose');
const readLine = require('readline');
const async = require('async');
const bcrypt = require('bcrypt');

const db = require('./lib/connectMongoose');

// Cargamos las definiciones de todos nuestros modelos
const Anuncio = require('./models/Anuncio');
const Usuario = require('./models/Usuario');

// Cargamos los datos
const usuariosData = require('./data/usuarios.json');
const anunciosData = require('./data/anuncios.json');

db.once('open', async function () {
  try {
    const answer = await askUser('Are you sure you want to empty DB [y/n]? (n) ');
    if (answer.toLowerCase() === 'y') {

      // Calculamos los hash del password
      const usuariosHasheados = await Promise.all( usuariosData.map(async (item) => {
        const passHashed = await Usuario.hashPassword(item.password); 
        return ({
          ...item,
          password: passHashed,
        });         
      }))

      // Inicializar nuestros modelos
      
      await inicializacionTabla(Usuario, usuariosHasheados);
      await inicializacionTabla(Anuncio, anunciosData);
      
    } else {
      console.log('DB install aborted!');
    }
    return process.exit(0);
  } catch(err) {
    console.log('Error!', err);
    return process.exit(1);
  }
});

function askUser(question) {
  return new Promise((resolve, reject) => {
    const rl = readLine.createInterface({
      input: process.stdin, output: process.stdout
    });
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

const inicializacionTabla = async (modelName, modelData) => {
  
  const deleted = await modelName.deleteMany({});
  console.log(`${deleted.n} registros borrados de ${modelName.modelName}`);

  const inserted = await modelName.insertMany(modelData);
  console.log(`${inserted.length} registros insertados de ${modelName.modelName}`)

}


