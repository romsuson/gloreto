const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const about_hotelSchema = new Schema({
  title: { type: String },
subtitle: { type: String},
  description: { type: String},
  image1: { type: String},
  image2: { type: String},
  _partition: {type: String},
  createdAt: {type: Int32},
  updatedAt: {type: Int32},
}, {
  timestamps: true,
});

const About_hotel = mongoose.model('About_hotel', about_hotelSchema);

module.exports = About_hotel;