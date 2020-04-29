const controladorT = require("../../controladorTransaccional");
const servicio = require("../../../transactional/transactionServices/paisService");

class PaisController extends controladorT{
    constructor(){
        super(servicio,{});
    }
}

module.exports = PaisController;