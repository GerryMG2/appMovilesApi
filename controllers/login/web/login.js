const service = require("../../../services/noRelacionalServices/usuarioService");
const auth = new service();

loginAdmin = (req, res) => {

    if (req.session && req.session.user && req.session.role) {
        res.redirect("/web/main");
    } else {
        console.log("View -> webApp -> /login")
        res.render("webApp/loginweb.pug", {alerta: "" , estilo: 'none'});
    }

}

module.exports.getlogin = loginAdmin;


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
                        res.redirect("/web/main");
                    }else{
                        res.render("webApp/loginweb.pug",  { msg: "Error en los datos.", alerta: "alert alert-danger"  });
                    }
                });


               
            } else {
                console.log("true");
                res.render("webApp/loginweb.pug", { msg: "Error en los datos.", alerta: "alert alert-danger"  });
            }
        })
    } catch (error) {
        console.log(error);
        res.render("webApp/loginweb.pug", { msg: "Error en los datos.", alerta: "alert alert-danger"  });
    }

}

module.exports.postlogin = loginAuth;

logout = (req, res) =>{
    try {
        req.session.destroy();
        res.redirect("/web/login");
    } catch (error) {
        console.log(error);
        
    }
}

module.exports.logout = logout;