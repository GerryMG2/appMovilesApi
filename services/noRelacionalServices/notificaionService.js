const generalService = require("../generalServices/servicio")
const modelNotificacion = require("../../models/notificacion")


class notificacionService  extends generalService{
    constructor() {
        super(modelNotificacion,
            {ok: "Notificacion creada", err: "No se pudo crear la notificacion"},
            {ok: "Notificacion actualizada", err: "No se pudo actualizar la notificacion"},
            {ok: "Notificacion eliminada", err: "No se pudo eliminar la notificacion"});
    }
}

module.exports = notificacionService;