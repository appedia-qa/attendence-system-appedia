const router = require('express').Router();
let Product = require('../models/product.model');
const jwt = require('jsonwebtoken');
const ObjectId = require("mongodb").ObjectID
const checkValid =  require('../utils');

const verifyProductDetails = (details) => {
  try {
    if (!details) {
      return false;
    }
    if ( checkValid(details.ar.name, details.ar.description) || checkValid(details.eng.name, details.eng.description) || checkValid(details.fr.name, details.fr.description) ) {
      return true;
    }
  } catch(e) {
    return false
  }
}


router.route('/products').get(async (req, res) => {
  try {
    let products = await Product.find({});
    res.status(200).json({
      products
    });
  }
  catch (error) {
    res.status(400).send(error);
  }
});

router.route('/products/add').post( async(req, res) => {

  const {
    product_code,
    product_details,
    product_url,
    product_image,
    product_category_id
  } = req.body;

  if ( !product_code || !product_url || !product_image || !product_category_id ) {
    res.status(400).send('Please provide all fields');
  }
  else if(!verifyProductDetails(product_details)) {
    res.status(400).send('Please provide both name and description in atleast one language');
  }
  else {
    try {
      let productExist = await Product.findOne({ product_code });
      if(productExist && productExist.product_code === product_code) {
        res.status(400).send('Product already exist');
      }
      else {
        const newProduct = new Product({ product_code, product_details, product_url, product_image, product_category_id});
        let productAdded = await newProduct.save();
        res.status(200).send('Product added')
      }
    }
    catch(error) {
      res.status(400).send(error);
    }
  }
});

router.route('/products/update').put(async (req, res) => {
  const {
    product_code,
    product_details,
    product_url,
    product_image,
    product_category_id
  } = req.body;

  if(product_details && !verifyProductDetails(product_details)) {
    res.status(400).send('Please provide both name and description in atleast one language');
  }
  else {
    try {
      let productExist = await Product.findOne({ product_code });
      if(productExist && productExist.product_code === product_code) {
        productExist.product_details = product_details ? product_details : productExist.product_details ;
        productExist.product_image = product_image ? product_image : productExist.product_image;
        productExist.product_url = product_url ? product_url : productExist.product_url;
        productExist.product_category_id = product_category_id ? product_category_id : productExist.product_category_id;
        let productSaved = await productExist.save();
        res.status(200).send("Product Updated");
      }
      else {
        res.status(404).send("Product does not exist");
      }
    }
    catch (error) {
      res.status(400).send(error);
    }
  }
});

router.route('/products/remove').delete(async (req, res) => {
  let { product_code } = req.body;
  try {
    let productDeleted = await Product.remove({ product_code });
    if (productDeleted.deletedCount > 0) {
      res.status(200).send('Product deleted');
    }
    else {
      res.status(404).send('Product does not exist');
    }
  }
  catch (error) {
    res.status(400).send(error);
  }
});

router.route('/products/find').post(async (req, res) => {
  let { product_code } = req.body;
  try {
    let productExist = await Product.findOne({ product_code });
    if(productExist && productExist.product_code === product_code) {
      res.status(200).send(productExist);
    }
    else {
      res.status(404).send('Product does not exist');
    }
  }
  catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;