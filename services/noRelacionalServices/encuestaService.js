const generalService = require("../generalServices/servicio");
const modelEncuesta = require("../../models/encuesta");


class encuestaService extends generalService {
    constructor() {
        super(modelEncuesta,
            { ok: "Encuesta creada", err: "No se pudo crear la encuesta" },
            { ok: "Encuesta actualizada", err: "No se pudo actualizar la encuesta" },
            { ok: "Encuesta eliminada", err: "No se pudo eliminar la encuesta" });
    }

    getEncuestas(mail, cb) {

        try {
            this.get("", { email: mail }, 1, 1, {}, (validar, user, count) => {
                if (validar) {
                    if (count == 1) {
                        this.get("", { usuario: user[0]["_id"] }, 0, 1, {}, (validar, encuestas, n) => {
                            if (validar) {
                                cb(true, encuestas, n)
                            } else {
                                cb(false, [], 0);
                            }
                        })
                    } else {
                        cb(false, [], 0);
                    }



                } else {
                    cb(false, [], 0);
                }
            });
        } catch (error) {
            console.log(error);
            cb(false, [], 0)
        }

    }
}

module.exports = encuestaService;