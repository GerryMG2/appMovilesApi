const transaccionModel = require("../model/genericModel");
const usuarioAModel = require("../models/usuarioAdmin");

class usuarioAServiceT extends transaccionModel {
    constructor(){
        super(usuarioAModel,"adminusers",{ok: "usuario Creada",err: "No se pudo Crear la usuario"},
        {ok: "usuario actualizada", err:"No se pudo actualizar la usuario"},
        {ok: "usuario eliminada",err: "No se pudo eliminar la usuario"});
    }

    validatePass(username, password, cb){
        try {
            this.get("", {username: username}, 1, 1, (validar, users, total)=>{
                if (validar && total == 1) {
                    if (password == users[0].password) {
                        cb(true);
                    } else {
                        cb(false);
                    }
                } else {
                    cb(false);
                }
            });
        } catch (error) {
            cb(false);
        }
    }

}

module.exports = usuarioAServiceT;