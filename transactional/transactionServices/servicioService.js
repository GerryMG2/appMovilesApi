const transaccionModel = require("../model/genericModel");
const servicioModel = require("../models/servicio");
class servicioService extends transaccionModel {
    constructor(){
        super(servicioModel,"servicio",{ok: "servicio Creado",err: "No se pudo Crear el servicio"},
        {ok: "servicio actualizado", err:"No se pudo actualizar el servicio"},
        {ok: "servicio eliminado",err: "No se pudo eliminar el servicio"});

    }

}

module.exports = servicioService;