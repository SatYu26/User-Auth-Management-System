const express = require("express");
const bodyParser = require("body-parser");
const data = require("../test.json");

const router = express.Router();

router.use(bodyParser.json());

module.exports = () => {
  router.post("/", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      let check = false;

      for (var index = 0; index < data.length; ++index) {
        var user = data[index];

        if (user.email == email && user.password == password) {
          check = true;
        }
      }
      if (check) {
        return res.json({ success: true }, 200);
      } else {
        return res.json({ success: false }, 400);
      }
    } catch (err) {
      console.log(next(err));
      return next(err);
    }
  });

  return router;
};
