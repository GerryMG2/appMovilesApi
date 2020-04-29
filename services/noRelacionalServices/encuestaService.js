const generalService = require("../generalServices/servicio")
const modelEncuesta = require("../../models/encuesta")


class encuestaService  extends generalService{
    constructor() {
        super(modelEncuesta,
            {ok: "Encuesta creada", err: "No se pudo crear la encuesta"},
            {ok: "Encuesta actualizada", err: "No se pudo actualizar la encuesta"},
            {ok: "Encuesta eliminada", err: "No se pudo eliminar la encuesta"});
    }
}

module.exports = encuestaService;