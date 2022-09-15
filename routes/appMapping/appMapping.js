const appMappingController = require("../../controllers/appMapping/appMapping");
const auth = require("../../middleware/auth");

const routerappMapping = require("express").Router();

routerappMapping.post("/", appMappingController.create);
routerappMapping.get("/", appMappingController.findAll);
routerappMapping.post("/count", appMappingController.countMeterTypes);
routerappMapping.get("/datamapping", appMappingController.findDataMapping);
routerappMapping.get("/dataid", appMappingController.findId);
routerappMapping.put("/dataidupdate", appMappingController.findIdAndUpdate);
routerappMapping.post("/readid", appMappingController.findDataId);

module.exports = routerappMapping;
