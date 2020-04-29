const generalService = require("../generalServices/servicio")
const modelUsuario = require("../../models/usuario")


class usuarioService  extends generalService{
    constructor() {
        super(modelUsuario,
            {ok: "Usuario creado", err: "No se pudo crear el usuario"},
            {ok: "Usuario actualizado", err: "No se pudo actualizar el usuario"},
            {ok: "Usuario eliminado", err: "No se pudo eliminar el usuario"});
    }
}

module.exports = usuarioService;