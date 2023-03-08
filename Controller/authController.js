// auth controller
const bcrypt = require("bcrypt");
const { create, findOne, findOneAndUpdate } = require("../models/admin");

const jwt = require("jsonwebtoken");
//const mongoose = require("mongoose");
const jwtDecode = require("jwt-decode");
const { render } = require("pug");
const secretKey = "secretkey";


// rendering 
exports.loginPage = (req ,res )=>{
  res.render("Login")
}
exports.signupPage = (req ,res )=>{
  res.render("Signup")
}



// This route allows users to log in by providing their email and password
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Find the user with the matching email address
  findOne(email)
    .then((user) => {
      if (!user) {
        // If no user is found, return an error
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare the provided password to the hashed password in the database
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          // If there is an error, return an error
          return res.status(500).json({ message: "Server error" });
        }
        if (!result) {
          // If the passwords do not match, return an error
          return res.status(401).json({ message: "Invalid email or password" });
        }
        // If the passwords match, create and sign a JWT

        //add token to user model
        //add to user model with update
        const token = jwt.sign({ email }, secretKey);

        user.token = token;
        findOneAndUpdate(email, user)
          .then((user) => {
            // If the user is successfully saved, create and sign a JWT

            // SEND USER IN BODY AND TOKEN IN HEADER WITH 200 STATUS
            res.setHeader("Authorization", "Bearer " + token);
            return res.status(200).json({ user });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Server error" });
          });
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    });
};

//add sign up function
exports.signup = (req, res) => {
  const { username, role, email, password } = req.body;
  // Check if the email is already in use
  findOne(email)
    .then((user) => {
      if (user) {
        // If the email is already in use, return an error
        return res.status(400).json({ message: "Email is already in use" });
      }
      // If the email is not in use, create a new user
      // const newUser = { email, password };
      const newUser = {
        username: username,
        role: role,
        email: email,
        password: password,
      };
      // Hash the password
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          // If there is an error, return an error
          return res.status(500).json({ message: "Server error" });
        }
        newUser.password = hash;
        // Save the new user
        const token = jwt.sign({ email }, secretKey);
        const admin = {
          token: token,
          role: role,
          username: username,
          email: email,
          password: password,
        };

        create(admin)
          .then((user) => {
            // If the user is successfully saved, create and sign a JWT
            // SEND USER IN BODY AND TOKEN IN HEADER WITH 200 STATUS
            res.setHeader("Authorization", "Bearer " + token);
            return res.status(200).json({ user });
          })
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Server error" });
          });
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "Server error" });
    });
};

exports.logout = (req, res) => {
  // Extract the JWT from the Authorization header
  const token = req.headers.authorization.split(" ")[1];
  //update token to null in admin model
  //get email from token
  const decoded = jwtDecode(token);
  const email = decoded.email;
  findOne(email).then((user) => {
    if (!user) {
      // If no user is found, return an error
      return res.status(401).json({ message: "Invalid email or password" });
    }
    var admin = {
      token: "",
      role: user.role,
      username: user.username,
      email: user.email,
      password: user.password,
    };
    //update token to null
    findOneAndUpdate(email, admin)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "Server error" });
      });

    // Verify the JWT and decode the payload
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        // If the JWT is invalid, return an error
        return res.status(401).json({ message: "Invalid token" });
      }
      // If the JWT is valid, log the user out by deleting the token from the header
      delete req.headers.authorization;
      // Return a success message
      return res.status(200).json({ message: "Logout successful" });
    });
  });
};
