const generalService = require("../generalServices/servicio");
const modelUsuario = require("../../models/usuario");


class usuarioService  extends generalService{
    constructor() {
        super(modelUsuario,
            {ok: "Usuario creado", err: "No se pudo crear el usuario"},
            {ok: "Usuario actualizado", err: "No se pudo actualizar el usuario"},
            {ok: "Usuario eliminado", err: "No se pudo eliminar el usuario"});   
    }
    
    
    validarContra(email, password, ip, cb){
        try {
            this.get("",{email: email}, 1, 1, {}, (validar, users, total) => {
                if(validar && total == 1){
                    console.log(password + " " + users[0].password );
                    if(password == users[0].password){
                        cb(true);
                        
                        //ips de dispositivos
                        let cont = 0;
                        users[0].ip_disp.forEach(element => {
                            if (element == ip) {
                                cont++;
                                //user[0].ip_disp.push(req.ip)
                            }
                        });

                        if (cont == 0) {
                            users[0].ip_disp.push(ip);
                            let update = {ip_disp: users[0].ip_disp};
                            console.log(update);
                            this.update(users[0]["_id"], update, (validar)=>{ });  
                        }

                    } else {
                        cb(false);
                    }
                } else {
                    cb(false);
                }
            });
        } catch (error) {
            cb(false);
        }
    }
    
}

module.exports = usuarioService;