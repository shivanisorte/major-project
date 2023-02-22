const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");

app.use(bodyParser.json());
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
