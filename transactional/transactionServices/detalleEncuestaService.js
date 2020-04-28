const transaccionModel = require("../model/genericModel");
const detalleEncuesta = require("../models/detalle_encuesta");
class detalleEncuestaService extends transaccionModel {
    constructor(){
        super(detalleEncuesta,"detalle_encuesta",{ok: "detalle_encuesta Creado",err: "No se pudo Crear el detalle_encuesta"},
        {ok: "detalle_encuesta actualizado", err:"No se pudo actualizar el detalle_encuesta"},
        {ok: "detalle_encuesta eliminado",err: "No se pudo eliminar el detalle_encuesta"});

    }

}

module.exports = detalleEncuestaService;