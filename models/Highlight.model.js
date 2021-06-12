const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const highlight_activitiesSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  _partition: {type: String},
  createdAt: {type: Int32},
  updatedAt: {type: Int32},
}, {
  timestamps: true,
});

const Highlight_Activities = mongoose.model('Highlight_Activities', highlight_activitiesSchema);

module.exports = Highlight_Activities;