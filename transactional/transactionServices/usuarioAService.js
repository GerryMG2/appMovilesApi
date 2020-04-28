const transaccionModel = require("../model/genericModel");
const usuarioAModel = require("../models/usuarioAdmin");
class usuarioAServiceT extends transaccionModel {
    constructor(){
        super(usuarioAModel,"adminUsers",{ok: "usuario Creada",err: "No se pudo Crear la usuario"},
        {ok: "usuario actualizada", err:"No se pudo actualizar la usuario"},
        {ok: "usuario eliminada",err: "No se pudo eliminar la usuario"});

    }

}

module.exports = usuarioAServiceT;