const service = require("../../services/noRelacionalServices/usuarioService");
const register = new service();

const EncuestaService = require("../../services/noRelacionalServices/encuestaService");
const encuestaService = new EncuestaService();

const ResponderEncuesta = require("../../services/noRelacionalServices/respuestaService");
const responderService = new ResponderEncuesta();

const cliente = require("../../transactional/transactionServices/clienteService");
const clienteService = new cliente();

const lanzamientos = require("../../services/noRelacionalServices/lanzamientoService");
const lanzamientoService = new lanzamientos();

const cuenta = require("../../transactional/transactionServices/cuentaService");
const cuentaService = new cuenta();

const usuario = require("../../transactional/transactionServices/usuarioService");
const usuarioNomalService = new usuario();
registerM = (req, res) => {

    try {
        // hacer validaciones
        console.log("saldo:", req.body.saldo);
        if (req.body.saldo == undefined) {
            console.log(req.body);
            let model = req.body;
            model["saldo"] = 0.0;
            model["ip_disp"] = [];
            model["ip_disp"].push(req.ip);
            register.create(model, (validar) => {
                if (validar) {

                    
                    register.get("", { email: req.body.email }, 1, 1, {}, (validar, docs, n) => {
                        if (validar) {
                            req.session.user = docs[0]._id;
                            req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 31 * 6;
                            req.session.role = "user";
                            res.status(200).json({ status: 200, correct: true });
                            usuarioNomalService.create({id_obj: docs[0]._id},(validarU)=>{
                                if(validarU){
                                    console.log("se creo el usuario postgres");
                                    usuarioNomalService.get("",{id_obj: docs[0]._id},1,1,{},(validarN,usuarioN,couN)=>{
                                        if(validarN){
                                            clienteService.create({id_usuario: usuarioN[0].id_usuario },(validar1)=>{
                                                if(validar1){
                                                    console.log("Se creo el cliente!")
                                                    clienteService.get("",{id_usuario: usuarioN[0].id_usuario},1,1,{},(valida,docs1,n1)=>{
                                                        if(valida){

                                                            cuentaService.create({
                                                                id_cliente: docs1[0]["id_cliente"],
                                                                nombre: docs[0]["nombre"],
                                                                direccion: "no address",
                                                                id_ciudad: 1,
                                                                empresa: false
                                                            },(validar3)=>{
                                                                if(validar3){
                                                                    console.log("se creo la cuenta");
                                                                }else{
                                                                    console.log("no se creo la cuenta")
                                                                }
                                                            });
                                                        }else{
                
                                                        }
                                                    });
                                                }else{
                                                    console.log("Hubo un error al crear el cliente");
                                                }
                                            });
                                        }else{
                                            console.log("hubo un error al traer elusuario creado");
                                        }
                                    })
                                }else{
                                    console.log("no se creo el usuario postgres");
                                }
                            });
                            
                            
                        } else {
                            res.status(400).json({ status: 400, correct: false });
                        }
                    });

                } else {
                    res.status(400).json({ status: 400, correct: false });
                }
            });
        } else {
            res.status(500).json({ status: 503, correct: false });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 500, correct: false });
    }

}

module.exports.registerPost = registerM;

inSession = (req, res) => {
    try {
        res.status(200).json({ session: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ session: false });
    }
}

module.exports.session = inSession;

getEncuestas = (req, res) => {
    try {
        encuestaService.getEncuestas(req.session.user, (validar, docs, n) => {
            if (validar) {
                res.status(200).json({ correct: true, encuestas: docs, n: n });
            } else {
                res.status(400).json({ correct: false, encuestas: [], n: 0 });
            }
        })
    } catch (error) {
        res.status(500).json({ correct: false, encuestas: [], n: 0 });
    }

}

module.exports.encuestas = getEncuestas;

createEncuesta = (req, res) => {
    try {

        encuestaService.insertEncuestaOrUpdateEncuesta(req.body.modelo, req.ip,req.session.user, (validar) => {
            console.log("validar:", validar);
            if (validar) {
                res.status(200).json({ status: 200, correct: true });
            } else {
                res.status(400).json({ status: 500, correct: false });
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 500, correct: false })
    }
}

module.exports.createOrUpdate = createEncuesta;


deleteEncuesta = (req, res) => {
    try {

        encuestaService.deleteEncuesta(req.body.id, req.session.user, (validar) => {
            if (validar) {
                res.status(200).json({ status: 200, correct: true });
            } else {
                res.status(400).json({ status: 500, correct: false });
            }
        })

    } catch (error) {
        res.status(500).json({ status: 500, correct: false })
    }
}

module.exports.deleteEncuesta = deleteEncuesta;

getEncuestaToResolve = (req, res) => {
    try {
        encuestaService.getEncuestaToResolve(req.query.encuestaid, (validar, docs, n) => {
            if (validar) {
                res.status(200).json({ correct: true, encuestas: docs, n: n });
            } else {
                res.status(400).json({ correct: false, encuestas: [], n: 0 });
            }
        })
    } catch (error) {
        res.status(500).json({ correct: false, encuestas: [], n: 0 });
    }
}

module.exports.getEncuestaToResolve = getEncuestaToResolve;

CrearRespuesta = (req,res) => {
    try {
        console.log(req.body);
        responderService.ResponderEncuesta(req.body,req.session.user,Date().toString(),req.ip,(validar)=>{
            if(validar){
                res.status(200).json({ status: 200, correct: true });
            }else{
                res.status(400).json({ status: 500, correct: false });
            }
        });
    } catch (error) {
        res.status(500).json({ status: 500, correct: false })
    }
}

module.exports.crearRespuesta = CrearRespuesta;

getLanzamientos = (req, res) => {
    try {
        lanzamientoService.getLanzamientos(req.session.user, (validar, docs, n) => {
            if (validar) {
                res.status(200).json({ correct: true, lanzamientos: docs, n: n });
            } else {
                res.status(400).json({ correct: false, lanzamientos: [], n: 0 });
            }
        })
    } catch (error) {
        res.status(500).json({ correct: false, lanzamientos: [], n: 0 });
    }

}

module.exports.getlanzamientos = getLanzamientos;

deleteLanzamiento = (req, res) => {
    try {

        lanzamientoService.deleteLanzamientos(req.body.id, req.session.user, (validar) => {
            if (validar) {
                res.status(200).json({ status: 200, correct: true });
            } else {
                res.status(400).json({ status: 500, correct: false });
            }
        })

    } catch (error) {
        res.status(500).json({ status: 500, correct: false })
    }
}

module.exports.deleteLanzamiento = deleteLanzamiento;

createLanzamiento = (req, res) => {
    try {

        lanzamientoService.insertUpdateLanzamiento(req.body, req.session.user, (validar) => {
            console.log("validar:", validar);
            if (validar) {
                res.status(200).json({ status: 200, correct: true });
            } else {
                res.status(400).json({ status: 500, correct: false });
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 500, correct: false })
    }
}

module.exports.createLanzamiento = createLanzamiento;