const controladorT = require("../controladorTransaccional");
const servicio = require("../../transactional/transactionServices/servicioService");

class ServicioController extends controladorT{
    constructor(){
        super(servicio,{});
    }
}

module.exports = ServicioController;