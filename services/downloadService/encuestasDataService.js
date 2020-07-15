const respuesta = require("../../services/noRelacionalServices/respuestaService");
const respuestaService = new respuesta();
const encuesta = require("../../services/noRelacionalServices/encuestaService");
const encuestaService = new encuesta();
const ExcelJS = require('exceljs');

async function getData(idUsario, IdEncuesta, cb) {
    try {

        const respo = await HelpingData(idUsario, IdEncuesta);
        if (respo.correct) {
            const buffer = await respo.workbook.xlsx.writeBuffer();
            cb(true, buffer);
        } else {
            cb(false, "");
        }
    } catch (error) {
        console.log(error);
        cb(false, "");
    }

};

module.exports.getEncuestaData = getData;


const HelpingData = (idUsario, IdEncuesta) => {

    return new Promise(function (resolve, reject) {
        encuestaService.get("", { usuario: idUsario, _id: IdEncuesta }, 1, 1, {}, (validar, doc, n) => {
            if (validar && (n == 1)) {
                respuestaService.model.find({ encuesta: IdEncuesta }, function (err, docs) {
                    if (!err) {
                        const workbook = new ExcelJS.Workbook();
                        workbook.creator = 'Ask & Answer';
                        workbook.created = new Date();
                        const sheet = workbook.addWorksheet(docs[0]["encuesta"]["nombre_encuesta"]);
                        var columnas = [];
                        var multirespuesta = [];
                        docs[0]["encuesta"]["preguntas"].forEach(pre => {
                            if (pre.tipo == "Opcion Multiple.") {
                                if (pre.multi_respuesta) {
                                    //multirespuesta
                                    var cont = 0;
                                    multirespuesta.push(pre.encabezado);
                                    pre.opciones.forEach(op => {
                                        var col = { header: `${pre["encabezado"]}${op.titulo_opcion}`, key: `${pre["encabezado"]}${op.titulo_opcion}`, width: 10 }
                                        columnas.push(col);
                                        cont++;
                                    });
                                } else {
                                    if (pre.pregunta_abierta) {

                                        var col = { header: pre["encabezado"], key: pre["encabezado"], width: 10 }
                                        columnas.push(col);
                                        //opcion multiple con pregunta abierta
                                    } else {
                                        var col = { header: pre["encabezado"], key: pre["encabezado"], width: 10 }
                                        columnas.push(col);
                                        //opcion multiple
                                    }
                                }
                            } else {
                                var col = { header: pre["encabezado"], key: pre["encabezado"], width: 10 }
                                columnas.push(col);
                            }

                        });
                        columnas.push({ header: "sexo", key: "UserSexo1234", width: 10 })
                        columnas.push({ header: "pais", key: "UserPais1234", width: 10 })
                        columnas.push({ header: "ciudad", key: "UserCiudad1234", width: 10 })
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
                            ele.respuesta.forEach(resp => {
                                if (multirespuesta.includes(resp.id_pregunta)) {

                                    row[`${resp.id_pregunta}${resp.id_respuesta}`] = resp.id_respuesta;
                                    cont2++;

                                } else {
                                    if (resp.id_respuesta == "none") {
                                        row[resp.id_pregunta] = resp.respuesta_abierta;
                                    } else {
                                        row[resp.id_pregunta] = resp.id_respuesta;
                                    }
                                }
                            });

                            sheet.addRow(row).commit();
                            cont++;
                        });

                        console.log("AAaa");
                        resolve({ correct: true, workbook: workbook });
                    } else {
                        console.log("AAA");
                        resolve({ correct: false, workbook: "" });
                    }
                }).populate("usuario")
                    .populate("encuesta")
                    .exec();
            } else {
                console.log("AA");
                resolve({ correct: false, workbook: "" });
            }
        });
    });


};