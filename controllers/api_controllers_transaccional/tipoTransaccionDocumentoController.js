const controladorT = require("../controladorTransaccional");
const servicio = require("../../transactional/transactionServices/tipoTransaccionDocumentoService");

class tipoTransaccionDocumentoController extends controladorT{
    constructor(){
        super(servicio,{});
    }
}

module.exports = tipoTransaccionDocumentoController;