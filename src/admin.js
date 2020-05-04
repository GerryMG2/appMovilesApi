

class field extends React.component {
    constructor(props) {
        super(props);
        this.state.value = props.datos;
        this.state.tipo = props.type;
        this.state.restricted = props.restricted;
        this.state.security = props.security;

    }


    render() {
        let variableText = "";
        switch (this.state.tipo) {
            case "Lista":
                variableText = `${this.state.value.length} Elementos`;
                break;
            case "campo":
                if (this.state.restricted == "password") {
                    for (const iterator of this.state.value) {
                        variableText += "*";
                    }
                } else if (this.state.restricted == "card") {
                    for (const iterator of this.state.value) {
                        variableText += "#";
                    }
                    variableText = variableText.slice(0, -4).concat(this.state.value.slice(-4));

                } else {
                    variableText = this.state.value;
                }

                break;

            default:
                break;
        }

        return (
            <div class="ObjectFieldShow">{variableText}</div>
        )

    }

}
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

let ejemplo = {
    usuario: { type: String, ref: "usuario" },
    nombre_encuesta: { type: String, require: true },
    descrip_encuesta: { type: String, required: true },
    ip_disp: { type: Number, required: true },
    tags_publico: [{ type: String }],
    lanzamiento_pago: [{ type: String, ref: "lanzamiento" }],

    preguntas: [{
        encabezado: { type: String, require: true },
        tipo: { type: String, required: true },
        pregunta_abierta: { type: Boolean, required: true },
        multi_respuesta: { type: Boolean, required: true },
        requiere: [{ type: String }],
        opciones: [{ titulo_opcion: { type: String } }]
    }]
}

class objetoComplete extends React.component {
    
    renderStructure(element, dato){
        if(this.state.typeDb == "Mongo"){
            if(Array.isArray(element) || element.type){
                let tipo = Array.isArray(element) ? "Lista" : "Campo";
                return (
                    <field 
                    value={dato}
                    tipo={tipo}
                    restricted={element.restricted ? element.restricted : ""}
                    security={element.security ? element.security : ""}
                    />
                )
            }else{
                let keys = Object.keys(element);
                keys.forEach(ele =>{
                    this.renderStructure(element[ele],dato[ele]);
                });
            }
        }else{
            return (
                <field 
                value={dato}
                tipo={"Campo"}
                restricted={element.restricted ? element.restricted : ""}
                security={element.security ? element.security : ""}
                />
            )
        }
        
    }

    constructor(props) {
        super(props);
        this.state.typeDb = props.dbType;
        this.state.value = props.datos;
        this.state.structure = props.structure;

    }

    render(){
        let keysStructure = Object.keys(this.state.structure);

        keysStructure.forEach(key =>{
            return(
                this.renderStructure(this.state.structure[key], this.state.value[key])
                )
            
        });
    }
}