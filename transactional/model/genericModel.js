var conexion = require("../db_connection/connection");



class transactionalModelSQL {
    constructor(modelo, table_name, msg_create = { ok: "Created", err: "Not created" },
        msg_update = { ok: "Updated", err: "Not updated" },
        msg_delete = { ok: "Deleted", err: "Not deleted" }) {
        this.modelo = modelo;
        this.msg_create = msg_create;
        this.msg_update = msg_update;
        this.msg_delete = msg_delete;
        this.table_name = table_name;
        this.init();

    }



    init() {
        this.conx = new conexion();
        this.campos = Object.keys(this.modelo);
    }

    getOneById(objId, cb) {
        try {
            let conditions = "";


            this.campos.forEach(element => {
                if (this.modelo[element]["primaryKey"] && objId[this.modelo[element]["name"]] != null) {
                    conditions = conditions.concat(`${this.modelo[element]["name"]}=${objId[this.modelo[element]["name"]]} AND`);
                } else {
                    throw `No existe una condicion valida para toda la llave de la tabla ${this.table_name} porque no existe la primary key ${this.modelo[element]["name"]} en la consulta.`
                }
            });
            conditions = conditions.slice(0, -3);

            let query = `SELECT * FROM ${this.table_name} WHERE ${conditions};`;

            this.conx.query(query, (validar, datos) => {
                if (validar) {
                    cb(true, datos);
                } else {
                    cb(false, {});
                }
            });
        } catch (error) {
            console.error("error: ", error)
            cb(false, {});
        }

    }

    get(filters = "", filtros = {}, size = 10, pag = 1, orden = {}, cb) {
        try {
            console.log("Fileter:", filters);
            console.log("filtros:", filtros == {});
            console.log("orden:", orden == {});
            console.log("page:", pag);
            console.log("size:", size);
            let offset = (size == "ALL"? 0 : size) * (pag - 1);
            let conditionsFiltros = "";
            let conditionsFilters = "";
            let keysFiltros = Object.keys(filtros);
            let keysOrden = Object.keys(orden);
            let pagination = `LIMIT ${size} OFFSET ${offset}`;
            let order = "";
            let where = "";
            let sendNothing = false;
            if (Object.entries(filtros).length > 0 || filters.trim() != "") {
                where = "WHERE ";
            }

            if (Object.entries(filtros).length > 0) {
                let fil = "";
                keysFiltros.forEach(element => {
                    if (this.modelo[element]["modelType"] != "Number") {
                        fil = fil.concat(`${this.modelo[element]["name"]} = '${filtros[element]}' AND`)
                    } else {
                        if (typeof (filtros[element]) != "number") {
                            sendNothing = true;
                        }
                        fil = fil.concat(`${this.modelo[element]["name"]} = ${filtros[element]} AND`)
                    }
                });
                conditionsFiltros = fil.slice(0, -3);
            }

            if (filters.trim() != "") {
                let search = ""
                if (Object.entries(filtros).length > 0) {
                    search = search.concat("AND (");
                }
                this.campos.forEach(element => {
                    if (this.modelo[element]["modelType"] != "Number" && this.modelo[element]["modelType"] != "Boolean") {
                        search = search.concat(`UPPER(${this.modelo[element]["name"]}) like '%${filters.trim().toUpperCase()}%' OR `);
                    }

                });
                search = search.slice(0, -3);
                if (Object.entries(filtros).length > 0) {
                    search = search.concat(") ");
                }
                conditionsFilters = search;
            }

            if (Object.entries(orden).length > 0) {
                let ord = "ORDER BY ";
                keysOrden.forEach(element => {
                    switch (orden[element]) {
                        case 1:
                            ord = ord.concat(`${this.modelo[element]["name"]} ASC,`);
                            break;
                        case -1:
                            ord = ord.concat(`${this.modelo[element]["name"]} DESC,`);
                            break;

                        default:
                            break;
                    }
                });
                order = ord.slice(0, -1);
            }
            let queryCount = `SELECT COUNT(*) as cuenta FROM ${this.table_name} ${where} ${conditionsFiltros} ${conditionsFilters};`;
            console.log("qr count:", queryCount);

            let query = `SELECT * FROM ${this.table_name} ${where} ${conditionsFiltros} ${conditionsFilters} ${order} ${pagination};`;
            console.log("qr select: ", query);
            if (sendNothing) {
                cb(true, [], 0);
            } else {
                this.conx.query(query, (validar, datos) => {
                    if (validar) {
                        this.conx.query(queryCount, (validar, datosC) => {
                            if (validar) {

                                cb(true, datos, parseInt(datosC[0].cuenta));
                            } else {
                                cb(false, {}, 0);
                            }
                        })

                    } else {
                        cb(false, {}, 0);
                    }
                });
            }

        } catch (error) {
            cb(false, {}, 0)
        }

    }

