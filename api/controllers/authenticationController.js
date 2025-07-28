const user = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

const tokenForuser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};

exports.signin = (req, res) => {
  // The `requireLogin` middleware has already authenticated the user.
  // We just need to give them a token. `req.user` is provided by Passport.
  res.json({
    token: tokenForuser(req.user),
    user: {
      id: req.user._id,
      email: req.user.email,
      username: req.user.username,
    },
  });
};

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // See if a user with the given email exists
    const existingEmail = await user.findOne({ email: email });
    if (existingEmail) {
      return res.status(422).json({ message: "Email is already in use" });
    }

    // See if a user with the given username exists
    const existingUsername = await user.findOne({ username: username });
    if (existingUsername) {
      return res.status(422).json({ message: "Username is already in use" });
    }

    // If a user with email and username does NOT exist, create and save user record
    const newUser = new user({
      username: username,
      email: email,
      password: password,
    });

    await newUser.save();

    // Respond to request indicating the user was created
    res.status(201).json({
      token: tokenForuser(newUser),
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
      },
    });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    // Check for MongoDB duplicate key error, which can happen in a race condition
    if (error.code === 11000) {
      return res
        .status(422)
        .json({ message: "Email or username already exists" });
    }
    return res.status(500).json({ message: "Error saving user" });
  }
};
