const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const router = express.Router();

router.get(
  "/payment",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("payment");
  }
);

module.exports = router;
