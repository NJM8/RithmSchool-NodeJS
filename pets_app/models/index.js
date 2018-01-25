const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost/pets_app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error: ' + err))


exports.Pet = require('./pet');
exports.Owner = require('./owner');