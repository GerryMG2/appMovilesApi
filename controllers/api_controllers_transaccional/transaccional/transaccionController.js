const controladorT = require("../../controladorTransaccional");
const servicio = require("../../../transactional/transactionServices/transaccionService");

class transaccionController extends controladorT{
    constructor(){
        super(servicio,{});
    }
}

module.exports = transaccionController;