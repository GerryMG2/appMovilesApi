

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
    
    renderStructure(element){

    }

    constructor(props) {
        super(props);
        this.state.typeDb = props.dbType;
        this.state.value = props.datos;
        this.state.structure = props.structure;

    }
}