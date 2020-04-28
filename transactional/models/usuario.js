let usuario = {

	id_usuario: {type: "BIGSERIAL", primaryKey: true, name: "id_usuario", modelType: "Number"},
	id_obj: {type: "VARCHAR(128)", name: "id_obj", modelType: "String"}
}

module.exports = usuario;