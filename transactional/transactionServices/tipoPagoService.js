const transaccionModel = require("../model/genericModel");
const tipoPagoModel = require("../models/tipo_pago");
class tipoPagoService extends transaccionModel {
    constructor(){
        super(tipoPagoModel,"tipo_pago",{ok: "tipo pago Creada",err: "No se pudo Crear tipo pago"},
        {ok: "tipo pago actualizada", err:"No se pudo actualizar tipo pago"},
        {ok: "tipo pago eliminada",err: "No se pudo eliminar tipo pago"});

    }

}

module.exports = tipoPagoService;