const controladorT = require("../controladorTransaccional");
const servicio = require("../../transactional/transactionServices/tipoPagoService");

class TipoPagoController extends controladorT{
    constructor(){
        super(servicio,{});
    }
}

module.exports = TipoPagoController;