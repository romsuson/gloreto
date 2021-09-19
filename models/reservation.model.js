const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');
const Schema = mongoose.Schema;

const booking_reservationSchema = new Schema({
     name: {type: String},
     email: {type: String},
     phone_no: {type: String},
     address: {type: String},
     nationality: {type: String},
     mode: {type: String},
     reservation_code: {type: String},
     in_check: {type: Int32},
     out_check: {type: Int32},
     room: {type: String},
     guest: {type: String},
     guest_id: {type: String},
     _partition: {type: String},
     status: {type: String},
     createdAt: {type: Int32},
     updatedAt: {type: Int32},
     reason: {type: String},
     status: {type: String},
     voucher_code: {type: String},
     voucher_min: {type: Int32},
     voucher_max: {type: Int32},
     voucher_exp: {type: Int32},
     voucher_details: {type: String},
     voucher_mode: {type: String},
     voucher_value: {type: String},
     roomprice: {type: String},
     promo_price_hour: {type: String},
     roomprice_hour: {type: String},
     hour_duration: {type: String},
     duration_mode: {type: String},
     rate_mode: {type: String},
     room_name: { type: String },
     feedback: { type: String },
     rate: {type: Int32},
}, {
  collection: 'Booking_Reservation'
});

const Booking_Reservation = mongoose.model('Booking_Reservation', booking_reservationSchema);

module.exports = Booking_Reservation;