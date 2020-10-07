const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const checkAuthentication = (req, res, next) =>  {

    const bearerHeader = req.headers['authorization'];
   
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      req.token = bearer[1];
      next();
    } else {
      res.sendStatus(403);
    }
  }

const checkAuthorization = (req, res, next) => {

    jwt.verify(req.token, 'secretkey123secretkey', async (error, user) => {
      if (error) {
        res.sendStatus(403);
      }
      try {
        const username = user.user.username;
        let userExist = await User.findOne({ username });
        if (userExist.status === 'approved') {
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
}

module.exports = { checkAuthentication, checkAuthorization }