const transaccionModel = require("../model/genericModel");
const ciudadModel = require("../models/ciudad");

class ciudadService extends transaccionModel {
    constructor(){
        super(ciudadModel,"ciudad",{ok: "ciudad Creada",err: "No se pudo Crear la ciudad"},
        {ok: "ciudad actualizado", err:"No se pudo actualizar la ciudad"},
        {ok: "ciudad eliminada",err: "No se pudo eliminar la ciudad"});

    }

}

module.exports = ciudadService;