const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const carousel_headerSchema = new Schema({
  title: { type: String },
  subtitles: { type: String},
  background_image: { type: String},
  _partition: {type: String},
  createdAt: {type: Int32},
  updatedAt: {type: Int32},
}, {
  timestamps: true,
});

const Carousel_header = mongoose.model('Carousel_header', carousel_headerSchema);

module.exports = Carousel_header;