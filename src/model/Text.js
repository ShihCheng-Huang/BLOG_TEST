var mongoose = require('mongoose');

var TextSchema = new mongoose.Schema({
  Id: { type: String, unique: true, index: true },
  Title: String,
  Text: String,
  GoodPoint: { type: Number, default: 0 },
 
});

module.exports = mongoose.model('Text', TextSchema);