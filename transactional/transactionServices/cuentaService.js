const transaccionModel = require("../model/genericModel");
const cuentaModel = require("../models/cuenta");
class cuentaService extends transaccionModel {
    constructor(){
        super(cuentaModel,"cuenta",{ok: "cuenta Creada",err: "No se pudo Crear la cuenta"},
        {ok: "cuenta actualizada", err:"No se pudo actualizar la cuenta"},
        {ok: "cuenta eliminada",err: "No se pudo eliminar la cuenta"});

    }

}

module.exports = cuentaService;