const respuesta = require("../../services/noRelacionalServices/respuestaService");
const respuestaService = new respuesta();
const encuesta = require("../../services/noRelacionalServices/encuestaService");
const encuestaService = new encuesta();
const ExcelJS = require('exceljs');

const getData = (idUsario, IdEncuesta, cb) => {
    try {
        encuestaService.get("",{usuario: idUsario,_id: IdEncuesta},1,1,{},(validar,doc,n)=>{
            if(validar && (n==1)){
                respuestaService.model.find({encuesta: IdEncuesta }, function (err, docs) {
                    if (!err) {
                        const workbook = new Excel.Workbook();
                        workbook.creator = 'Ask & Answer';
                        workbook.created = new Date();
                        const sheet = workbook.addWorksheet(docs[0]["encuesta"]["nombre_encuesta"]);
                        var columnas = [];
                        var multirespuesta=[];
                        docs[0]["encuesta"]["preguntas"].forEach(pre=>{
                            if(pre.tipo=="Opcion Multiple."){
                                if(pre.multi_respuesta){
                                    //multirespuesta
                                    var cont = 0;
                                    multirespuesta.push(pre.encabezado);
                                    pre.opciones.forEach(op=>{
                                        var col = { header: pre["encabezado"], key: pre["encabezado"] + cont.toString(), width: 10 }
                                        columnas.push(col);
                                        cont++;
                                    });
                                }else{
                                    if(pre.pregunta_abierta){
                                        
                                        var col = { header: pre["encabezado"], key: pre["encabezado"], width: 10 }
                                        columnas.push(col);
                                        //opcion multiple con pregunta abierta
                                    }else{
                                        var col = { header: pre["encabezado"], key: pre["encabezado"], width: 10 }
                                        columnas.push(col);
                                        //opcion multiple
                                    }
                                }
                            }else{
                                var col = { header: pre["encabezado"], key: pre["encabezado"], width: 10 }
                                columnas.push(col);
                            }
                           
                        });
                        columnas.push( { header: "sexo", key: "UserSexo1234", width: 10 })
                        columnas.push( { header: "pais", key: "UserPais1234", width: 10 })
                        columnas.push( { header: "ciudad", key: "UserCiudad1234", width: 10 })
                        sheet.columns = columnas;
                        cont = 1
                        docs.forEach(ele => {
                            var row = {}
                            row["id"] = cont;
                            row["UserSexo1234"] = ele.usuario["sexo"];
                            row["UserPais1234"] = ele.usuario["pais"];
                            row["UserCiudad1234"] = ele.usuario["ciudad"];
                            var cont2 = 0;
                            var auxTitulo = "";
                            ele.respuesta.forEach(resp=>{
                                if(multirespuesta.includes(resp.id_pregunta)){
                                    if(auxTitulo == resp.id_pregunta){
                                        row[resp.id_pregunta + cont.toString()] = resp.id_respuesta;
                                        cont2++;
                                    }else{
                                        auxTitulo = resp.id_pregunta;
                                        cont2 = 1;
                                        row[resp.id_pregunta + "0"] = resp.id_respuesta;
                                    }
                                }else{
                                    if(resp.id_respuesta == "none"){
                                        row[resp.id_pregunta] = resp.respuesta_abierta;
                                    }else{
                                        row[resp.id_pregunta] = resp.id_respuesta;
                                    }
                                }
                            });
                            
                            sheet.addRow(row).commit();
                            cont++;
                        });
                        workbook.commit();
                        const buffer = await workbook.xlsx.writeBuffer();
                        cb(true,buffer);
                    } else {
                        cb(false,"");
                    }
                }).populate("usuario")
                    .populate("encuesta")
                    .exec();
            }else{
                cb(false,"");
            }
        });
        
    } catch (error) {
        cb(false,"");
    }

};

module.exports.getEncuestaData = getData;