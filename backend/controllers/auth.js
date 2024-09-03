const User = require("../models/User.js");
const bcrypt = require("bcrypt");

async function postSignUp(req, res) {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const newUser = new User({ username, password });

  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error creating the user: ${error.message}` });
  }
}

async function postSignIn(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({ message: "Sign-in successfull" });
  } else {
    res.status(401).json({ message: "Invalid credetials" });
  }
}

module.exports = {
  postSignUp,
  postSignIn,
};
