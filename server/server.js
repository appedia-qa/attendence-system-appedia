const express = require('express');
// require("esm")
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');
// import {config} from './config/index'

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'files/uploads')));
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');

app.use(config.api.prefix, usersRouter);
app.use(config.api.prefix, productsRouter);
app.use(config.api.prefix, categoriesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
