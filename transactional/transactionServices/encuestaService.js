const transaccionModel = require("../model/genericModel");
const encuestaModel = require("../models/encuesta");
class encuestaService extends transaccionModel {
    constructor(){
        super(encuestaModel,"encuesta",{ok: "encuesta Creada",err: "No se pudo Crear la encuesta"},
        {ok: "encuesta actualizada", err:"No se pudo actualizar la encuesta"},
        {ok: "encuesta eliminada",err: "No se pudo eliminar la encuesta"});

    }

}

module.exports = encuestaService;