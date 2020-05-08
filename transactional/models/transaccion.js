let transaccion = {

	id_factura: {type: "BIGSERIAL", primaryKey: true, name: "id_factura", modelType: "Number"},
	id_cuenta: {type: "BIGINT", name: "id_cuenta", foreignKey: true, ref: "cuenta", refField: "id_cuenta", commentForeign: "id_cuenta_fk", modelType: "Number"},
	fecha: {type: "DATE", name: "fecha", modelType: "Date"},
	anulado: {type: "BOOLEAN", name: "anulado", modelType: "Boolean"},	
	id_tipo_pago: {type: "BIGINT", name: "id_tipo_pago", foreignKey: true, ref: "tipo_pago", refField: "id_tipo_pago", commentForeign: "id_tipo_pago_fk", modelType: "Number"}


}

module.exports = transaccion;