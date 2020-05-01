const controladorT = require("../../controladorTransaccional");
const servicio = require("../../../transactional/transactionServices/usuarioAService");

class usuarioAController extends controladorT{
    constructor(){
        super(servicio,{});
    }
}

module.exports = usuarioAController;