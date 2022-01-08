const mongoose = require('mongoose');

const itemsSchema = mongoose.Schema({
  name: String,
  inventory: Number,
  category: String,
  price: Number,
  created_at: Date,
  updated_at: Date
});

const Items = mongoose.model('Items', itemsSchema);

module.exports = { Items, itemsSchema };