    create(model, cb) {
        try {
            console.log("entra a creacion");
            let fields = "";
            let valores = "";

            let keyFields = Object.keys(model);
            keyFields.forEach(element => {
                fields = fields.concat(`${this.modelo[element]["name"]},`);
                if (this.modelo[element]["modelType"] == "Number" ||
                    this.modelo[element]["modelType"] == "Boolean") {
                    valores = valores.concat(`${model[element]},`);
                } else {
                    valores = valores.concat(`'${model[element]}',`);
                }

            });
            fields = fields.slice(0, -1);
            valores = valores.slice(0, -1);
            let resultQuerry = `INSERT INTO ${this.table_name}(${fields}) values(${valores});`;

            console.log(resultQuerry);
            this.conx.query(resultQuerry, (validar, datos) => {
                if (validar) {
                    cb(true);
                } else {
                    cb(false);
                }
            });

        } catch (error) {
            console.log(error);
            cb(false);
        }
    }

    createWithId(model, cb) {
        try {
            console.log("entra a creacion");
            let fields = "";
            let valores = "";

            let keyFields = Object.keys(model);
            keyFields.forEach(element => {
                fields = fields.concat(`${this.modelo[element]["name"]},`);
                if (this.modelo[element]["modelType"] == "Number" ||
                    this.modelo[element]["modelType"] == "Boolean") {
                    valores = valores.concat(`${model[element]},`);
                } else {
                    valores = valores.concat(`'${model[element]}',`);
                }

            });
            var camposReturn = "";
            console.log(this.campos);
            this.campos.forEach(element=>{
                if(this.modelo[element]["primaryKey"]){
                    console.log("es primary key");
                    camposReturn = camposReturn.concat(`${this.modelo[element]["name"]},`);
                }
            });
            console.log("returning:", camposReturn);
            fields = fields.slice(0, -1);
            valores = valores.slice(0, -1);
            camposReturn = camposReturn.slice(0,-1);
            let resultQuerry = `INSERT INTO ${this.table_name}(${fields}) values(${valores}) RETURNING ${camposReturn};`;

            console.log(resultQuerry);
            this.conx.querryId(resultQuerry, (validar, datos) => {
                if (validar) {
                    console.log("Datos: ", datos);
                    cb(true,datos);
                } else {
                    cb(false,{});
                }
            });

        } catch (error) {
            console.log(error);
            cb(false,{});
        }
    }

    update(objId, model, cb) {
        try {
            let conditions = "";
            let changes = "";
            let modelKeys = Object.keys(model);

            this.campos.forEach(element => {
                console.log(`${objId[this.modelo[element]["name"]]} ${this.modelo[element]["primaryKey"]}`);
                if (this.modelo[element]["primaryKey"] && objId[this.modelo[element]["name"]] != null) {
                    if (this.modelo[element]["modelType"] == "Number" ||
                        this.modelo[element]["modelType"] == "Boolean") {
                        conditions = conditions.concat(`${this.modelo[element]["name"]}=${objId[element]} AND`);
                    } else {
                        conditions = conditions.concat(`${this.modelo[element]["name"]}='${objId[element]}' AND`);
                    }
                } else {
                    if (this.modelo[element]["primaryKey"]) {
                        throw "Hace falta valores de la llave para poder hacer la actualizacion.";
                    }

                }
            });
            conditions = conditions.slice(0, -3);

            modelKeys.forEach(element => {
                if (this.modelo[element]["modelType"] == "Number" ||
                    this.modelo[element]["modelType"] == "Boolean") {
                    changes = changes.concat(`${this.modelo[element]["name"]}=${model[element]},`);
                } else {
                    changes = changes.concat(`${this.modelo[element]["name"]}='${model[element]}',`);
                }
            });
            changes = changes.slice(0, -1);
            let resultQuerry = `UPDATE ${this.table_name} SET ${changes} WHERE ${conditions};`;
            console.log(resultQuerry);
            this.conx.query(resultQuerry, (validar, datos) => {
                if (validar) {
                    cb(true, this.msg_update.ok);
                } else {
                    cb(false, this.msg_update.err);
                }
            });
        } catch (error) {
            console.log(error);
            cb(false, this.msg_delete.err);
        }
    }

