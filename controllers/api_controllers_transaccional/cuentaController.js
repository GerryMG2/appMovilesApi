const controladorT = require("../controladorTransaccional");
const servicio = require("../../transactional/transactionServices/cuentaService");

class CuentaController extends controladorT{
    constructor(){
        super(servicio,{});
    }
}

module.exports = CuentaController;