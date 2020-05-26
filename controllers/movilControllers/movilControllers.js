const service = require("../../services/noRelacionalServices/usuarioService");
const register = new service();

registerM = (req, res) => {

    try {
        if(req.body.saldo != undefined){
            let model = req.body;
            model["saldo"] = 0.0;
            model["ip_disp"] = [];
            model["ip_disp"].push(req.ip);
            register.create(model,(validar)=>{
                if(validar){
                    res.status(200).json({status: 200, correct: false});
                }else{
                    res.status(400).json({status: 503, correct: false});
                }
            });
        }else{
            res.status(500).json({status: 503, correct: false});
        }
    } catch (error) {
        res.status(500).json({status: 500, correct: false});
    }

}

module.exports.registerPost = registerM;