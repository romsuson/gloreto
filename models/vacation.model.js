const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const vacationSchema = new Schema({
  title: { type: String, required: true },
  image_url: { type: String, required: true },
  _partition: {type: String},
  createdAt: {type: Int32},
  updatedAt: {type: Int32},
}, {
  timestamps: true,
});

const Vacation = mongoose.model('Vacation', vacationSchema);

module.exports = Vacation;