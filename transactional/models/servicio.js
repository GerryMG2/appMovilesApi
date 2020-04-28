let servicio = {

    id_servicio: {type: "BIGSERIAL", primaryKey: true, name: "id_servicio", modelType: "Number"},
    nombre_servicio: {type: "VARCHAR(64)", name: "nombre_servicio", modelType: "String"}

}


module.exports = servicio;