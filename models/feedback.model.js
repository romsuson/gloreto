const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  name: { type: String},
  feedback: { type: String },
  address: { type: String},
  rate: {type: Int32},
  _partition: {type: String},
  createdAt: {type: Int32},
  updatedAt: {type: Int32},
}, {
  timestamps: true,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;