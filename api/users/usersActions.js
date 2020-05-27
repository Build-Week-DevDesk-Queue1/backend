// registration, login, and logout

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/usersModel");
// const secrets = require("../config/secrets");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 12);

  user.password = hash;

  Users.add(user)
    .then((saved) => {
      if (req.body) {
        res.status(201).json(saved);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  // implement login

  let { username, password } = req.body;

  Users.findBy({ username: username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        req.session.user = {
          id: user.id,
          username: user.username,
          token: user.token,
        };
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ errorMessage: "Invalid credentials" });
      }
    })
    .catch(({err, name, message, stack, code}) => {
      res.status(500).json({err, name, message, stack, code});
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "8h",
  };
  return jwt.sign(payload, "keepitsecret", options);
}

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({
          message:
            "You can check out anytime you like, but you can never leave",
        });
      } else {
        res.status(200).json({ message: "logged out succeffully" });
      }
    });
  } else {
    res.status(200).json({ message: "already logged out" });
  }
});

module.exports = router;
