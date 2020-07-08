const service = require("../../../transactional/transactionServices/usuarioAService");
const auth = new service();

loginAdmin = (req, res) => {

    if (req.session && req.session.user && req.session.admin == "administrador") {
        res.redirect("/admin/module");
    } else {
        console.log("View -> AdministrativePage -> /login")
        res.render("administrativePages/login.pug", {alerta: "" , estilo: 'none'});
    }

}

module.exports.getlogin = loginAdmin;


loginAuth = (req, res) => {
    try {
        
        auth.validatePass(req.body.username, req.body.password, (validar) => {
            console.log(validar);
            if (validar) {
                req.session.user = req.body.username;
                req.session.cookie.maxAge = 1000 * 60 * 60 * 24;
                // 24 h dura la sesion;
                req.session.admin = "administrador";
                res.redirect("/admin/module");
            } else {
                console.log("true");
                res.render("administrativePages/login.pug", { msg: "Error en los datos.", alerta: "alert alert-danger"  });
            }
        })
    } catch (error) {
        console.log(error);
        res.render("administrativePages/login.pug", { msg: "Hubo un error inesperado, avise al administrador", alerta: "alert alert-danger"});
    }

}

module.exports.postlogin = loginAuth;

logout = (req, res) =>{
    try {
        req.session.destroy();
        res.redirect("/admin/login");
    } catch (error) {
        console.log(error);
        
    }
}

module.exports.logout = logout;