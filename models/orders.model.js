const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
    floor: { type: String},
    name: { type: String },
    owner: { type: String},
    room_id: {type: String},
  _partition: {type: String},
  room_type_id: {type: Array},
}, {
  collection: 'Orders'
});

const Orders = mongoose.model('Orders', OrdersSchema);

module.exports = Orders;