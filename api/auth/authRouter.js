const express = require('express');
const Users = require('../users/usersModel.js');
const bcrypt = require('bcryptjs');
const router = express();

router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    Users.insert(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json({message: `Error registering new user: ${error}`});
        })
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    Users.findBy({ username })
      .then(user => {
        // check user password
        if(!user || !bcrypt.compareSync(password, user.password)){
              res.status(401).json({message: `Invalid user credentials.`});
              return;
        }
      
        if(user){
          req.session.user = user;
          res.status(200).json({message: `User login successful.`});
        } else {
          res.status(401).json({message: `Invalid user credentials.`});
        }
      })
      .catch(error => {
        res.status(500).json({message: `Error logging in user: ${error}`});
      })
  });

router.post('/logout', (req, res) => {
    if(req.session && req.session.user){
        req.session.destroy(error => {
            if (error) {
                res.status(500).json({message: `Error logging out user: ${error}`});
            } else {
                res.status(202).json({message: `User successfully logged out.`});
            }
            });
    } else {
        res.end();
    }
});

module.exports = router;