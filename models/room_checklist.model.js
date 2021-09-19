const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');


const Schema = mongoose.Schema;

const room_checklistSchema = new Schema({
 
    _partition:  { type: String },
    date: { type: Int32 },
    note: { type: String},
    staff: { type: String },
    room_id:{ type: String },
    checkListPros:[{ type: String }],
    checkList:[{ type: String }],

}, {
    collection: 'room_checklist'
  });

const Room_checklist = mongoose.model('Room_checklist', room_checklistSchema);

module.exports = Room_checklist;