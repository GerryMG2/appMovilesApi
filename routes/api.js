var express = require('express');
var router = express.Router();
var auth = require("../security/adminsecurity/auth");

const encuestaController = require("../controllers/api_controller_norelational/encuestaController");
const encuesta = new encuestaController();
console.log("encuesta ID: ",encuesta.service.modelId);
const lanzamientoController = require("../controllers/api_controller_norelational/lanzamientoController");
const lanzamiento = new lanzamientoController();

const notificacionController = require("../controllers/api_controller_norelational/notificacionController");
const notificacion = new notificacionController();

const respuestaController = require("../controllers/api_controller_norelational/respuestaController");
const respuesta = new respuestaController();

const usuarioController = require("../controllers/api_controller_norelational/usuarioController");
const usuario = new usuarioController();

router.get("/encuesta",auth, encuesta.get);
router.get("/encuesta/id",auth, encuesta.getOneById);
router.post("/encuesta",auth, encuesta.create);
router.delete("/encuesta",auth, encuesta.delete);
router.put("/encuesta",auth, encuesta.update);
router.put("/encuesta/upsert",auth, encuesta.updateOrCreate);

router.get("/lanzamiento",auth, lanzamiento.get);
router.get("/lanzamiento/id",auth, lanzamiento.getOneById);
router.post("/lanzamiento",auth, lanzamiento.create);
router.delete("/lanzamiento",auth, lanzamiento.delete);
router.put("/lanzamiento",auth, lanzamiento.update);
router.put("/lanzamiento/upsert",auth, lanzamiento.updateOrCreate);

router.get("/notificacion",auth, notificacion.get);
router.get("/notificacion/id",auth, notificacion.getOneById);
router.post("/notificacion",auth, notificacion.create);
router.delete("/notificacion",auth, notificacion.delete);
router.put("/notificacion",auth, notificacion.update);
router.put("/notificacion/upsert",auth, notificacion.updateOrCreate);

router.get("/respuesta",auth, respuesta.get);
router.get("/respuesta/id",auth, respuesta.getOneById);
router.post("/respuesta",auth, respuesta.create);
router.delete("/respuesta",auth, respuesta.delete);
router.put("/respuesta",auth, respuesta.update);
router.put("/respuesta/upsert",auth, respuesta.updateOrCreate);

router.get("/usuario",auth, usuario.get);
router.get("/usuario/id",auth, usuario.getOneById);
router.post("/usuario",auth, usuario.create);
router.delete("/usuario",auth, usuario.delete);
router.put("/usuario",auth, usuario.update);
router.put("usuario/upsert",auth, usuario.updateOrCreate);


module.exports = router;