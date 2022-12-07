const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  const alreadyExistsUser = await User.findOne({
    where: { fullName, email },
  }).catch((err) => {
    console.log(err);
  });

  if (alreadyExistsUser) {
    return res.json({ message: "User with email already exists" });
  }

  const newUser = new User({
    fullName,
    email,
    password,
  });

  const savedUser = await newUser.save().catch((err) => {
    console.log("Error", err);
    res.json({ error: "Cannot register user at the moment" });
  });

  console.log(savedUser)

  if (savedUser) res.json({ message: "User has been registered" });
  else res.json({ error: "Cannot register user at the moment" });
});

module.exports = router;
