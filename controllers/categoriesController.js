const { Categories } = require('../models/category');

module.exports = {
	async saveCategory(req, res) {
		const body = req.body;
		const newCategory = new Categories({
			category: body.category
		});

		const category = await newCategory.save();
		res.send({ success: true, data: category });
	},

	async getCategories(req, res) {
		const categories = await Categories.find();
		res.send({ success: true, data: categories });
	},

	async updateCategory(req, res) {
		const newData = {
			...req.body.newData,
			updated_at: new Date()
		}
		await Categories.findByIdAndUpdate(req.body.categoryId, newData);
		const categoriesUpdated = await Categories.find();
		const category = await Categories.findById({ _id: req.body.categoryId });
		if (category.category === req.body.newData.category) {
			res.send({ success: true, data: categoriesUpdated });
		} else {
			res.send({ success: false, data: { message: 'Error updating the category' } });
		}
	},

	async deleteCategory(req, res) {
		await Categories.deleteOne({ _id: req.query.categoryId });
		const category = await Categories.findById({ _id: req.query.categoryId });
		if (!category) {
			res.send({ success: true, data: { message: 'Category deleted correctly' } });
		} else {
			res.send({ success: false, data: { message: 'Error deleting the category' } });
		}
	},
};