const generalService = require("../generalServices/servicio");
const modelLanzamiento = require("../../models/lanzamiento");


class lanzamientoService  extends generalService{
    constructor() {
        super(modelLanzamiento,
            {ok: "Lanzamiento creado", err: "No se pudo crear el lanzamiento"},
            {ok: "Lanzamiento actualizado", err: "No se pudo actualizar el lanzamiento"},
            {ok: "Lanzamiento eliminado", err: "No se pudo eliminar el lanzamiento"});
    }
}

module.exports = lanzamientoService;