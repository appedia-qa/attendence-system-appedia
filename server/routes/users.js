const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const upload = require('../config/FileUpload');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { checkAuthentication, checkAuthorization } = require('../middlewares');


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
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // const { images } = req.body;
  // uploadedList = [];

  // try {

  //   function decodeBase64Image(dataString) {
  //     var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  //     var response = {};

  //     if (matches.length !== 3) {
  //       return new Error('Invalid input string');
  //     }

  //     response.type = matches[1];
  //     response.data = new Buffer.from(matches[2], 'base64');

  //     return response;
  //   }

  //   // Regular expression for image type:
  //   // This regular image extracts the "jpeg" from "image/jpeg"
  //   // var imageTypeRegularExpression = /\/(.*?)$/;

  //   // var base64Data = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAZABkAAD/4Q3zaHR0cDovL25zLmFkb2JlLmN...';
  //   var base64Data = images[0].data_url;

  //   var imageBuffer = decodeBase64Image(base64Data);
  //   var directory = 'files/images/';

  //   var fileNameName = 'image';
  //   // var imageTypeDetected = imageBuffer
  //   //   .type
  //   //   .match(imageTypeRegularExpression);

  //   var filePath = directory +
  //   fileNameName +
  //     '.' +
  //     'png';

  //   // Save decoded binary image to disk
  //   try {
  //     require('fs').writeFile(filePath, imageBuffer.data,
  //       function () {
  //         console.log('DEBUG - feed:message: Saved to disk image attached by user:', filePath);
  //       });
  //   }
  //   catch (error) {
  //     console.log('ERROR:', error);
  //   }
  // }
  // catch (error) {
  //   console.log('ERROR:', error);
  // }

  const { images } = req.body;
  uploadedList = [];
  fileName = '';
  for (i = 0; i < images.length ; i++) {
    var matches = images[i].match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    console.log(matches[1]);
    imageData = new Buffer.from(matches[2], 'base64');
    if(matches[1] === 'image/png') {
      fileName = uuidv4() + '.png';  
    }
    else if (matches[1] === 'image/jpg') {
      fileName = uuidv4() + '.jpg';  
    }
     
    filePath = 'files/images/' + fileName;
    fs.writeFile(filePath, imageData, function(err) {
      if(!err) {}
    }); 
    uploadedList.push(fileName)
  }
  res.status(200).send({ images: uploadedList })
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