    updateOrCreate(objId, model, cb) {
        try {
            this.create(model, (validar) => {
                if (validar) {
                    cb(true);
                } else {
                    this.update(objId, model, (validar, msg) => {
                        if (validar) {
                            cb(true);
                        } else {
                            cb(false);
                        }
                    })
                }
            })
        } catch (error) {
            cb(false);
        }
    }

    delete(objeId, cb) {
        try {
            console.log(objeId);
            let conditions = "";
            this.campos.forEach(element => {
                if (this.modelo[element]["primaryKey"] && objeId[this.modelo[element]["name"]] != null) {
                    if (this.modelo[element]["modelType"] == "Number" ||
                        this.modelo[element]["modelType"] == "Boolean") {
                        conditions = conditions.concat(`${this.modelo[element]["name"]}=${objeId[element]} AND`);
                    } else {
                        conditions = conditions.concat(`${this.modelo[element]["name"]}='${objeId[element]}' AND`);
                    }
                } else {
                    if (this.modelo[element]["primaryKey"]) {
                        console.log(objeId[this.modelo[element]["name"]]);
                        throw "Hace falta valores de la llave para poder hacer la eliminacion.";
                    }

                }
            });
            conditions = conditions.slice(0, -3);


            let queryResult = `DELETE FROM ${this.table_name} WHERE ${conditions};`;
            console.log(queryResult);
            this.conx.query(queryResult, (validar, datos) => {
                if (validar) {
                    cb(true, this.msg_delete.ok);
                } else {
                    console.log("asd",this.msg_delete);
                    cb(false, this.msg_delete.err);
                }
            });
        } catch (error) {
            console.log(error);
            cb(false, this.msg_delete.err);
        }
    }

