const service = require("../../services/noRelacionalServices/usuarioService");
const register = new service();

const EncuestaService = require("../../services/noRelacionalServices/encuestaService");
const encuestaService = new EncuestaService();

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
                    req.session.user = req.body.email;
                    req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 31 * 6;
                    res.status(200).json({status: 200, correct: true});
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

inSession = (req,res) => {
    try {
        res.status(200).json({session: true});
    } catch (error) {
        console.log(error);
        res.status(500).json({session: false});
    }
}

module.exports.session = inSession;

getEncuestas = (req,res) => {
    try {
        encuestaService.getEncuestas(req.session.user,(validar,docs,n)=>{
            if(validar){
                res.status(200).json({correct: true,encuestas:docs, n: n});
            }else{
                res.status(400).json({correct: false,encuestas: [],n: 0});
            }
        })
    } catch (error) {
        res.status(500).json({correct: false,encuestas: [], n: 0});   
    }
    
}

module.exports.encuestas = getEncuestas;

createEncuesta = (req,res) => {
    try {
        encuestaService.insertEncuestaOrUpdateEncuesta(req.body.modelo,req.ip,(validar)=>{
            if(validar){
                res.status(200).json({status: 200,correct: true});
            }else{
                res.status(400).json({status: 500, correct: false});
            }
        })
        
    } catch (error) {
        res.status(500).json({status: 500, correct: false})
    }
}