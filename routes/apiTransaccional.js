var express = require('express');
var router = express.Router();


const ciudadController = require("../controllers/api_controllers_transaccional/ciudadController");
const ciudad = new ciudadController();

const clienteController = require("../controllers/api_controllers_transaccional/clienteController");
const cliente = new clienteController();

const descuentoController = require("../controllers/api_controllers_transaccional/descuentoController");
const descuento = new descuentoController();


const detalleEncuestaController = require("../controllers/api_controllers_transaccional/detalleEncuestaController");
const detalleEncuesta = new detalleEncuestaController();


const encuestaTController = require("../controllers/api_controllers_transaccional/encuestaController");
const encuestaT = new encuestaTController();


const paisController = require("../controllers/api_controllers_transaccional/paisController");
const pais = new paisController();


const servicioController = require("../controllers/api_controllers_transaccional/servicioController");
const servicio = new servicioController();


const tipoPagoController = require("../controllers/api_controllers_transaccional/tipoPagoController");
const tipoPago = new tipoPagoController();


const tipoTransaccionDocumentoController = require("../controllers/api_controllers_transaccional/tipoTransaccionDocumentoController");
const tipotransaccionDoc = new tipoTransaccionDocumentoController();


const transaccionController = require("../controllers/api_controllers_transaccional/transaccionController");
const transaccion = new transaccionController();


const transaccionDetalleController = require("../controllers/api_controllers_transaccional/transaccionDetalle");
const transaccionDetalle = new transaccionDetalleController();


const usuarioAdminController = require("../controllers/api_controllers_transaccional/usuarioAdminController");
const usuarioAdmin = new usuarioAdminController();


const usuarioController = require("../controllers/api_controllers_transaccional/usuarioController");
const usuario = new usuarioController();


router.get("/ciudad", ciudad.get);
router.get("/ciudad/id", ciudad.getOneById);
router.post("/ciudad", ciudad.create);
router.delete("/ciudad", ciudad.delete);
router.put("/ciudad", ciudad.update);
router.put("/ciudad/upsert", ciudad.updateOrCreate);

router.get("/cliente", cliente.get);
router.get("/cliente/id", cliente.getOneById);
router.post("/cliente", cliente.create);
router.delete("/cliente", cliente.delete);
router.put("/cliente", cliente.update);
router.put("/cliente/upsert", cliente.updateOrCreate);

router.get("/descuento", descuento.get);
router.get("/descuento/id", descuento.getOneById);
router.post("/descuento", descuento.create);
router.delete("/descuento", descuento.delete);
router.put("/descuento", descuento.update);
router.put("/descuento/upsert", descuento.updateOrCreate);

router.get("/detalleEncuesta", detalleEncuesta.get);
router.get("/detalleEncuesta/id", detalleEncuesta.getOneById);
router.post("/detalleEncuesta", detalleEncuesta.create);
router.delete("/detalleEncuesta", detalleEncuesta.delete);
router.put("/detalleEncuesta", detalleEncuesta.update);
router.put("/detalleEncuesta/upsert", detalleEncuesta.updateOrCreate);

router.get("/encuestaT", encuestaT.get);
router.get("/encuestaT/id", encuestaT.getOneById);
router.post("/encuestaT", encuestaT.create);
router.delete("/encuestaT", encuestaT.delete);
router.put("/encuestaT", encuestaT.update);
router.put("/encuestaT/upsert", encuestaT.updateOrCreate);

router.get("/pais", pais.get);
router.get("/pais/id", pais.getOneById);
router.post("/pais", pais.create);
router.delete("/pais", pais.delete);
router.put("/pais", pais.update);
router.put("/pais/upsert", pais.updateOrCreate);

router.get("/servicio", servicio.get);
router.get("/servicio/id", servicio.getOneById);
router.post("/servicio", servicio.create);
router.delete("/servicio", servicio.delete);
router.put("/servicio", servicio.update);
router.put("/servicio/upsert", servicio.updateOrCreate);

router.get("/tipoPago", tipoPago.get);
router.get("/tipoPago/id", tipoPago.getOneById);
router.post("/tipoPago", tipoPago.create);
router.delete("/tipoPago", tipoPago.delete);
router.put("/tipoPago", tipoPago.update);
router.put("/tipoPago/upsert", tipoPago.updateOrCreate);

router.get("/tipotransaccionDoc", tipotransaccionDoc.get);
router.get("/tipotransaccionDoc/id", tipotransaccionDoc.getOneById);
router.post("/tipotransaccionDoc", tipotransaccionDoc.create);
router.delete("/tipotransaccionDoc", tipotransaccionDoc.delete);
router.put("/tipotransaccionDoc", tipotransaccionDoc.update);
router.put("/tipotransaccionDoc/upsert", tipotransaccionDoc.updateOrCreate);

router.get("/transaccion", transaccion.get);
router.get("/transaccion/id", transaccion.getOneById);
router.post("/transaccion", transaccion.create);
router.delete("/transaccion", transaccion.delete);
router.put("/transaccion", transaccion.update);
router.put("/transaccion/upsert", transaccion.updateOrCreate);

router.get("/transaccionDetalle", transaccionDetalle.get);
router.get("/transaccionDetalle/id", transaccionDetalle.getOneById);
router.post("/transaccionDetalle", transaccionDetalle.create);
router.delete("/transaccionDetalle", transaccionDetalle.delete);
router.put("/transaccionDetalle", transaccionDetalle.update);
router.put("/transaccionDetalle/upsert", transaccionDetalle.updateOrCreate);

router.get("/usuarioAdmin", usuarioAdmin.get);
router.get("/usuarioAdmin/id", usuarioAdmin.getOneById);
router.post("/usuarioAdmin", usuarioAdmin.create);
router.delete("/usuarioAdmin", usuarioAdmin.delete);
router.put("/usuarioAdmin", usuarioAdmin.update);
router.put("/usuarioAdmin/upsert", usuarioAdmin.updateOrCreate);

router.get("/usuario", usuario.get);
router.get("/usuario/id", usuario.getOneById);
router.post("/usuario", usuario.create);
router.delete("/usuario", usuario.delete);
router.put("/usuario", usuario.update);
router.put("/usuario/upsert", usuario.updateOrCreate);




