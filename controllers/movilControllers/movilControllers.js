const service = require("../../services/noRelacionalServices/usuarioService");
const register = new service();

registerM = (req, res) => {

    try {
        // hacer validaciones
        console.log("saldo:", req.body.saldo);
        if(req.body.saldo == undefined){
            console.log(req.body);
            let model = req.body;
            model["saldo"] = 0.0;
            model["ip_disp"] = [];
            model["ip_disp"].push(req.ip);
            register.create(model,(validar)=>{
                if(validar){
                    res.status(200).json({status: 200, correct: false});
                }else{
                    res.status(400).json({status: 400, correct: false});
                }
            });
        }else{
            res.status(500).json({status: 503, correct: false});
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({status: 500, correct: false});
    }

}

module.exports.registerPost = registerM;