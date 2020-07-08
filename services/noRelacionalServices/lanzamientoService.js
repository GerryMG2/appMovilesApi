const generalService = require("../generalServices/servicio");
const modelLanzamiento = require("../../models/lanzamiento");


class lanzamientoService  extends generalService{
    constructor() {
        super(modelLanzamiento,
            {ok: "Lanzamiento creado", err: "No se pudo crear el lanzamiento"},
            {ok: "Lanzamiento actualizado", err: "No se pudo actualizar el lanzamiento"},
            {ok: "Lanzamiento eliminado", err: "No se pudo eliminar el lanzamiento"});
    }

    insertUpdateLanzamiento(model, id, cb){
        try {
            
            if(model["_id"] == ""){
                if(Number.isInteger(model["cantidad_usuario"]) && (model["cantidad_usuario"] >= 250) && (model["tags_publico"].length >= 0 ) ){
                    model["usuario"] = id;
                    model["pagada"] = false;
                    let multiplier = Math.ceil(model["tags_publico"].length / 3)
                    model["costo"] = model["cantidad_usuario"] * 0.02 * multiplier;
                    model["cantidad_respuesta"] = 0;
                    model["encuesta_terminada"] = false;
                    delete model["_id"];
                    this.create(model,(validar)=>{
                        if(validar){
                            cb(true);
                        }else{
                            cb(false);
                        }
                    });
                }else{
                    console.log("el numero es menor a 250 o no es entero");
                    cb(false);
                }
               
                
            }
        } catch (error) {
            console.log(error);
            cb(false);
        }
    }

    paylanzamiento(id,cb){
        try {
            this.update(id,{pagada: true},(validar,msg)=>{
                if(validar){
                    cb(true);
                }else{
                    cb(false);
                }
            })
        } catch (error) {
            cb(false);
        }
    }


    deleteLanzamientos(id,userid,cb){
        try {

            this.get("",{usuario: userid,_id: id},1,1,{},(validar,docs,n)=>{
                if(validar){
                    
                    let validated = false;
                    docs.forEach(element => {
                        if(element["_id"]==id){
                            validated = true;
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

    getLanzamientos(id, cb){
        try {
            this.get("",{usuario: id},0,1,{},(validar, docs, n)=>{
                if(validar){
                    cb(true, docs, n)
                }else{
                    cb(false, [], 0)
                }
            })
        } catch (error) {
            console.log(error);
            cb(false, [], 0)
        }
    }
}

module.exports = lanzamientoService;