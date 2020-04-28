const transaccionModel = require("../model/genericModel");
const clientModel = require("../models/cliente");
class clienteService extends transaccionModel {
    constructor(){
        super(clientModel,"cliente",{ok: "Cliente Creado",err: "No se pudo Crear el cliente"},
        {ok: "cliente actualizado", err:"No se pudo actualizar el cliente"},
        {ok: "cliente eliminado",err: "No se pudo eliminar el cliente"});

    }

}

module.exports = clienteService;