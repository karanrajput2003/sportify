const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const dbConfig = require("../config/db.config.js");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  // Create a new user based on the User model
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    contact_no: req.body.contact_no, // Added contact_no
    company_name: req.body.company_name, // Added company_name
    dept_name: req.body.dept_name, // Added dept_name
    password: bcrypt.hashSync(req.body.password, 8)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.status(201).json({
              _id: user._id,
              username: user.username,
              email: user.email,
            });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
          });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      const token = jwt.sign({ id: user.id },
                              dbConfig.JWT_SECRET_KEY,
                              {
                                algorithm: 'HS256',
                                allowInsecureKeySizes: true,
                                expiresIn: 86400, // 24 hours
                              });
                              
      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.cookie(String(user._id), token,{
        path: '/',
        expires: new Date(Date.now() + 1000 *60*60),
        httpOnly: true,
        sameSite: 'lax'
    });
      res.status(200).json({
        id: user._id,
        email: user.email,
        name: user.name,
        age: user.age,
        aadhar_no: user.aadhar_no,
        Address: user.Address,
        roles: authorities,
        accessToken: token
      });
    });
};


exports.logout = (req, res) => {
  const cookie = req.headers.cookie;

  if (!cookie) {
      return res.status(403).send({ message: "No cookie provided!" });
  }

  const token = cookie.split("=")[1];

  if (!token) {
      return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, dbConfig.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
          return res.status(401).send({
              message: "Unauthorized!",
          });
      }

      const userId = decoded.id;

      res.clearCookie(`${userId}`);
      return res.status(200).json({ message: "Successfully Logged Out" });
  });
};

