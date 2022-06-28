'use strict';

const { users } = require('../models/index.js');

// module.exports = async (req, res, next) => {

//   try {

//     if (!req.headers.authorization) { next('Invalid Login') }

//     const token = req.headers.authorization.split(' ').pop();
//     const validUser = await users.authenticateWithToken(token);

//     req.user = validUser;
//     req.token = validUser.token;

//   } catch (e) {
//     console.error(e);
//     res.status(403).send('Invalid Login');
//   }
// }

module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
      let bearerHeaderParts = req.headers.authorization.split(' ');
      let token = bearerHeaderParts.pop();
      try {
          const parsedToken = jwt.verify(token, SECRET);
          const user = await Users.findOne({ where: { username: parsedToken.username } });
          if (user) {
              req.user = user;
              next();
          } else {
              res.status(403).send('invalid token');
          }
      } catch {
          res.status(403).send('token is invalid')
      }
      
  } else {
      res.status(403).send('invalid login');
  }
}