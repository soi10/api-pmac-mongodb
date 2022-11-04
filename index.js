require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const auth = require("./middleware/auth");
const expressSanitizer = require("express-sanitizer");
const helmet = require("helmet");
const reateLimit = require("express-rate-limit");
require("dotenv").config();

global.__basedir = __dirname + "/..";

app.use(cors());
app.use(
  express.json({
    limit: "50mb",
  })
);
const apiRatelimit = reateLimit({
  windowMs: 60 * 60 * 100,
  max: 100,
  message: "You have exceeded the 100 requests in 1 hrs limit!",
  headers: true,
});
app.use(apiRatelimit);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const jsonParser = bodyParser.json();

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(express.json());
app.use(expressSanitizer());
app.use(helmet());

const routerappMapping = require("./routes/appMapping/appMapping");
const routerappSearch = require("./routes/appSearch/appSearch");
const routerpeaTomruname = require("./routes/peaTomruname/peaTomruname");
const routerRegisDevice = require("./routes/regis_device");
const routerUpload = require("./routes/uploads");
const login_idm = require("./routes/login_router");
const login_register = require("./routes/login_register_router");

app.use("/appMapping/", jsonParser, routerappMapping);
app.use("/peatomruname/", jsonParser, routerpeaTomruname);
app.use("/regisdevice/", routerRegisDevice);
app.use("/uploads/", routerUpload);
app.use("/appsearch/", jsonParser, routerappSearch);
app.use("/login/api/", jsonParser, login_idm);
app.use("/logintest/", login_register);

app.get("/login/", (req, res) => {
  res.json({
    message: "Hello from api",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
