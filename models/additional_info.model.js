const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const additional_infoSchema = new Schema({
  header_image: { type: String },
  header_text: { type: String },
  header_subtext: { type: String },
  hotel_image: { type: String },
  hotel_name: { type: String },
  hotel_info: { type: String },
  _partition: {type: String},
  email: {type: String},
  mobile: {type: String},
  tel_no: {type: String},
  website: {type: String},
  address: {type: String},
  hotel_city: {type: String},
  createdAt:{type: Int32}
}, {
  timestamps: true,
});

const Additional_Info = mongoose.model('Additional_Info', additional_infoSchema);

module.exports = Additional_Info;