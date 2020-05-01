const controladorT = require("../controladorTransaccional");
const servicio = require("../../transactional/transactionServices/ciudadService");

class CiudadController extends controladorT{
    constructor(){
        super(servicio,{});
    }
}

module.exports = CiudadController;