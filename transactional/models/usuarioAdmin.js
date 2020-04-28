let usuarioA = {

    id_usuario: {type: "BIGSERIAL", primaryKey: true, name: "id_usuario", modelType: "Number"},
    username: {type: "VARCHAR(128)", name: "username", modelType: "String"},
	password: {type: "VARCHAR(128)", name: "password", modelType: "String"}
}

module.exports = usuarioA;