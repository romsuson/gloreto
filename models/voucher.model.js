const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const voucherSchema = new Schema({
    code: { type: String },
    date: { type: Int32 },
    expiration_date: { type: Int32 },
  min_stay: { type: Int32 },
  max_stay: { type: Int32 },
  description: { type: String },
  vouchvalue: { type: Int32 },
  mode: { type: String },
  status: { type: String },
  _partition: {type: String},
  createdAt: {type: Int32},
  updatedAt: {type: Int32},
}, {
  timestamps: true,
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;