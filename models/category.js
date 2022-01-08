const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  category: String
});

const Categories = mongoose.model('Categories', categorySchema);

module.exports = { Categories, categorySchema };
