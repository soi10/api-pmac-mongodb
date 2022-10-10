const login_regis = require("../controllers/login_register_controller");
const passportJWT = require('../middleware/passport-jwt')
const router_login_register = require("express").Router();
const auth = require('../middleware/auth')

router_login_register.post("/test", login_regis.register);
router_login_register.post("/login", login_regis.login);
router_login_register.get("/profile",[passportJWT.isLogin], login_regis.getprofile);
router_login_register.get('/',(req,res)=>{
    res.json({message:'hello test login'})
})

module.exports = router_login_register;