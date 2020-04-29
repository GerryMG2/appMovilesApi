const genericController = require("../controlador");
const lanzamientoService = require("../../services/noRelacionalServices/lanzamientoService");

class lanzamientoController extends genericController{
    constructor(){
        super(lanzamientoService, {});
    }
}

module.exports = lanzamientoController;