const appMappingController = require("../../controllers/appMapping/appMapping");
const auth = require("../../middleware/auth");

const routerappMapping = require("express").Router();

routerappMapping.post("/", appMappingController.create);
routerappMapping.get("/",auth, appMappingController.findAll);
routerappMapping.post("/count", appMappingController.countMeterTypes);
routerappMapping.get("/datamapping",auth, appMappingController.findDataMapping);
routerappMapping.get("/dataid",auth, appMappingController.findId);
routerappMapping.put("/dataidupdate",auth, appMappingController.findIdAndUpdate);
routerappMapping.post("/readid", appMappingController.findDataId);
routerappMapping.get("/countpeaname",auth, appMappingController.countPeaname);
routerappMapping.post(
  "/countmetererror1",
  appMappingController.countMeterError1
);

module.exports = routerappMapping;
