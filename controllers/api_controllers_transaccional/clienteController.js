const controladorT = require("../controladorTransaccional");
const servicio = require("../../transactional/transactionServices/clienteService");

class ClienteController extends controladorT{
    constructor(){
        super(servicio,{});
    }
}

module.exports = ClienteController;