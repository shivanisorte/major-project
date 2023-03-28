const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const coordinatorRouter = require("./routes/coordinator/index");
const authRouter = require("./routes/auth");
const { initializeDBConnection } = require("./db/db.connect");

initializeDBConnection();

app.use(bodyParser.json());
app.use("/", indexRouter);
app.use("/coordinator", coordinatorRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
