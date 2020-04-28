let ciudad = {

	id_ciudad: {type: "BIGSERIAL", primaryKey: true, name: "id_ciudad", modelType: "Number"},
	id_pais: {trype: "BIGINT", name: "id_pais", foreignKey: true, ref: "pais", refField: "id_pais", commentForeign: "id_pais_fk", modelType: "Number"},
	nombre: {type: "VARCHAR(100)", name: "nombre", modelType: "String"}


}

module.exports = ciudad;