const appMappingController = require("../../controllers/appMapping/appMapping");
const auth = require("../../middleware/auth");

const routerappMapping = require("express").Router();

routerappMapping.post("/", appMappingController.create);
routerappMapping.get("/", auth, appMappingController.findAll);
routerappMapping.post("/count", appMappingController.countMeterTypes);
routerappMapping.get(
  "/datamapping",
  auth,
  appMappingController.findDataMapping
);
routerappMapping.get("/dataid", auth, appMappingController.findId);
routerappMapping.put(
  "/dataidupdate",
  auth,
  appMappingController.findIdAndUpdate
);
routerappMapping.post("/readid", appMappingController.findDataId);
routerappMapping.get("/countpeaname", appMappingController.countPeaname);
routerappMapping.post(
  "/countmetererror1",
  appMappingController.countMeterError1
);

routerappMapping.post(
  "/countmetererror2",
  appMappingController.countMeterError2
);

routerappMapping.post(
  "/countmetererror3",
  appMappingController.countMeterError3
);

routerappMapping.post(
  "/countmetererror4",
  appMappingController.countMeterError4
);

routerappMapping.post(
  "/countmetererror5",
  appMappingController.countMeterError5
);

routerappMapping.post(
  "/finddatamappingdetail",
  appMappingController.findDataMappingDetail
);

routerappMapping.get("/countpeause", appMappingController.countPeaUse);

module.exports = routerappMapping;
