

class Field extends React.Component {
   
    render() {
        let variableText = "";
        switch (this.props.type) {
            case "Lista":
                variableText = `${this.props.datos.length} Elementos`;
                break;
            case "campo":
                if (this.props.restricted == "password") {
                    for (const iterator of this.props.datos) {
                        variableText += "*";
                    }
                } else if (this.props.restricted == "card") {
                    for (const iterator of this.props.datos) {
                        variableText += "#";
                    }
                    variableText = variableText.slice(0, -4).concat(this.props.datos.slice(-4));

                } else {
                    variableText = this.props.datos;
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


class ObjetoComplete extends React.Component {

    handlerManual(dato, tipo, key){
        if(tipo=="Campo"){
            this.props.handlefilter(dato, key);
        }
    }

    renderStructure(element, dato, key) {
        if (this.props.dbType == "Mongo") {
            if (Array.isArray(element) || element.type) {
                let tipo = Array.isArray(element) ? "Lista" : "Campo";
                return (
                    <Field
                        value={dato}
                        tipo={tipo}
                        restricted={element.restricted ? element.restricted : ""}
                        security={element.security ? element.security : ""}
                        ondclick={() => this.handlerManual(dato, tipo, key)}
                    />
                )
            } else {
                let keys = Object.keys(element);
                let newkey = key.concat(",");
                keys.forEach(ele => {
                    this.renderStructure(element[ele], dato[ele], newkey.concat(ele));
                });
            }
        } else {
            return (
                <Field
                    value={dato}
                    tipo={"Campo"}
                    restricted={element.restricted ? element.restricted : ""}
                    security={element.security ? element.security : ""}
                    ondclick={() => this.props.handlefilter(dato, key)}
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
        let keysStructure = Object.keys(this.props.structure);

        keysStructure.forEach(key => {
            return (
                this.renderStructure(this.props.structure[key], this.props.datos[key], key.toString())
            )

        });
    }

    constructor(props) {
        super(props);
        this.renderStructure = this.renderStructure.bind(this);
        this.renderChoice = this.renderChoice.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDelete = this.renderDelete.bind(this);
        this.renderAllFields = this.renderAllFields.bind(this);

    }
    render() {
        return (
            <div class="ObjectComplete">
                {this.renderChoice(props.position)}
                {this.renderAllFields()}
                {this.renderEdit(props.position)}
                {this.renderDelete(props.position)}
            </div>
        )
    }
}


class NavBarSeach extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.changeSearch(e.target.value);
    }
    handleKeyUp(e){
        if(e.key == "Enter"){
            this.props.search();
        }
        e.preventDefault();
    }

    render() {
        return (
            <div class="searchBox">
                <button type="submit" onClick={this.props.search}><i class="fa fa-search"></i></button>
                <input type="text" placeholder={this.props.mensajeBuscar} onKeyUp={this.handleKeyUp} value={this.props.valorBusqueda} onChange={this.handleChange} name="search"/>
            </div>
        )
    }
}


class ListObjects extends React.Component {
    renderall(){
        let cont = 0;
        this.props.listaDatos.forEach(element => {
            return (
                <ObjetoComplete
                position={cont}
                dbType={this.props.dbtype}
                datos={element}
                structure={this.props.structure}
                handlefilter={ dato,key => this.props.handleFilter(dato, key) }
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


class FilterGroup extends React.Component {

    handleChange(e){
        
        this.props.handlefilter(e.target.value, e.target.name);
        
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
                 <input type="text" value={dato} name={key} onChange={this.handleChange} />
            )
        }

    }

    renderAllFields() {
        let keysStructure = Object.keys(this.props.structure);

        keysStructure.forEach(key => {
            return (
                this.renderStructure(this.props.structure[key], this.props.filters[key],key.toString())
            )

        });
    }

    constructor(props){
        super(props);
        
        this.renderAllFields = this.renderAllFields.bind(this);
        this.renderStructure = this.renderStructure.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
}

class ModuloAdmin extends React.Component {
    constructor(props){
        super(props);

    }
    render(){
        return (
            <div class="containerModule">
                <NavBarSeach
                changeSearch={ value => this.props.changesearch(value)}
                search={()=> this.props.seach()}

                />
                <div class="listaAndFilters">
                    <FilterGroup
                        handlefilter={value,key => this.props.changeFilter(value,key)}
                        structure={this.props.structure}
                        filters={this.props.filters}
                    />

                    <ListObjects 
                        listaDatos={this.props.listaDatos}
                        dbtype={this.props.dbType}
                        structure={this.props.structure}
                        handleFilter={value,key => this.changeFilter(value,key)}
                        check={position => this.props.check(position)}
                        edit={position => this.props.edit(position)}
                        delete={position => this.props.delete(position)}
                    />
                    
                </div>
            </div>
        );
    }

}