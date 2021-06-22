const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    _partition: {type: String},
      address: {type: String },
      age: {type: String},
     expiration: {type: Int32},
     created_at: {type: Int32},
      full_name: {type: String },
      hot_name: {type: String},
      hot_mobile: {type: String},
      hotel_tel: {type: String },
      hotel_email: {type: String},
      hot_address: {type: String},
      hot_website: {type: String},
      hot_logo: {type: String},
      gender: {type: String},
      mobile: {type: String},
      hotel_id: {type: String },
      name: {type: String },
      userType: {type: String},
      max_Goods: {type: Int32},
      rooms: {type: Int32},
      website_pass: {type: String},
      hot_city:  {type: String},
      promo: {type: String},
      promo_goods:  {type: String},
      id_goods_promo: {type: String},
      off:  {type: String},
      web:  {type: String},
      price:  {type: String},
      name_goods_promo:  {type: String},
      number:  {type: String},
      description:  {type: String},
      id_room_plan: {type: String},
      off_room_plan: {type: String},
      price_room_plan:  {type: String},
      name_room_plan:  {type: String},
      number_room_plan: {type: String},
      description_room_plan:  {type: String},
      status:  {type: String},
      canWritePartitions:  [{ type: String   }],
    canReadPartitions:  [{ type: String }],
    memberOf: [{
      expiration: { type: Int32 },
      name: { type: String },
      partition: { type: String }
    }],
}, 

 {
  timestamps: true,
  collection: 'User'
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;