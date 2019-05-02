'use strict';

const mongoose = require('mongoose');
const db = mongoose.connection;

require('dotenv').config();

mongoose.Promise = global.Promise;

db.on('error', function (err) {
  console.error('mongodb connection error:', err);
  process.exit(1);
});

db.once('open', function () {
  console.log('mongodb://'+process.env.MONGO_USER+':'+process.env.MONGO_PASSWORD+'@localhost/nodepop')
  console.info('Connected to mongodb.');
});

mongoose.connect('mongodb://localhost/nodepop',
{
  useNewUrlParser: true,
  useCreateIndex: true
});

module.exports = db;
