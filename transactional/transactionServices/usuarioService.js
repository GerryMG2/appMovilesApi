const transaccionModel = require("../model/genericModel");
const usuarioModel = require("../models/usuario");
class usuarioServiceT extends transaccionModel {
    constructor(){
        super(usuarioModel,"usuario",{ok: "usuario Creada",err: "No se pudo Crear la usuario"},
        {ok: "usuario actualizada", err:"No se pudo actualizar la usuario"},
        {ok: "usuario eliminada",err: "No se pudo eliminar la usuario"});

    }

}

module.exports = usuarioServiceT;