const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost/shopping_list_mongodb')
  .then(() => {
    return console.log('Connected to MongoDB.');
  })
  .catch(err => {
    console.log('Error: ' + err);
  });


exports.Item = require('./item');