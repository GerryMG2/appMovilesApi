var express = require('express');
var router = express.Router();
var auth = require("../security/adminsecurity/auth");

const ciudadController = require("../controllers/api_controllers_transaccional/ciudadController");
const ciudad = new ciudadController();

const clienteController = require("../controllers/api_controllers_transaccional/clienteController");
const cliente = new clienteController();

const descuentoController = require("../controllers/api_controllers_transaccional/descuentoController");
const descuento = new descuentoController();

const cuentaController = require("../controllers/api_controllers_transaccional/cuentaController");
const cuenta = new cuentaController();


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


router.get("/ciudad",auth, ciudad.get);
router.get("/ciudad/id",auth, ciudad.getOneById);
router.post("/ciudad",auth, ciudad.create);
router.delete("/ciudad",auth, ciudad.delete);
router.put("/ciudad",auth, ciudad.update);
router.put("/ciudad/upsert",auth, ciudad.updateOrCreate);

router.get("/cliente",auth, cliente.get);
router.get("/cliente/id",auth, cliente.getOneById);
router.post("/cliente",auth, cliente.create);
router.delete("/cliente",auth, cliente.delete);
router.put("/cliente",auth, cliente.update);
router.put("/cliente/upsert",auth, cliente.updateOrCreate);

router.get("/cuenta",auth, cuenta.get);
router.get("/cuenta/id",auth, cuenta.getOneById);
router.post("/cuenta",auth, cuenta.create);
router.delete("/cuenta",auth, cuenta.delete);
router.put("/cuenta",auth, cuenta.update);
router.put("/cuenta/upsert",auth, cuenta.updateOrCreate);


router.get("/descuento",auth, descuento.get);
router.get("/descuento/id",auth, descuento.getOneById);
router.post("/descuento",auth, descuento.create);
router.delete("/descuento",auth, descuento.delete);
router.put("/descuento",auth, descuento.update);
router.put("/descuento/upsert",auth, descuento.updateOrCreate);

router.get("/detalleEncuesta",auth, detalleEncuesta.get);
router.get("/detalleEncuesta/id",auth, detalleEncuesta.getOneById);
router.post("/detalleEncuesta",auth, detalleEncuesta.create);
router.delete("/detalleEncuesta",auth, detalleEncuesta.delete);
router.put("/detalleEncuesta",auth, detalleEncuesta.update);
router.put("/detalleEncuesta/upsert",auth, detalleEncuesta.updateOrCreate);

router.get("/encuestaT",auth, encuestaT.get);
router.get("/encuestaT/id",auth, encuestaT.getOneById);
router.post("/encuestaT",auth, encuestaT.create);
router.delete("/encuestaT",auth, encuestaT.delete);
router.put("/encuestaT",auth, encuestaT.update);
router.put("/encuestaT/upsert",auth, encuestaT.updateOrCreate);

router.get("/pais",auth, pais.get);
router.get("/pais/id",auth, pais.getOneById);
router.post("/pais",auth, pais.create);
router.delete("/pais",auth, pais.delete);
router.put("/pais",auth, pais.update);
router.put("/pais/upsert",auth, pais.updateOrCreate);

router.get("/servicio",auth, servicio.get);
router.get("/servicio/id",auth, servicio.getOneById);
router.post("/servicio",auth, servicio.create);
router.delete("/servicio",auth, servicio.delete);
router.put("/servicio",auth, servicio.update);
router.put("/servicio/upsert",auth, servicio.updateOrCreate);

router.get("/tipoPago",auth, tipoPago.get);
router.get("/tipoPago/id",auth, tipoPago.getOneById);
router.post("/tipoPago",auth, tipoPago.create);
router.delete("/tipoPago",auth, tipoPago.delete);
router.put("/tipoPago",auth, tipoPago.update);
router.put("/tipoPago/upsert",auth, tipoPago.updateOrCreate);

router.get("/tipotransaccionDoc",auth, tipotransaccionDoc.get);
router.get("/tipotransaccionDoc/id",auth, tipotransaccionDoc.getOneById);
router.post("/tipotransaccionDoc",auth, tipotransaccionDoc.create);
router.delete("/tipotransaccionDoc",auth, tipotransaccionDoc.delete);
router.put("/tipotransaccionDoc",auth, tipotransaccionDoc.update);
router.put("/tipotransaccionDoc/upsert",auth, tipotransaccionDoc.updateOrCreate);

router.get("/transaccion",auth, transaccion.get);
router.get("/transaccion/id",auth, transaccion.getOneById);
router.post("/transaccion",auth, transaccion.create);
router.delete("/transaccion",auth, transaccion.delete);
router.put("/transaccion",auth, transaccion.update);
router.put("/transaccion/upsert",auth, transaccion.updateOrCreate);

router.get("/transaccionDetalle",auth, transaccionDetalle.get);
router.get("/transaccionDetalle/id",auth, transaccionDetalle.getOneById);
router.post("/transaccionDetalle",auth, transaccionDetalle.create);
router.delete("/transaccionDetalle",auth, transaccionDetalle.delete);
router.put("/transaccionDetalle",auth, transaccionDetalle.update);
router.put("/transaccionDetalle/upsert",auth, transaccionDetalle.updateOrCreate);

router.get("/usuarioAdmin",auth, usuarioAdmin.get);
router.get("/usuarioAdmin/id",auth, usuarioAdmin.getOneById);
router.post("/usuarioAdmin",auth, usuarioAdmin.create);
router.delete("/usuarioAdmin",auth, usuarioAdmin.delete);
router.put("/usuarioAdmin",auth, usuarioAdmin.update);
router.put("/usuarioAdmin/upsert",auth, usuarioAdmin.updateOrCreate);

router.get("/usuario",auth, usuario.get);
router.get("/usuario/id",auth, usuario.getOneById);
router.post("/usuario",auth, usuario.create);
router.delete("/usuario",auth, usuario.delete);
router.put("/usuario",auth, usuario.update);
router.put("/usuario/upsert",auth, usuario.updateOrCreate);


module.exports = router;

