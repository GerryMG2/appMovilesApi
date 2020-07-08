
const service = require("../../../services/noRelacionalServices/usuarioService");
const auth = new service();

loginAuth = (req, res) => {
    try {
        console.log(req.body);
        auth.validarContra(req.body.mail, req.body.password, req.ip, (validar) => {
            console.log(req.ip + "controller");
            console.log(validar);
            if (validar) {

                auth.get("",{email: req.body.mail},1,1,{},(validar,docs,n)=>{
                    if(validar){
                        req.session.user = docs[0]["_id"];
                        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 31 * 6;
                        // 6 meses dura la sesion;
                        req.session.role = "user";
                        var user = docs[0]
                        delete user["_id"];
                        delete user["password"];
                        delete user["ip_disp"];
                        delete user["carrito"];
                        res.status(200).json({correct: true, usuario: user});
                    }else{
                        res.status(400).json({correct: false, usuario: {}});
                    }
                });


               
            } else {
                console.log("true");
                res.status(400).json({correct: false, usuario: {}});
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({correct: false,usuario: {}});
    }

}

module.exports.postlogin = loginAuth;

logout = (req, res) =>{
    try {
        req.session.destroy();
        res.status(200).json({correct: true});
    } catch (error) {
        res.status(400).json({correct: false});
        
    }
}

module.exports.logout = logout;