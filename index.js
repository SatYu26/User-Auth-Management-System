const express = require("express");

const path = require("path");

const app = express();
const routes = require("./routes");

const port = 3000;

app.use("/", routes());

app.listen(port, () => {
  console.log(`Express Server listning on port ${port}`);
});
