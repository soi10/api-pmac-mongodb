const RegisDeviceController = require("../controllers/regis_device");
const routerRegisDevice = require("express").Router();

routerRegisDevice.post("/", RegisDeviceController.create);
routerRegisDevice.get("/", RegisDeviceController.findAll);

module.exports = routerRegisDevice;