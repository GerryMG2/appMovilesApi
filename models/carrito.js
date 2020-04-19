var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var carritoSchema = new Schema(
    {
        encuesta: [{type: String, ref: "encuesta"}],
        cant_personas: {type: Number, require: true},
        publico: [{type: String, required: true}],
        costo: {type: Number, required: true},
        descuento: {type: String}
    }
);

module.exports = mongoose.model("carrito", carritoSchema);