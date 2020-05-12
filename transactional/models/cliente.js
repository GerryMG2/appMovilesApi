var cliente = {

    id_cliente: {type:"BIGSERIAL", primaryKey: true, name: "id_cliente", modelType: "Number"},
    id_usuario: {type: "BIGINT", name: "id_usuario", foreignKey: true, ref: "usuario", refField: "id_usuario", commentForeign: "id_usuario_fk", modelType: "Number"}

}


module.exports = cliente