let pais = {

	id_pais: {type: "BIGSERIAL", primaryKey: true, name: "id_pais", modelType: "Number"},
	nombre: {type: "VARCHAR(64)", name: "nombre", modelType: "String"}
}


module.exports = pais;