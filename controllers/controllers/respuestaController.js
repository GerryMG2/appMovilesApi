const genericController = require("../controlador");
const respuestaService = require("../../services/noRelacionalServices/respuestaService");

class respuestaController extends genericController{
    constructor(){
        super(respuestaService, {});
    }
}

module.exports = respuestaController;