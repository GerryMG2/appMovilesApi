const transaccionModel = require("../model/genericModel");
const tipoTransaccionDocumentoModel = require("../models/tipo_transaccion_documento");
class tipoTransaccionDocumentoService extends transaccionModel {
    constructor(){
        super(tipoTransaccionDocumentoModel,"tipo_transaccion_documento",{ok: "tipo_transaccion_documento Creada",err: "No se pudo Crear tipo_transaccion_documento"},
        {ok: "tipo_transaccion_documento actualizada", err:"No se pudo actualizar tipo_transaccion_documento"},
        {ok: "tipo_transaccion_documento eliminada",err: "No se pudo eliminar tipo_transaccion_documento"});

    }

}

module.exports = tipoTransaccionDocumentoService;