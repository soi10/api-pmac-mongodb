const peaTomrunameController = require("../../controllers/peaTomruname/peaTomruname");

const routerpeaTomruname = require("express").Router();

routerpeaTomruname.post("/", peaTomrunameController.search);

module.exports = routerpeaTomruname;
