const mongoose = require('mongoose');

const ownerSchema = new mongoose.Schema({
  name: String, 
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet'
  }]
},
  { timestamps:true }
);

module.exports = mongoose.model('Owner', ownerSchema);