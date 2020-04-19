var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var lanzamientoSchema = new Schema(
    {
        usuario: [{type: String, ref: "usuario"}],
        encuesta: [{type: String, ref: "encuesta"}],
        cantidad_usuario: {type: Number, required: true},
        pagada: {type: Boolean, required: true},
        cantidad_respuesta: {type: Number, required: true}, 
        encuesta_terminada: {type: Boolean, required: true},
        costo: {type: Number}
    }
);

module.exports = mongoose.model("lanzamiento", lanzamientoSchema);