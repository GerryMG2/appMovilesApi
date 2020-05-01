var express = require('express');
var router = express.Router();

const encuestaController = require("../controllers/api_controller_norelational/encuestaController");
const encuesta = new encuestaController();

const lanzamientoController = require("../controllers/api_controller_norelational/lanzamientoController");
const lanzamiento = new lanzamientoController();

const notificacionController = require("../controllers/api_controller_norelational/notificacionController");
const notificacion = new notificacionController();

const respuestaController = require("../controllers/api_controller_norelational/respuestaController");
const respuesta = new respuestaController();

const usuarioController = require("../controllers/api_controller_norelational/usuarioController");
const usuario = new usuarioController();

router.get("/encuesta", encuesta.get);
router.get("/encuesta/id", encuesta.getOneById);
router.post("/encuesta", encuesta.create);
router.delete("/encuesta", encuesta.delete);
router.put("/encuesta", encuesta.update);
router.put("/encuesta/upsert", encuesta.updateOrCreate);

router.get("/lanzamiento", lanzamiento.get);
router.get("/lanzamiento/id", lanzamiento.getOneById);
router.post("/lanzamiento", lanzamiento.create);
router.delete("/lanzamiento", lanzamiento.delete);
router.put("/lanzamiento", lanzamiento.update);
router.put("/lanzamiento/upsert", lanzamiento.updateOrCreate);

router.get("/notificacion", notificacion.get);
router.get("/notificacion/id", notificacion.getOneById);
router.post("/notificacion", notificacion.create);
router.delete("/notificacion", notificacion.delete);
router.put("/notificacion", notificacion.update);
router.put("/notificacion/upsert", notificacion.updateOrCreate);

router.get("/respuesta", respuesta.get);
router.get("/respuesta/id", respuesta.getOneById);
router.post("/respuesta", respuesta.create);
router.delete("/respuesta", respuesta.delete);
router.put("/respuesta", respuesta.update);
router.put("/respuesta/upsert", respuesta.updateOrCreate);

router.get("/usuario", usuario.get);
router.get("/usuario/id", usuario.getOneById);
router.post("/usuario", usuario.create);
router.delete("/usuario", usuario.delete);
router.put("/usuario", usuario.update);
router.put("usuario/upsert", usuario.updateOrCreate);


module.exports = router;