    createTable() {
        try {
            this.conx.query(this.#qrCreateTable(), (validar, datos) => {
                if (validar) {
                    console.log(`Tabla ${this.table_name} Creada correctamente.`);
                    console.log(datos);
                } else {
                    console.log(`Error al crear la tabla ${this.table_name} `);
                }
            });
        } catch (error) {
            console.error("error: ", error);
        }

    }

    createRelationsPK() {
        try {
            this.conx.query(this.#qrCreateRelationsPrimaryKey(), (validar, datos) => {
                if (validar) {
                    console.log(`Relaciones PK de la tabla ${this.table_name} Creada correctamente.`);
                    console.log(datos);
                } else {
                    console.log(`Error al crear las relaciones PK de la tabla ${this.table_name}`);
                }
            });
        } catch (error) {
            console.error("error: ", error);
        }

    }

    createRelationsFK() {
        try {
            this.conx.query(this.#qrCreateRelationsForeignKey(), (validar, datos) => {
                if (validar) {
                    console.log(`Relaciones FK de la tabla ${this.table_name} Creada correctamente.`);
                    console.log(datos);
                } else {
                    console.log(`Error al crear las relaciones FK de la tabla ${this.table_name}`);
                }
            });
        } catch (error) {
            console.error("error: ", error);
        }

    }

    EliminarRelaciones() {
        try {
            this.conx.query(this.#qrDestroyRelations(), (validar, datos) => {
                if (validar) {
                    console.log(`Se han eliminado las relaciones de la tabla ${this.table_name} correctamente`);
                    console.log(datos);
                } else {
                    console.log(`Error al eliminar las relaciones de la tabla ${this.table_name}`);
                }
            });
        } catch (error) {
            console.error("error: ", error);
        }

    }

    EliminarTabla() {
        try {
            this.conx.query(this.#qrDestroyTable(), (validar, datos) => {
                if (validar) {
                    console.log(`Se ha eliminado la tabla ${this.table_name} correctamente`);
                    console.log(datos);

                } else {
                    console.log(`Error al eliminar la tabla ${this.table_name}`);
                }
            });
        } catch (error) {
            console.error("error: ", error);
        }

    }



    #qrCreateTable = () => {
        let strCreationBegin = `CREATE TABLE ${this.table_name} (`;
        let endStrCreate = `);`;
        let fields = "";

        this.campos.forEach(element => {
            let campo = `${this.modelo[element]["name"]} ${this.modelo[element]["type"]} ${this.modelo[element]["special"] ? this.modelo[element]["special"] : ""},`;
            fields = fields.concat(campo);
        });
        fields = fields.slice(0, -1);

        let queryResult = strCreationBegin.concat(fields).concat(endStrCreate);
        console.log(queryResult);
        return queryResult;

    }

    #qrCreateRelationsPrimaryKey = () => {
        let queryResult = "";
        let field = "";
        this.campos.forEach(element => {
            if (this.modelo[element]["primaryKey"]) {

                field = field.concat(`${this.modelo[element]["name"]},`);

            }
        });
        field = field.slice(0, -1);

        let cns = `ALTER TABLE ${this.table_name} ADD PRIMARY KEY (${field});`;
        if (field == "") {
            queryResult = "SELECT 'NOT PRIMARY KEYS'";
        } else {
            queryResult = cns;
        }
        console.log(queryResult);
        return queryResult;
    }

    #qrCreateRelationsForeignKey = () => {
        let queryResult = "";

        this.campos.forEach(element => {
            if (this.modelo[element]["foreignKey"]) {
                let consulta = "";
                if (this.modelo[element]["foreignKey"]) {
                    consulta = consulta.concat(`ALTER TABLE IF EXISTS ${this.table_name} ADD CONSTRAINT ${this.modelo[element]["commentForeign"]} FOREIGN KEY (${this.modelo[element]["name"]}) REFERENCES ${this.modelo[element]["ref"]} (${this.modelo[element]["refField"]}) ;`)
                }
                queryResult = queryResult.concat(consulta);
            }
        });



        if (queryResult == "") {
            queryResult = "SELECT 'Not Relations';"
        }
        console.log(queryResult);
        return queryResult;
    }

    #qrDestroyRelations = () => {
        let queryResult = "";
        this.campos.forEach(element => {
            if (this.modelo[element]["foreignKey"]) {
                queryResult = queryResult.concat(`ALTER TABLE IF EXISTS ${this.table_name} DROP CONSTRAINT IF EXISTS ${this.modelo[element]["commentForeign"]};`)
            }
        });

        if (queryResult == "") {

            queryResult = "SELECT 'Not Relations';"
        }
        console.log("qr:", queryResult);
        return queryResult;
    }

    #qrDestroyTable = () => {
        console.log(`DROP TABLE IF EXISTS ${this.table_name} CASCADE;`);
        return `DROP TABLE IF EXISTS ${this.table_name} CASCADE;`;
    }

}

module.exports = transactionalModelSQL;

// let ejemplo = {
//     id_tran_detail: { type: "BIGSERIAL", primaryKey: true, name: "id_tran_detail", modelType: "Number" },
//     id_factura: { type: "BIGINT", name: "id_factura", foreignKey: true, ref: "transaccion", refField: "id_factura", commentForeign: "id_factura_fk",modelType: "Number"  },
//     id_servicio: { type: "BIGINT", name: "id_servicio", foreignKey: true, ref: "servicios", refField: "Id_Servicios", commentForeign: "id_servicio_fk" ,modelType: "Number"},
//     id_documento: { type: "BIGINT", name: "id_documento", foreignKey: true, ref: "tipo_transaccion_documento", refField: "id_documento" , commentForeign: "id_tipoTransaccion_fk", modelType: "Number"},
//     costo: { type: "MONEY", name: "costo", special: "NOT NULL" , modelType: "Number"},
//     monto: { type: "MONEY", name: "monto", special: "NOT NULL" , modelType: "Number"},
//     descuento: { type: "MONEY", name: "descuento" , special: "NOT NULL", modelType: "Number"},
//     monto_con_desc: { type: "MONEY", name: "monto_con_desc" , special: "NOT NULL", modelType: "Number"},
//     id_descuento: { type: "BIGINT", name: "id_descuento", foreignKey: true, ref: "descuento", refField: "id_descuento", commentForeign: "id_descuento_fk", modelType: "Number" }
// }