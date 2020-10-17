const express = require('express');

const router = express.Router();

const User = require('../../database/models/user');
const passport = require('../../passport');

router.post('/', (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username: username }, (err, user) => {
    if (err) {
      console.log('User Create Error: ', err);
      return;
    }

    if (user) {
      res.json({
        error: `Sorry, already a user with the username: ${username}`,
      });
      return;
    }

    const newUser = new User({
      username: username,
      password: password,
    });

    newUser.save((err, savedUser) => {
      if (err) return res.json(err);

      res.json(savedUser);
    });
  });
});

router.post(
  '/login',
  (req, res, next) => {
    next();
  },
  passport.authenticate('local'),
  (req, res) => {
    console.log('LOGGED IN', req.user);
    User.find({username: req.user.username}).then(data => {
      const username = data.username;
      
      res.send({
        username: req.user.username, 
        data: data[0]
      });
    })
  }
);

router.get('/', (req, res) => {
  if (req.user) {
    console.log('Hit GET Route', req.user);
    User.find({username: req.user.username}).then(data => {      
      res.send({
        username: req.user.username, 
        data: data[0]
      });
    })
  } else {
    res.json({ user: null });
  }
});

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    res.status(200).json({ msg: 'LOGGED OUT' });
  } else {
    res.status(404).json({ msg: 'NO USER TO LOGOUT' });
  }
});

module.exports = router;
