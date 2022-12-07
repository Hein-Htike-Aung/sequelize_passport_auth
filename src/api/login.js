const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userWithEmail = await User.findOne({ where: { email } }).catch(
    (err) => {
      console.log(err);
    }
  );

  if (!userWithEmail)
    return res.json({ message: "Email or password doesn't match" });

  if (userWithEmail.password !== password)
    return res.json({ message: "Email or password doesn't match" });

  const jwtToken = jwt.sign(
    {
      id: userWithEmail.id,
      email: userWithEmail.email,
    },
    process.env.JWT_SECRET
  );

  res.json({ message: "login successfully", token: jwtToken });
});

module.exports = router;
