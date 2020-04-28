let descuento = {

	id_descuento: {type: "BIGSERIAL", primaryKey: true, name: "id_descuento", modelType: "Number"},
	descripcion_descuento: {type: "VARCHAR(255)", name: "descripcion_descuento", modelType: "String"}
}

module.exports = descuento;