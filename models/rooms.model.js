const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const roomsSchema = new Schema({
    floor: { type: String},
    name: { type: String },
    owner: { type: String},
    room_id: {type: String},
  _partition: {type: String},
  room_type_id: {type: Array},
}, {
  timestamps: true,
  collection: 'Rooms'
});

const Rooms = mongoose.model('Rooms', roomsSchema);

module.exports = Rooms;