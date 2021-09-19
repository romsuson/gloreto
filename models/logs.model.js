const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');


const Schema = mongoose.Schema;

const logsSchema = new Schema({
 
    _partition:  { type: String },
    date: { type: Int32 },
    description: { type: String},
    staff: { type: String },
}, {
    collection: 'logs'
  });

const Logs = mongoose.model('Logs', logsSchema);

module.exports = Logs;