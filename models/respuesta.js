var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var respuestaSchema = new Schema(
    {
        usuario: [{type: String, ref: "usuario"}],
        encuesta: [{type: String, ref: "encuesta"}],
        pagada: {type: Boolean, required: true},
        ip_disp: {type: Number, required: true},
        respuesta: {type:String}, //respuesta tiene dos referencias(buscar como se hace eso)!
        fecha: {type: Date},
        ip_disp: {type: String}
    }
);

module.exports = mongoose.model("respuesta", respuestaSchema);