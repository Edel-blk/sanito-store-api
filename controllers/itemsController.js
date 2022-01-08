const { Items } = require('../models/item');

module.exports = {
	async saveItem(req, res) {
		const body = req.body;
		const newItem = new Items({
			name: body.name,
			inventory: body.inventory,
			category: body.category,
			price: body.price,
			created_at: new Date(),
			updated_at: new Date()
		});

		const item = await newItem.save();
		res.send({ success: true, data: item });
	},

	async getItems(req, res) {
		let items = [];

		if (req.body.category) {
			const params = {
				category: req.body.category,
			};
			items = await Items.find(params);
		} else {
			items = await Items.find();
		}
		res.send({ success: true, data: items });
	},

	async updateItem(req, res) {
		const newData = {
			...req.body.newData,
			updated_at: new Date()
		}
		await Items.findByIdAndUpdate(req.body.itemId, newData);
		const itemsUpdated = await Items.find();
		res.send({ success: true, data: itemsUpdated });
	},

	async deleteItem(req, res) {
		await Items.deleteOne({ _id: req.query.itemId });
		const item = await Items.findById({ _id: req.query.itemId });
		if (!item) {
			res.send({ success: true, data: { message: 'Item deleted correctly' } });
		} else {
			res.send({ success: false, data: { message: 'Error deleting the item' } });
		}
	},
};