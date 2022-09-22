const appSearchController = require("../../controllers/appSearch/appSearch");

const routerappSearch = require("express").Router();

routerappSearch.post("/", appSearchController.search);

module.exports = routerappSearch;
