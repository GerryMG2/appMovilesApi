

class field extends React.Component {
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
            <div class="ObjectFieldShow" onDoubleClick={this.props.ondclick}>{variableText}</div>
        )

    }

}

let transaccion_detalle = {

    id_tran_detail: { type: "BIGSERIAL", primaryKey: true, name: "id_tran_detalle", modelType: "Number" },
    id_factura: { type: "BIGINT", name: "id_factura", foreignKey: true, ref: "factura", refField: "id_factura", commentForeign: "id_factura_fk", modelType: "Number" },
    id_servicio: { type: "BIGINT", name: "id_servicio", foreignKey: true, ref: "servicio", refField: "id_servicio", commentForeign: "id_servicio_fk", modelType: "Number" },
    id_documento: { type: "BIGINT", name: "id_documento", foreignKey: true, ref: "documento", refField: "id_documento", commentForeign: "id_documento_fk", modelType: "Number" },
    costo: { type: "MONEY", name: "costo", modelType: "Number" },
    monto: { type: "MONEY", name: "monto", modelType: "Number" },
    descuento: { type: "MONEY", name: "descuento", modelType: "Number" },
    monto_con_descuento: { type: "MONEY", name: "monto_con_descuento", modelType: "Number" },
    id_descuento: { type: "BIGINT", name: "id_descuento", foreignKey: true, ref: "descuento", refField: "id_descuento", commentForeign: "id_descuento_fk", modelType: "Number" }

}
// keys = ["usuario", "nombre_encuesta",....]
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


class objetoComplete extends React.Component {

    handlerManual(dato, tipo){
        if(tipo=="Campo"){
            this.props.handlefilter(dato);
        }
    }

    renderStructure(element, dato) {
        if (this.state.typeDb == "Mongo") {
            if (Array.isArray(element) || element.type) {
                let tipo = Array.isArray(element) ? "Lista" : "Campo";
                return (
                    <field
                        value={dato}
                        tipo={tipo}
                        restricted={element.restricted ? element.restricted : ""}
                        security={element.security ? element.security : ""}
                        ondclick={() => this.handlerManual(dato, tipo)}
                    />
                )
            } else {
                let keys = Object.keys(element);
                keys.forEach(ele => {
                    this.renderStructure(element[ele], dato[ele]);
                });
            }
        } else {
            return (
                <field
                    value={dato}
                    tipo={"Campo"}
                    restricted={element.restricted ? element.restricted : ""}
                    security={element.security ? element.security : ""}
                    ondclick={() => this.props.handlefilter(dato)}
                />
            )
        }

    }

    renderChoice(position) {
        return (
            <input type="checkbox" class="checkBoxSelect" onClick={() => this.props.checkObject(position)}></input>
        )
    }

    renderEdit(position) {
        return (
            <input type="button" class="editButton" onClick={() => this.props.editObject(position)}></input>
        )
    }

    renderDelete(position) {
        return (
            <input type="button" class="deleteButton" onClick={() => this.props.deleteObject(position)}></input>
        )
    }

    renderAllFields() {
        let keysStructure = Object.keys(this.state.structure);

        keysStructure.forEach(key => {
            return (
                this.renderStructure(this.state.structure[key], this.state.value[key])
            )

        });
    }

    constructor(props) {
        super(props);
        this.state.position = props.position;
        this.state.typeDb = props.dbType;
        this.state.value = props.datos;
        this.state.structure = props.structure;

        this.renderStructure = this.renderStructure.bind(this);
        this.renderChoice = this.renderChoice.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDelete = this.renderDelete.bind(this);
        this.renderAllFields = this.renderAllFields.bind(this);

    }
    render() {
        return (
            <div class="ObjectComplete">
                {this.renderChoice(this.state.position)}
                {this.renderAllFields()}
                {this.renderEdit(this.state.position)}
                {this.renderDelete(this.state.position)}
            </div>
        )
    }
}


class navBarSeach extends React.Component {
    constructor(props) {
        super(props);
        this.state.mensaje = "Buscar...";
        this.state.value = props.valorBusqueda;

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        let copyValue = this.state;
        copyValue.value = e.target.value;
        this.props.changeSearch(e.target.value);
    }

    render() {
        return (
            <div class="searchBox">
                <button type="submit"><i class="fa fa-search"></i></button>
                <input type="text" placeholder={this.state.mensaje} value={this.state.value} onChange={this.handleChange} name="search"/>
            </div>
        )
    }
}


class listObjects extends React.Component {
    renderall(){
        let cont = 0;
        this.state.listDatos.forEach(element => {
            return (
                <objetoComplete
                position={cont}
                dbType={this.state.dbType}
                datos={element}
                structure={this.structure}
                handlefilter={ dato => this.props.handleFilter(dato) }
                checkObject={ position => this.props.check(position)}
                editObject={position => this.props.edit(position)}
                deleteObject={position => this.props.delete(position)}
                />
            );
            count++;
        });
    }

    constructor(props){
        super(props);
        this.state.structure = props.structure;
        this.state.listDatos = props.listaDatos;
        this.state.dbType = props.dbtype;
        this.renderall = this.renderall.bind(this);
    }

    render(){
        return (
            <div class="containerObjects">
                {this.renderall()}
            </div>
        )
    }
}


class filter_group extends React.Component {

    handleChange(e){
        let copyValue = this.state;
        
        
    }

    renderStructure(element, dato, key) {
        if (this.state.typeDb == "Mongo") {
            if (Array.isArray(element) || element.type) {
                let tipo = Array.isArray(element) ? "Lista" : "Campo";
                if(tipo == "Campo"){
                    return (
                        <input type="text" value={dato} name={key} onChange={this.handleChange} />
                    )
                }
            } else {
                let keys = Object.keys(element);
                let newKey = key.concat(",");
                keys.forEach(ele => {
                    this.renderStructure(element[ele], dato[ele], newKey.concat(ele) );
                });
            }
        } else {
            return (
                <field
                    value={dato}
                    tipo={"Campo"}
                    restricted={element.restricted ? element.restricted : ""}
                    security={element.security ? element.security : ""}
                    ondclick={() => this.props.handlefilter(dato)}
                />
            )
        }

    }

    renderAllFields() {
        let keysStructure = Object.keys(this.state.structure);

        keysStructure.forEach(key => {
            return (
                this.renderStructure(this.state.structure[key], this.state.value[key],key.toString())
            )

        });
    }

    constructor(props){
        super(props);
        this.state.structure = props.structure;
        this.state.typeDb = props.dbType;
        this.state.value = props.filters;

    }
}

class Recuadro extends React.Component {

    render(){
        return (
            <div onClick={this.props.onclick}>{this.props.color}</div>
        )
    }
}

class Papa extends React.Component {
    constructor(props){
        super(props);
        this.state = {contador: 0, listaColor: [], color: ""};
        this.state.contador = 0;
        this.state.listaColor = ["Rojo", "Amarillo", "Azul"]
        this.state.color = "Rojo";

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        let copystate = this.state;
        if(copystate.contador === 2){
            copystate.contador = 0;
        }else{
            copystate.contador++;
        }
        copystate.color = copystate.listaColor[copystate.contador];
        this.setState(copystate);
    }

    render(){
        return (
            <div>
                <Recuadro 
                color={this.state.color}
                onclick={() => this.handleClick()}
                />
            </div>
        )
    }
}