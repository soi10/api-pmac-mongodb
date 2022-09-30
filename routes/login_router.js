const login_idm = require("../controllers/login_controller");

const router_login_idm = require("express").Router();

router_login_idm.post("/idm", login_idm.userLogin);

module.exports = router_login_idm;