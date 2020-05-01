const controladorT = require("../../controladorTransaccional");
const servicio = require("../../../transactional/transactionServices/descuentoService");

class DescuentoController extends controladorT{
    constructor(){
        super(servicio,{});
    }
}

module.exports = DescuentoController;