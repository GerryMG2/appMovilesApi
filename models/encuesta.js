var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var encuestaSchema = new Schema(
    {
        usuario: { type: String, ref: "usuario" },
        nombre_encuesta: { type: String, require: true },
        descrip_encuesta: { type: String, required: true },
        ip_disp: { type: String, required: true },
        tags_publico: [{ type: String }],
        lanzamiento_pago: [{ type: String, ref: "lanzamiento" }],

        preguntas: [{
            encabezado: { type: String, require: true },
            tipo: { type: String, required: true },
            pregunta_abierta: { type: Boolean, required: true },
            multi_respuesta: { type: Boolean, required: true },
            requiere: { type: Boolean, required: true },
            opciones: [{ titulo_opcion: { type: String } }]
        }]
    }
);

module.exports = mongoose.model("encuesta", encuestaSchema);