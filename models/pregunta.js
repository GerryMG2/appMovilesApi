var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var preguntaSchema = new Schema(
    {
        encabezado: {type: String, require: true},
        tipo: {type: String, required: true},
        pregunta_abierta: {type: Boolean, required: true},
        multi_respuesta: {type: Boolean, required: true},
        requiere: [{type: String}],
        opciones: [{type: String, required: true}]
    }
);

module.exports = mongoose.model("pregunta", preguntaSchema);