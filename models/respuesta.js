var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var respuestaSchema = new Schema(
    {
        usuario: {type: String, ref: "usuario"},
        encuesta: {type: String, ref: "encuesta"},
        pagada: {type: Boolean, required: true},
        respuesta: [{id_pregunta: {type: String}, id_respuesta: {type: String},respuesta_abierta: {type: String}}],
         //respuesta tiene dos referencias(buscar como se hace eso)!\
         //refOutItsel: {camporef: "encuesta",campo: "preguntas", fielSave: "_id", show: "encabezado"}
         //refOutItsel: {camporef: "encuesta", campo: "preguntas.opciones", fielSave: "_id", show: "titulo_opcion"}
        fecha: {type: Date},
        ip_disp: {type: String}
    }
);

module.exports = mongoose.model("respuesta", respuestaSchema);