require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const auth = require('./middleware/auth')

global.__basedir = __dirname + "/..";

app.use(cors());
app.use(
  express.json({
    limit: "50mb",
  })
);

const jsonParser = bodyParser.json();

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const routerappMapping = require("./routes/appMapping/appMapping");
const routerappSearch = require("./routes/appSearch/appSearch");
const routerRegisDevice = require("./routes/regis_device");
const routerUpload = require("./routes/uploads");

app.use("/appMapping/", routerappMapping);
app.use("/regisdevice/", routerRegisDevice);
app.use("/uploads/",routerUpload);
app.use("/appsearch/", jsonParser, routerappSearch);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
