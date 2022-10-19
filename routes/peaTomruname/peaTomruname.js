const peaTomrunameController = require("../../controllers/peaTomruname/peaTomruname");

const routerpeaTomruname = require("express").Router();

routerpeaTomruname.post("/", peaTomrunameController.search);
routerpeaTomruname.get("/getname", peaTomrunameController.getname);

module.exports = routerpeaTomruname;
