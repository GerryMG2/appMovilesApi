const genericController = require("../controlador");
const encuestaService = require("../../services/noRelacionalServices/encuestaService");

class encuestaController extends genericController{
    constructor(){
        super(encuestaService, {});
    }
}

module.exports = encuestaController;