const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const upload = require('../config/FileUpload');
const bcrypt = require('bcryptjs');


// file upload path //
router.post('/fileUpload', checkAuthentication, (req, res, next) => {
  jwt.verify(req.token, 'secretkey123secretkey', async (error, user) => {
    if (error) {
      res.sendStatus(403);
    }

    try {
      const _id = user.user.id;
      let userExist = await User.findById({ _id });
      req.user_id = _id;
      next();
    }
    catch (error) {
      res.sendStatus(404);
    }
  })
}, upload.single('file'), async (req, res, next) => {
  const filePath = 'files/uploads/' + req.file.filename;
  const userId = req.user_id;
  let newFile = new Files({ userId, filePath });
  try {
    const result = await newFile.save();
    res.status(200).send({ 'File Path : ': filePath });
  }
  catch (error) {
    res.send(error);
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
      if (userExist && userExist.username === username && isCorrect) {
        user.id = userExist._id;
        jwt.sign({ user: user }, 'secretkey123secretkey', (error, token) => {
          token = 'Bearer' + ' ' + token;
          res.status(200).send({
            "access_token": token
          });
        });
      }
      else {
        res.status(404).send('incorrect Username or Password');
      }
  }
  catch(error) {
       res.status(400).send(error);
  }
});  

router.route('/users/signup').post(async(req, res) => {
  const { name, username, password } = req.body;
  try {
      let salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      let userExist = await User.findOne({ username });
      if(userExist && userExist.username === username) {
        res.status(400).send('username already exist');
      }
      else {
        const newUser = new User({ name, username, hashedPassword });
        let userAdded = await newUser.save();
        res.status(200).send('User added')
      }
  }
  catch(error) {
    res.status(400).send(error);
  }
});

function checkAuthentication(req, res, next) {

  const bearerHeader = req.headers['authorization'];

  // Format of Token
  // Authorization: Bearer <access_token>
  if (typeof bearerHeader !== 'undefined') {

    const bearer = bearerHeader.split(' ');
    req.token = bearer[1];
    next();

  } else {
    res.sendStatus(403);
  }

}

module.exports = router;