const express = require("express");
const SignUp = require("./sign-up");
const SignIn = require("./sign-in");
const Clean = require("./clean");

const router = express.Router();

module.exports = () => {
  router.use("/sign-up", SignUp());
  router.use("/sign-in", SignIn());
  router.use("/clean", Clean());

  return router;
};
