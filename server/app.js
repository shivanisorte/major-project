const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
const coordinatorRouter = require("./routes/coordinator/index");
const studentRouter = require("./routes/student/index");
const guideRouter = require("./routes/guide/index");
const authRouter = require("./routes/auth");
const projectHubRouter =  require("./routes/projectHub");
const { initializeDBConnection } = require("./db/db.connect");

const whitelist = ["http://localhost:3000"];

const corsOptions = {
  origin: whitelist,
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));

initializeDBConnection();

app.use(bodyParser.json());
app.use("/", indexRouter);
app.use("/auth", authRouter);
// app.use(verificationMiddleware);
app.use("/coordinator", coordinatorRouter);
app.use("/student", studentRouter);
app.use("/guide", guideRouter);
app.use("/projectHub", projectHubRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
