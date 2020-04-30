const generalService = require("../generalServices/servicio");
const modelUsuario = require("../../models/usuario");


class usuarioService  extends generalService{
    constructor() {
        super(modelUsuario,
            {ok: "Usuario creado", err: "No se pudo crear el usuario"},
            {ok: "Usuario actualizado", err: "No se pudo actualizar el usuario"},
            {ok: "Usuario eliminado", err: "No se pudo eliminar el usuario"});   
    }
    
    
    validarContra(email, password, cb){
        try {
            this.get("",{email: email}, 1, 1, {}, (validar, users, total) => {
                if(validar && total == 1){
                    if(password == users[0].password){
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

module.exports = usuarioService;