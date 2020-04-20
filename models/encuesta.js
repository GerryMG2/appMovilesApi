var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var encuestaSchema = new Schema(
    {
        usuario: [{type: String, ref: "usuario"}],
        nombre_encuesta: {type: String, require: true},
        descrip_encuesta: {type: String, required: true},
        ip_disp: {type: Number, required: true},
        tags_publico: [{type: String}],
        lanzamiento_pago: [{type: String, ref: "lanzamiento"}],
        
        preguntas: [{type: String, required: true}],
        encabezado: {type: String, require: true},
        tipo: {type: String, required: true},
        pregunta_abierta: {type: Boolean, required: true},
        multi_respuesta: {type: Boolean, required: true},
        requiere: [{type: String}],
        opciones: [{type: String, required: true}],

        titulo_opcion: {type: String, required: true}
    }
);

module.exports = mongoose.model("encuesta", encuestaSchema);