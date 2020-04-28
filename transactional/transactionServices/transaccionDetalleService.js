const transaccionModel = require("../model/genericModel");
const transaccionDetalleModel = require("../models/transaccion_detalle");
class transaccionDetalleService extends transaccionModel {
    constructor() {
        super(transaccionDetalleModel, "transaccion_detalle", { ok: "transaccion_detalle Creado", err: "No se pudo Crear el transaccion_detalle" },
            { ok: "transaccion_detalle actualizado", err: "No se pudo actualizar el transaccion_detalle" },
            { ok: "transaccion_detalle eliminado", err: "No se pudo eliminar el transaccion_detalle" });

    }

}

module.exports = transaccionDetalleService;