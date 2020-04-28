let encuesta = {

	id_encuesta: {type: "BIGSERIAL", primarykey: true, name: "id_encuesta", modelType: "Number"},
	id_obj: {type: "VARCHAR(128)", name: "id_obj", modelType: "String"},
	nombre: {type: "VARCHAR(100)", name: "nombre", modelType: "String"}
}

module.exports = encuesta;