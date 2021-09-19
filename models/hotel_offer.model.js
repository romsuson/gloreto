const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const hotel_offerSchema = new Schema({
  title: { type: String },
  image: { type: String },
  description:  [{
    type: String
}],
  _partition: {type: String},
  createdAt: {type: Int32},
  updatedAt: {type: Int32},
}, {
  timestamps: true,
});

const Hotel_Offer = mongoose.model('Hotel_Offer', hotel_offerSchema);

module.exports = Hotel_Offer;