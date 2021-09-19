const mongoose = require('mongoose');
var Int32 = require('mongoose-int32');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    _partition: { type: String},
    catid: { type: String},
    name: { type: String},
    status: { type: String},
 

}, {
    collection: 'Category'
  });

const Category = mongoose.model('Category',CategorySchema);

module.exports = Category;