const UploadController = require("../controllers/uploads");
const routerUpload = require("express").Router();
const upload = require("../middleware/uploadsfile");

routerUpload.post("/", upload.single("file"), UploadController.upload);
//routerUpload.get("/", RegisDeviceController.findAll);

module.exports = routerUpload;