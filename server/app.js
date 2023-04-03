const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const coordinatorRouter = require("./routes/coordinator/index");
const authRouter = require("./routes/auth");
const { initializeDBConnection } = require("./db/db.connect");
const {
  verificationMiddleware,
} = require("./middlewares/verificationMiddleware");

initializeDBConnection();

app.use(bodyParser.json());
app.use("/", indexRouter);
app.use("/auth", authRouter);
// app.use(verificationMiddleware);
app.use("/coordinator", coordinatorRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
