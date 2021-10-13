const express = require("express");
const bodyParser = require("body-parser");
const data = require("../test.json");
var fs = require("fs");

const router = express.Router();

router.use(bodyParser.json());

module.exports = () => {
  router.post("/", async (req, res, next) => {
    try {
      let clean = [];
      fs.writeFile("test.json", JSON.stringify(clean), function (err) {
        if (err) {
          return res.json({ success: false });
        }
      });

      return res.json({ success: true });
    } catch (err) {
      console.log(next(err));
      return next(err);
    }
  });

  return router;
};
