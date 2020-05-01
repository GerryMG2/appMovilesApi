const controladorT = require("../controladorTransaccional");
const servicio = require("../../transactional/transactionServices/encuestaService");

class EncuestaController extends controladorT{
    constructor(){
        super(servicio,{});
    }
}

module.exports = EncuestaController;