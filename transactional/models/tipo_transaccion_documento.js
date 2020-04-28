let tipo_transaccion_documento = {
	
	id_documento: {type: "BIGSERIAL", primaryKey: true, name: "id_documento", modelType: "Number"},
	nombre_doc: {type: "VARCHAR(64)", name: "nombre_doc", modelType: "String"},
	descripcion_doc: {type: "VARCHAR(255)", name: "descripcion_doc", modelType: "String"}
}


module.exports = tipo_transaccion_documento;