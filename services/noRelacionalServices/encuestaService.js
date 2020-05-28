const generalService = require("../generalServices/servicio");
const modelEncuesta = require("../../models/encuesta");


class encuestaService extends generalService {
    constructor() {
        super(modelEncuesta,
            { ok: "Encuesta creada", err: "No se pudo crear la encuesta" },
            { ok: "Encuesta actualizada", err: "No se pudo actualizar la encuesta" },
            { ok: "Encuesta eliminada", err: "No se pudo eliminar la encuesta" });
    }

    deleteEncuesta(id,userid,cb){
        try {
            this.get("",{usuario: userid},0,1,{},(validar,docs,n)=>{
                if(validar){
                    let validate = false;
                    docs.forEach(element => {
                        if(element["_id"]==id){
                            validate = true;
                        }
                    });
                    if(validated){
                        this.delete(id,(validar)=>{
                            if(validar){
                                cb(true);
                            }else{
                                cb(false);
                            }
                        })
                    }else{
                        cb(false);
                    }
                }else{
                    cb(false); 
                }
            });
           
        } catch (error) {
            console.log(error);
            cb(false);
        }
    }

    getEncuestas(id, cb) {

        try {
            this.get("", { usuario: id }, 0, 1, {}, (validar, encuestas, n) => {
                if (validar) {
                    cb(true, encuestas, n)
                } else {
                    cb(false, [], 0);
                }
            })
        } catch (error) {
            console.log(error);
            cb(false, [], 0)
        }

    }

    insertEncuestaOrUpdateEncuesta(model,ip,id, cb){
        try {
            if(model.usuario == ""){
                if(model.preguntas.length > 0){
                model["usuario"] = id
                model["ip_disp"] = ip
                this.create(model,(validar)=>{
                    if(validar){
                        cb(true)
                    }else{
                        cb(false)
                    }
                })
                }else{
                    cb(false)
                }
                // crear
            }else{
                if(model.preguntas.length > 0){
                    if(model["_id"] == id){
                        
                    let key = model["_id"]
                    let newmodel = model;
                    delete newmodel["_id"]
                    this.update(key, newmodel,(validar,msg)=>{
                        if(validar){
                            cb(true);
                        }else{
                            cb(false);
                        }
                    });
                    }else{
                        cb(false);
                    }
                }else{
                    cb(false);
                }
                
                //actualizar
            }
        } catch (error) {
            console.log(error);
            cb(false);
        }
    }

}

module.exports = encuestaService;