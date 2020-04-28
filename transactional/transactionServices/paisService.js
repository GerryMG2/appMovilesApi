const transaccionModel = require("../model/genericModel");
const paisModel = require("../models/pais");
class paisService extends transaccionModel {
    constructor(){
        super(paisModel,"pais",{ok: "pais Creada",err: "No se pudo Crear el pais"},
        {ok: "pais actualizado", err:"No se pudo actualizar el pais"},
        {ok: "pais eliminado",err: "No se pudo eliminar el pais"});

    }

}

module.exports = paisService;