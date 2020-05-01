const controladorT = require("../controladorTransaccional");
const servicio = require("../../transactional/transactionServices/usuarioService");

class usuarioController extends controladorT{
    constructor(){
        super(servicio,{});
    }
}

module.exports = usuarioController;