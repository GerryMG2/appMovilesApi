const transaccionModel = require("../model/genericModel");
const transaccionModelT = require("../models/transaccion");
class transaccionService extends transaccionModel {
    constructor(){
        super(transaccionModelT,"transaccion",{ok: "encuesta Creada",err: "No se pudo Crear la encuesta"},
        {ok: "encuesta actualizada", err:"No se pudo actualizar la encuesta"},
        {ok: "encuesta eliminada",err: "No se pudo eliminar la encuesta"});

    }


}

module.exports = transaccionService;