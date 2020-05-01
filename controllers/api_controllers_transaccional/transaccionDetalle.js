const controladorT = require("../controladorTransaccional");
const servicio = require("../../transactional/transactionServices/transaccionDetalleService");

class transaccionDetalleController extends controladorT{
    constructor(){
        super(servicio,{});
    }
}

module.exports = transaccionDetalleController;