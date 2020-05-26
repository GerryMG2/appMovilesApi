var express = require('express');
var router = express.Router();
var loginController = require("../controllers/login/movil/login");
var authMovil = require("../security/movilsecurity/auth");
var controllerMovil = require("../controllers/movilControllers/movilControllers")

router.post("/login", loginController.postlogin);
router.get("/logout",authMovil,  loginController.logout);
router.post("/register", controllerMovil.registerPost);


module.exports = router;