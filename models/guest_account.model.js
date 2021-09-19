const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const Guest_AccountSchema = new Schema({
  last_name: { type: String},
  first_name: { type: String},
  middle_name: { type: String},
  suffix: { type: String},
  valid_id: { type: String},
  email: { type: String},
  password: { type: String},
  phone_no: { type: String},
  address: { type: String},
  nationality: { type: String},
  temp_id: { type: String},
  status: { type: String},
  language: { type: String},
  currency: { type: String},
  booking_count: {type: Int32},
  createdAt: {type: Int32},
  updatedAt: {type: Int32},
  saved_rooms:  [{
    type: String
}]
});

const Guest_Account = mongoose.model('Guest_Account', Guest_AccountSchema);

module.exports = Guest_Account;