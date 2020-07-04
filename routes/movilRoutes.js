var express = require('express');
var router = express.Router();
var loginController = require("../controllers/login/movil/login");
var authMovil = require("../security/movilsecurity/auth");
var controllerMovil = require("../controllers/movilControllers/movilControllers")

router.post("/login", loginController.postlogin);
router.get("/logout",authMovil,  loginController.logout);
router.post("/register", controllerMovil.registerPost);
router.get("/session",authMovil,  controllerMovil.session);
router.get("/encuestas",authMovil,  controllerMovil.encuestas);
router.post("/encuesta/createorupdate",authMovil,  controllerMovil.createOrUpdate);
router.delete("/encuestas/delete",authMovil,  controllerMovil.deleteEncuesta);
router.get("/encuestas/resolve",authMovil,  controllerMovil.getEncuestaToResolve);
router.post("/encuestas/resolve",authMovil,  controllerMovil.crearRespuesta);

module.exports = router;