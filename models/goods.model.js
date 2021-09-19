const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const GoodsSchema = new Schema({

    _partition: { type: String},
    price: { type: Int32},
    name: { type: String},
    product: { type: String},
    quantity: { type: Int32},
    itemid: { type: String},
    status: { type: String},
    cat: { type: String},

}, {
    collection: 'Goods'
  });

const Goods = mongoose.model('Goods',GoodsSchema);

module.exports = Goods;