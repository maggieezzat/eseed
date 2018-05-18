const mongoose = require('mongoose');
const _ = require('lodash');
moment = require('moment'),
User = mongoose.model('User');


//register an hr user
module.exports.createUser = async (req, res) => {

  try {
    var body = _.pick(req.body.user, ['email', 'password']);
    body.name = req.body.user.name;
  } catch (error) {
    res.status(400).send('Please enter an email or password');
  }

  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();

  }).then((token) => {
    res.header('x-auth', token).send({ user });
  }).catch((e) => {
    if (e.name == 'ValidationError') {
      if (typeof e.errors.email !== 'undefined') {
        res.status(400).send(e.errors.email.message);
      } else {
        res.status(400).send(e);
      }

    } else {
      res.status(400).send(e);
    }

  });
};

//login an hr user
module.exports.loginUser = async (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  if (!body.email) {
    return res.status(400).send();
  }

  if (!body.password) {
    return res.status(400).send();
  }

  User.findByCredentials(body.email, body.password).then((user) => {
    if (!user) {
      return res.status(400).send();
    }
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send({ user });
    });
  }).catch((e) => {
    if (e.message === 'email not found') {
      res.status(400).send({ msg: e.message });
    }
    if (e.message === 'password not correct') {
      res.status(400).send({ msg: e.message });
    } else {
      res.status(500).send();
    }
  });
};

//log out an hr User
module.exports.logout = async (req, res) => {
  User.findByToken(req.token).then((user) => {
    user.tokens = _.remove(user.tokens, (currentToken) => {
      return currentToken.token !== req.token;
    });
    user.save();
    res.send();

  }).catch((err) => {
    res.status(500).send();
  });
};
