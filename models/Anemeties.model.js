const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const anemetiesSchema = new Schema({
  title: { type: String},
  description: { type: String},
  subtitle: { type: String},
  img: { type: String},
  side: { type: String},
  _partition: {type: String},
  createdAt: {type: Int32},
  updatedAt: {type: Int32},
}, {
  timestamps: true,
});

const Anemeties = mongoose.model('Anemeties', anemetiesSchema);

module.exports = Anemeties;