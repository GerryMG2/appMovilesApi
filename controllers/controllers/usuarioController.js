const genericController = require("../controlador");
const usuarioService = require("../../services/noRelacionalServices/usuarioService");

class usuarioController extends genericController {
    constructor(){
        super(usuarioService, {});
    }
}

module.exports = usuarioController;