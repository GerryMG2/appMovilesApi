
let tipo_pago = {

	id_pago: {type: "BIGSERIAL", primaryKey: true, name: "id_pago", modelType: "Number"},
	descripcion_pago: {type: "VARCHAR(128)", name: "descripcion_pago", modelType: "String"}

}

module.exports = tipo_pago;