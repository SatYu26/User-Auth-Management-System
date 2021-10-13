const express = require("express");
const { check, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
var fs = require("fs");

const router = express.Router();

router.use(bodyParser.json());

const validations = [
  check("name")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .withMessage("A name is required"),
  check("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("A valid email is required"),
  check("password")
    .trim()
    .isLength({ min: 8 })
    .escape()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "i"
    )
    .withMessage("A valid password is required"),
];
var arr = [];

module.exports = () => {
  router.post("/", validations, async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.json({ success: false }, 400);
      }

      const { name, email, password } = req.body;
      arr.push({ name, email, password });
      var jsonData = JSON.stringify(arr);
      console.log(jsonData);
      fs.writeFile("test.json", jsonData, function (err) {
        if (err) {
          console.log(err);
        }
      });

      return res.json({ success: true }, 201);
    } catch (err) {
      console.log(next(err));
      return next(err);
    }
  });

  return router;
};
