const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    _partition: {type: String},
      address: {type: String },
      age: {type: String},
     expiration: {type: String},
      full_name: {type: String },
      hot_name: {type: String},
      hot_mobile: {type: String},
      hotel_tel: {type: String },
      hotel_email: {type: String},
      hot_address: {type: String},
      hot_website: {type: String},
      hot_logo: {type: String},
      gender: {type: String},
      mobile: {type: String},
      hotel_id: {type: String },
      name: {type: String },
      userType: {type: String}
}, {
  timestamps: true,
  collection: 'User'
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;