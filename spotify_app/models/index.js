const mongoose = require("mongoose");
mongoose.set('debug', true)
mongoose
  .connect('mongodb://localhost/spotify_app')
  .then(() => {
      return console.log('Connected to MongoDB')
    })
  .catch(err => {
    console.log(`Error: ${err}`);
  });
  
mongoose.Promise = Promise

module.exports.User = require("./user")