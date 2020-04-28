const transaccionModel = require("../model/genericModel");
const descuentoModel = require("../models/descuento");
class descuentoService extends transaccionModel {
    constructor(){
        super(descuentoModel,"descuento",{ok: "descuento Creado",err: "No se pudo Crear el descuento"},
        {ok: "descuento actualizado", err:"No se pudo actualizar el descuento"},
        {ok: "descuento eliminado",err: "No se pudo eliminar el descuento"});

    }

}

module.exports = descuentoService;