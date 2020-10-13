const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const upload = require('../config/FileUpload');
const fsp = require('fs/promises');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { checkAuthentication, checkAuthorization } = require('../middlewares');
let Product = require("../models/product.model");
const ObjectId = require("mongodb").ObjectID;
const server = require('http').createServer()
var requestStats = require('request-stats');

router.post('/users/imageUpload', async (req, res) => {

  const { images } = req.body;
  try {

    let filesArr = [];
    let fileNames = [];
    for (i = 0; i < images?.length ; i++) {
      let fileName = '';
      let filePath = ''
      var matches = images[i].match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches?.length === 3) {
        imageData = new Buffer.from(matches[2], 'base64');
        fileName = uuidv4() + `.${matches[1].split("/")[1]}`;
        fileNames.push(fileName);
        filePath = 'files/images/' + fileName;
        filesArr.push({filePath, imageData});
      } else {
        throw new Error(`Bad format for image at index ${i+1}`)
      }
    }

    for (i = 0; i < filesArr.length; i++) {
      await fsp.writeFile(filesArr[i].filePath, filesArr[i].imageData);
    }

    res.status(200).send({ images: fileNames })
  } catch (e){
    res.status(400).send({ message: e.message })
  }
});

router.post('/users/imageDelete', async(req, res) => {

  const { image_name } = req.body;

  const filePath = 'files/images/' + image_name;

  try { 
    fs.unlinkSync(filePath)
    res.status(200).send('image deleted from server');
  } catch(err) {
    res.status(400).send('image not deleted');
  }
});

router.route('/users').get(async (req, res) => {
  try {
    let users = await User.find({});
    res.status(200).send(users);
  }
  catch (error) {
    res.status(400).send(error);
  }
});

router.route('/users/login').post(async (req, res) => {
  let user = {};
  user.username = req.body.username;

  const { username, password } = req.body;

  try {
    let userExist = await User.findOne({ username });
    let isCorrect = await bcrypt.compare(password, userExist.hashedPassword);
    if (userExist && userExist.username === username && isCorrect && userExist.status === 'unapproved') {
      res.status(400).send('User is not approved yet');
    }
    else if (userExist && userExist.username === username && isCorrect && userExist.status === 'approved') {
      user.id = userExist._id;
      user.role = userExist.role;
      user.status = userExist.status;
      jwt.sign({ user: user }, 'secretkey123secretkey', (error, token) => {
        token = 'Bearer' + ' ' + token;
        res.status(200).send({
          "access_token": token
        });
      });
    }
    else {
      res.status(404).send('incorrect Username or password');
    }
  }
  catch (error) {
    res.status(400).send('User not exists');
  }
});

router.route('/users/signup').post(async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    res.status(400).send('please provide name, username and password');
  }
  else {
    try {
      let salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      role = 'contributor';
      let userExist = await User.findOne({ username });
      if (userExist && userExist.username === username) {
        res.status(400).send('username already exist');
      }
      else {
        const newUser = new User({ name, username, hashedPassword, role });
        let userAdded = await newUser.save();
        res.status(200).send('User added')
      }
    }
    catch (error) {
      res.status(400).send(error);
    }
  }
});

router.delete('/users/remove', checkAuthentication, checkAuthorization, (req, res, next) => {
  jwt.verify(req.token, 'secretkey123secretkey', async (error, user) => {
    if (error) {
      res.sendStatus(403);
    }
    try {
      const username = user.user.username;
      let userExist = await User.findOne({ username });
      if (userExist.role === 'admin') {
        next();
      }
      else {
        res.sendStatus(403);
      }
    }
    catch (error) {
      res.sendStatus(403);
    }
  })
}, (async (req, res) => {
  let { username } = req.body;
  try {
    let userDeleted = await User.remove({ username });
    if (userDeleted.deletedCount > 0) {
      res.status(200).send('user deleted');
    }
    else {
      res.status(400).send('user not deleted');
    }
  }
  catch (error) {
    res.status(400).send(error);
  }
})
);

router.post('/users/approve', checkAuthentication, checkAuthorization, (req, res, next) => {
  jwt.verify(req.token, 'secretkey123secretkey', async (error, user) => {
    if (error) {
      res.sendStatus(403);
    }
    try {
      const username = user.user.username;
      let userExist = await User.findOne({ username });
      if (userExist.role === 'admin') {
        next();
      }
      else {
        res.sendStatus(403);
      }
    }
    catch (error) {
      res.sendStatus(403);
    }
  })
}, (async (req, res) => {
  let { username } = req.body;
  try {
    let existUser = await User.findOne({ username });
    if (existUser && existUser.username === username && existUser.status === 'approved') {
      res.status(200).send('user already approved');
    }
    else if (existUser && existUser.username === username && existUser.status === 'unapproved') {
      existUser.status = 'approved';
      let updatedUser = await existUser.save();
      res.status(200).send('User approved');
    }
    else {
      res.status(400).send('User does not exist');
    }
  }
  catch (error) {
    res.status(400).send('User does not exist');
  }
})
);

module.exports = router;
