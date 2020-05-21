var express = require('express');
var router = express.Router();
var loginController = require("../controllers/login/movil/login");
var authMovil = require("../security/movilsecurity/auth");

router.post("/login", loginController.postlogin);
router.get("/logout",authMovil,  loginController.logout);


module.exports = router;