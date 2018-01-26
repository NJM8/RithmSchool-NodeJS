const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost/pets_app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error: ' + err))


module.exports.Pet = require('./pet');
module.exports.Owner = require('./owner');