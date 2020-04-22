var conexion = require("../db_connection/connection");



class transactionalModelSQL {
    constructor(modelo, table_name) {
        this.modelo = modelo;
        this.table_name = table_name;
        this.init();

    }

    init() {
        this.conx = new conexion();
        this.campos = Object.keys(this.modelo);
    }

    getOne(objId, cb) {
        try {
            let conditions = "";


            this.campos.forEach(element => {
                if (this.modelo[element]["primaryKey"] && objId[this.modelo[element]["name"]]) {
                    conditions = conditions.concat(`${this.modelo[element]["name"]}=${objId[this.modelo[element]["name"]]} AND`);
                }else{
                    throw `No existe una condicion valida para toda la llave de la tabla ${this.table_name} porque no existe la primary key ${this.modelo[element]["name"]} en la consulta.`
                }
            });
            conditions = conditions.slice(0,-3);

            let query = `SELECT * FROM ${this.table_name} WHERE ${conditions};`;

            this.conx.query(query, (validar, datos) => {
                if (validar) {
                    cb(true, datos);
                } else {
                    cb(false, {});
                }
            });
        } catch (error) {
            console.log("error: ", error)
            cb(false, {});
        }

    }

    get(filters, filtros, size, pag, orden, cb) {
        
    }

    insert(model, cb) {

    }

    update(objId, model, cb) {

    }

    upsert(objId, model, cb) {

    }

    delete(objeId, cb) {

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
            console.log("error: ", error);
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
            console.log("error: ", error);
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
            console.log("error: ", error);
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
            console.log("error: ", error);
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
            console.log("error: ", error);
        }

    }



    #qrCreateTable() {
        let strCreationBegin = `CREATE TABLE ${this.table_name} (`;
        let endStrCreate = `);`;
        let fields = "";

        this.campos.forEach(element => {
            let campo = `${this.modelo[element]["name"]} ${this.modelo[element]["type"]} ${this.modelo[element]["special"] ? this.modelo[element]["special"] : ""},`;
            fields = fields.concat(campo);
        });
        fields = fields.slice(0, -1);

        let queryResult = strCreationBegin.concat(fields).concat(endStrCreate);
        return queryResult;

    }

    #qrCreateRelationsPrimaryKey() {
        let queryResult = "";

        this.campos.forEach(element => {
            if (this.modelo[element]["primaryKey"]) {
                let consulta = "";
                if (this.modelo[element]["primaryKey"]) {
                    consulta = consulta.concat(`ALTER TABLE ${this.table_name} ADD PRIMARY KEY (${this.modelo[element]["name"]});`)
                }

                queryResult = queryResult.concat(consulta);
            }
        });



        return queryResult;
    }

    #qrCreateRelationsForeignKey() {
        let queryResult = "";

        this.campos.forEach(element => {
            if (this.modelo[element]["foreignKey"]) {
                let consulta = "";
                if (this.modelo[element]["foreignKey"]) {
                    consulta = consulta.concat(`ALTER TABLE ${this.table_name} ADD CONSTRAINT ${this.modelo[element]["commentForeign"]} FOREIGN KEY (${this.modelo[element]["name"]}) REFERENCES ${this.modelo[element]["ref"]} (${this.modelo[element]["refField"]}) ;`)
                }
                queryResult = queryResult.concat(consulta);
            }
        });



        return queryResult;
    }

    #qrDestroyRelations() {
        let queryResult = "";
        this.campos.forEach(element => {
            if (this.modelo[element]["foreignKey"]) {
                queryResult = queryResult.concat(`ALTER TABLE ${this.table_name} DROP IF EXISTS CONSTRAINT ${this.modelo[element]["commentForeign"]};`)
            }
        });

        return queryResult;
    }

    #qrDestroyTable() {
        return `DROP TABLE IF EXISTS ${this.table_name} CASCADE;`;
    }

}

module.exports = transactionalModelSQL;

// let ejemplo = {
//     id_tran_detail: { type: "BIGSERIAL", primaryKey: true, name: "id_tran_detail" },
//     id_factura: { type: "BIGINT", name: "id_factura", foreignKey: true, ref: "transaccion", refField: "id_factura", commentForeign: "id_factura_fk"  },
//     id_servicio: { type: "BIGINT", name: "id_servicio", foreignKey: true, ref: "servicios", refField: "Id_Servicios", commentForeign: "id_servicio_fk" },
//     id_documento: { type: "BIGINT", name: "id_documento", foreignKey: true, ref: "tipo_transaccion_documento", refField: "id_documento" , commentForeign: "id_tipoTransaccion_fk"},
//     costo: { type: "MONEY", name: "costo", special: "NOT NULL" },
//     monto: { type: "MONEY", name: "monto", special: "NOT NULL" },
//     descuento: { type: "MONEY", name: "descuento" , special: "NOT NULL"},
//     monto_con_desc: { type: "MONEY", name: "monto_con_desc" , special: "NOT NULL"},
//     id_descuento: { type: "BIGINT", name: "id_descuento", foreignKey: true, ref: "descuento", refField: "id_descuento", commentForeign: "id_descuento_fk" }
// }