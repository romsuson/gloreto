const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  _partition: {type: String},
  memberOf: [{
    name: { type: String },
    partition: { type: String },
    expiration: { type: Int32 }
  }],
}, {
 
  collection: 'User'
});

const User = mongoose.model('User', userSchema);

module.exports = User;