const express = require('express');
// require("esm")
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config');
var bodyParser = require('body-parser');
  
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors());
// app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'files/images')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb' , extended: true, parameterLimit:50000}));
// app.use(express.bodyParser({limit: '50mb'}));
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true  });
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

var str = 'https://192.168.100.30:5000/abc.png'
var str2 = str.split('/')
console.log(str2)
  
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
