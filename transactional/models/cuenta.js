let cuenta = {

    id_cuenta: {type: "BIGSERIAL", primaryKey: true, name: "id_cuenta", modelType: "Number"},
    id_cliente: {type: "BIGINT", name: "id_cliente", foreignKey: true, ref: "cliente", refField: "id_cliente", commentForeign: "id_cliente_fk", modelType: "String"},
    nombre: {type: "VARCHAR(64)", name: "nombre", modelType: "String" },
    direccion: {type: "VARCHAR(255)", name: "direccion", modelType: "String" },
    id_ciudad: {type: "BIGINT", name: "id_ciudad", foreignKey: true, ref: "ciudad", refField: "id_ciudad", commentForeign: "id_ciudad_fk", modelType: "Number"},
    empresa: {type: "BOOLEAN", name: "empresa", modelType: "Boolean" }

}

module.exports = cuenta;