const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const video_areaSchema = new Schema({
  title: { type: String },
  subtitles: { type: String},
  background_image: { type: String},
  link: { type: String},
  _partition: {type: String},
  createdAt: {type: Int32},
  updatedAt: {type: Int32},
}, {
  timestamps: true,
});

const Video_Area = mongoose.model('Video_Area', video_areaSchema);

module.exports = Video_Area;