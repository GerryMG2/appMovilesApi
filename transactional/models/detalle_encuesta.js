let detalle_encuesta = {

	id_tran_detail: {type: "BIGINT",primaryKey: true, name: "id_tran_detail", foreignKey: true, ref: "transaccion_detalle", refField: "id_tran_detail", commentForeign: "id_tran_detail_fk", modelType: "Number" },
	id_encuesta: {type: "BIGINT",primaryKey: true, name: "id_encuesta", foreignKey: true, ref: "encuesta", refField: "id_encuesta", commentForeign: "id_encuesta_fk", modelType: "Number"}

}

module.exports = detalle_encuesta;