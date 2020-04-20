var conexion = require("../db_connection/connection");



class transactionalModelSQL {
    constructor(modelo, table_name) {
        this.init();

    }

    init() {
        this.modelo = modelo;
        this.conx = new conexion();
        this.campos = Object.keys(this.modelo);
    }

    getOne(objId,cb){

    }

    getspecified(filters,size,pag,orden,cb){
        
    }

    get(filters, size, pag, orden, cb){

    }

    insert(model, cb) {

    }

    update(objId, model, cb){

    }

    upsert(objId, model, cb) {

    }

    delete(objeId, cb){

    }



    #createTable() {

    }

    #createRelations() {

    }

    #destroyTable() {

    }

}

module.exports = transactionalModelSQL;

// let ejemplo = {
//     id_tran_detail: { type: "BIGSERIAL", primaryKey: true, name: "id_tran_detail" },
//     id_factura: { type: "BIGINT", name: "id_factura", foreingKey: true, ref: "transaccion", refField: "id_factura" },
//     id_servicio: { type: "BIGINT", name: "id_servicio", foreingKey: true, ref: "servicios", refField: "Id_Servicios" },
//     id_documento: { type: "BIGINT", name: "id_documento", foreingKey: true, ref: "tipo_transaccion_documento", refField: "id_documento" },
//     costo: { type: "MONEY", name: "costo" },
//     monto: { type: "MONEY", name: "monto" },
//     descuento: { type: "MONEY", name: "descuento" },
//     monto_con_desc: { type: "MONEY", name: "monto_con_desc" },
//     id_descuento: { type: "BIGINT", name: "id_descuento", foreingKey: true, ref: "descuento", refField: "id_descuento" }
// }