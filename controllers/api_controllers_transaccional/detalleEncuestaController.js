const controladorT = require("../controladorTransaccional");
const servicio = require("../../transactional/transactionServices/detalleEncuestaService");

class DetalleEncuestaController extends controladorT{
    constructor(){
        super(servicio,{});
    }
}

module.exports = DetalleEncuestaController;