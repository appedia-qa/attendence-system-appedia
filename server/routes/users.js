const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const upload = require('../config/FileUpload');
const fs = require('fs');
const path = require('path');

const bcrypt = require('bcryptjs');


// router.post('/users/fileUpload', upload.single('image'), (req, res, next) => {
//   if(!req.file) {
//     res.status(400).send('Please upload png OR jpeg image');
//   }
//   else {
//     const filePath = 'files/uploads/' + req.file.filename;
//     res.status(200).send(filePath);
//   } 
// });

// router.post('/users/fileUpload', upload.array('images',12), (req, res, next) => {
//   if(!req.files) {
//     res.status(400).send('Please upload png OR jpeg image');
//   }
//   else {
//     // const filePath = 'files/uploads/' + req.file.filename;
//     res.status(200).send(req.files);
//   } 
// });

router.post('/users/imageUpload', (req, res) => {

  var dir = './files/images';
  if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir,{ recursive: true });
  }
  
  const { images } = req.body;
  uploadedList = [];
  for (i = 0; i < images.length ; i++) {
    fileName = `${images[i].name}-${Date.now()}.png`;
    filePath = `files/images/` + fileName;
    uploadedList.push(fileName);
    fs.writeFile(filePath, images[i].image, function(err) {
      if(!err) {}
    }); 
  }
  
  res.status(200).send({images: uploadedList})
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
  catch(error) {
       res.status(400).send('incorrect Username or password');
  }
});  

router.route('/users/signup').post(async(req, res) => {
  const { name, username, password } = req.body;
  
  if(!name || !username || !password) {
    res.status(400).send('please provide name, username and password');
  }
  else {
    try {
      let salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      role = 'contributor';
      let userExist = await User.findOne({ username });
      if(userExist && userExist.username === username) {
        res.status(400).send('username already exist');
      }
      else {
        const newUser = new User({ name, username, hashedPassword,role });
        let userAdded = await newUser.save();
        res.status(200).send('User added')
      }
    }
    catch(error) {
      res.status(400).send(error);
    }
  }
});

router.delete('/users/remove', checkAuthentication, (req, res, next) => {
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

router.post('/users/approve', checkAuthentication, (req, res, next) => {
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
    if (existUser && existUser.username === username  && existUser.status === 'approved') {
      res.status(200).send('user already approved');
    }
    else if (existUser && existUser.username === username  && existUser.status === 'unapproved'){
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