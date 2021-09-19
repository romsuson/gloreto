const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const Sales_HistorySchema = new Schema({
  expiration: { type: Int32 },
  _partition: {type: String},
      price:  {type: Int32},
      name_goods_promo:  {type: String},
      number:  {type: String},
      description:  {type: String},
      price_room_plan:  {type: Int32},
      name_room_plan:  {type: String},
      number_room_plan: {type: String},
      description_room_plan:  {type: String},
  user_id: {type: String},
  email: {type: String},
  createdAt:{type: Int32}
}, {
  timestamps: true,
});

const Sales_History = mongoose.model('Sales_History', Sales_HistorySchema);

module.exports = Sales_History;