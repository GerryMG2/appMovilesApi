var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var opcionSchema = new Schema(
    {
        titulo_opcion: {type: String, required: true}
    }
);

module.exports = mongoose.model("opcion", opcionSchema);