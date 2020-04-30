const generalService = require("../generalServices/servicio");
const modelRespuesta = require("../../models/respuesta");


class respuestaService  extends generalService{
    constructor() {
        super(modelRespuesta,
            {ok: "Respuesta creada", err: "No se pudo crear la respuesta"},
            {ok: "Respuesta actualizada", err: "No se pudo actualizar la respuesta"},
            {ok: "Respuesta eliminada", err: "No se pudo eliminar la respuesta"});
    }
}

module.exports = respuestaService;