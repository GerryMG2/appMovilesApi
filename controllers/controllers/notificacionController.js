const genericController = require("../controlador");
const notificacionService = require("../../services/noRelacionalServices/notificaionService");

class notificacionController extends genericController{
    constructor(){
        super(notificacionService, {});
    }
}

module.exports = notificacionController;