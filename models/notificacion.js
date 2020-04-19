var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var notificacionSchema = new Schema(
    {
        usuario: [{type: String, ref: "usuario"}],
        encuesta: [{type: String, ref: "encuesta"}],
        descripcion: {type: String, required: true},
        tipo_notificacion: {type: String, required: true},
        eliminada: {type: String, required: true}, 
        date: {type: Date, required: true},
        vista: {type: Boolean, required: true}
    }
);

module.exports = mongoose.model("notificacion", notificacionSchema);