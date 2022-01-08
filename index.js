const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3005;

app.listen(port, function () {
    console.log('listening on '+port)
});

// Conectando con mongodb
const mongoDB = 'mongodb+srv://user-test:passwordtest@cluster0.w8vxo.mongodb.net/inventory-app';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json({ limit: '15mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Language');
  next();
});

//controllers
const itemsController = require('./controllers/itemsController');
const categoriesController = require('./controllers/categoriesController');

app.get('/items', async (req, res) => itemsController.getItems(req, res));
app.post('/items/add', async (req, res) => itemsController.saveItem(req, res))
app.put('/items/update', async (req, res) => itemsController.updateItem(req, res));
app.delete('/items/delete', async (req, res) => itemsController.deleteItem(req, res));

app.get('/category', async (req, res) => categoriesController.getCategories(req, res));
app.post('/category/add', async (req, res) => categoriesController.saveCategory(req, res))
app.put('/category/update', async (req, res) => categoriesController.updateCategory(req, res));
app.delete('/category/delete', async (req, res) => categoriesController.deleteCategory(req, res));