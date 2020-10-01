const router = require('express').Router();
let Category = require('../models/category.model');

router.route('/categories').get(async (req, res) => {
  try {
    let categories = await Category.find({});
    res.status(200).json({
      categories
    });
  }
  catch (error) {
    res.status(400).send(error);
  }
});

router.route('/categories/add').post( async (req, res) => {

    const { name } = req.body;
    try {
        let categoryExist = await Category.findOne({ name });
        if(categoryExist && categoryExist.name === name) {
            res.status(400).send('Category already exist');
        }
        else {
            const newCategory = new Category({ name });
            let categoryAdded = await newCategory.save();
            res.status(200).send('Category added')
        } 
    }
    catch(error) {
        res.status(400).send(error);
    }
});

router.route('/categories/remove').delete( async (req, res) => {
    const { name } = req.body;
    try {
      let categoryRemoved = await Category.remove({ name });
      if (categoryRemoved.deletedCount > 0) {
        res.status(200).send('Category deleted');
      }
      else {
        res.status(404).send('Category does not exist');
      }
    }
    catch (error) {
      res.status(400).send(error);
    }
});

module.exports = router;