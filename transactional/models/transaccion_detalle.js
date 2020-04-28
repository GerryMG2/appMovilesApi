let transaccion_detalle = {

	id_tran_detail: {type: "BIGSERIAL", primaryKey: true, name: "id_tran_detalle", modelType: "Number"},
	id_factura: {type: "BIGINT", name: "id_factura", foreignKey: true, ref: "factura", refField: "id_factura", commentForeign: "id_factura_fk", modelType: "Number"},
	id_servicio: {type: "BIGINT", name: "id_servicio", foreignKey: true, ref: "servicio", refField: "id_servicio", commentForeign: "id_servicio_fk", modelType: "Number"},
	id_documento: {type: "BIGINT", name: "id_documento", foreignKey: true, ref: "documento", refField: "id_documento", commentForeign: "id_documento_fk", modelType: "Number"},
	costo: {type: "MONEY", name: "costo", modelType: "Number"},
	monto: {type: "MONEY", name: "monto", modelType: "Number"},
	descuento: {type: "MONEY", name: "descuento", modelType: "Number"},
	monto_con_descuento: {type: "MONEY", name: "monto_con_descuento", modelType: "Number" },
	id_descuento: {type: "BIGINT", name: "id_descuento", foreignKey: true, ref: "descuento", refField: "id_descuento", commentForeign: "id_descuento_fk", modelType: "Number"}

}

module.exports = transaccion_detalle;