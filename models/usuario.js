var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var usuarioSchema = new Schema(
    {
        numId: { type: String, unique: true, require: true },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        peso: { type: Number, required: true },
        nacimiento: { type: Date, required: true },
        altura: { type: Number, required: true },
        pais: { type: String, required: true },
        cuidad: { type: String, required: true },
        sexo: { type: String, required: true },
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        tags: [{ type: String }],
        saldo: { type: Number, required: true },
        ip_disp: [{ type: String }],

        carrito: [{
            id_encuesta: {type: String, ref: "encuesta"},
            cant_personas: { type: Number, require: true },
            publico: [{ type: String, required: true }],
            costo: { type: Number, required: true },
            descuento: { type: String }
        }],

    }
);

module.exports = mongoose.model("usuario", usuarioSchema);