const generalService = require("../generalServices/servicio");
const modelRespuesta = require("../../models/respuesta");


class respuestaService  extends generalService{
    constructor() {
        super(modelRespuesta,
            {ok: "Respuesta creada", err: "No se pudo crear la respuesta"},
            {ok: "Respuesta actualizada", err: "No se pudo actualizar la respuesta"},
            {ok: "Respuesta eliminada", err: "No se pudo eliminar la respuesta"});
    }

    ResponderEncuesta(modelo,idUsuario,fecha,ip,cb){
        try {
            modelo["usuario"] = idUsuario;
            modelo["fecha"] = fecha;
            modelo["ip_disp"] = ip;
            this.create(modelo,(validar)=>{
                if(validar){
                    cb(true);
                }else{
                    cb(false);
                }
            });
        } catch (error) {
            cb(false);
        }
       
    }

    // getDataEncuesta(idUser,idEncuesta,cb){
    //     try {
    //         this.get("",{usuario: idUser,idEncuesta: idEncuesta},0,1,{},(validar,docs,n)=>{
    //             if(validar){
    //                 docs.array.forEach(element => {
                        
    //                 });
    //             }else{
    //                 cb(false);
    //             }
    //         });
    //     } catch (error) {
    //         cb(false);
    //     }
    // }
}

module.exports = respuestaService;