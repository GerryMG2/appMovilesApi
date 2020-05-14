

class Field extends React.Component {

    render() {
        console.log("Field:")
        let variableText = "";
        switch (this.props.tipo) {
            case "Lista":
                variableText = `${this.props.datos.length} Elementos`;
                break;
            case "Campo":
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
        console.log(variableText);

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
    _id: { type: String },
    usuario: { type: String, ref: "usuario", fieldShow: "nombre" },
    nombre_encuesta: { type: String, require: true },
    descrip_encuesta: { type: String, required: true },
    ip_disp: { type: String },
    tags_publico: [{ type: String }],
    lanzamiento_pago: [{ type: String, ref: "lanzamiento", fieldsave: "_id", fieldShow: "_id" }],

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

    handlerManual(dato, tipo, key) {
        if (tipo == "Campo") {
            this.props.handlefilter(dato, key);
        }
    }

    renderStructure(element, dato, key) {
        // console.log("elemento:", element);
        // console.log("dato:", dato);
        // console.log("key:", key);
        if (this.props.dbType == "Mongo") {
            if (Array.isArray(element) || element.type) {
                console.log("es un array o campo");
                let tipo = Array.isArray(element) ? "Lista" : "Campo";
                let item = [<Field
                    datos={dato}
                    tipo={tipo}
                    restricted={element.restricted ? element.restricted : ""}
                    security={element.security ? element.security : ""}
                    ondclick={() => this.handlerManual(dato, tipo, key)}
                />];
                console.log(item);
                return item;

            } else {
                let items = [];
                let keys = Object.keys(element);
                let newkey = key.concat(".");
                keys.forEach(ele => {
                    items.push(...this.renderStructure(element[ele], dato[ele], newkey.concat(ele)));
                });
                console.log(items);
                return items;
            }
        } else {


            let item = [<Field
                datos={dato}
                tipo={"Campo"}
                restricted={element.restricted ? element.restricted : ""}
                security={element.security ? element.security : ""}
                ondclick={() => this.props.handlefilter(dato, key)}
            />];
            console.log(item);
            return item;

        }

    }

    renderChoice(position) {
        return (
            <input scope="row" type="checkbox" class="checkBoxSelect" onClick={() => this.props.checkObject(position)}></input>
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
        let items = [];
        keysStructure.forEach(key => {

            items.push(...this.renderStructure(this.props.structure[key], this.props.datos[key], key.toString()));

        });
        console.log("fields:", items);
        return items;
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
                {this.renderChoice(this.props.position)}
                {this.renderAllFields()}
                {this.renderEdit(this.props.position)}
                {this.renderDelete(this.props.position)}
            </div>
        )
    }
}


class NavBarSeach extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.changeSearch(e.target.value);
    }
    handleKeyUp(e) {
        if (e.key == "Enter") {
            this.props.search();
        }
        e.preventDefault();
    }

    render() {
        return (
            <div class="navbar navbar-light bg-light">
                <div class="form-inline">
                    <input type="search" class="form-control mr-sm-2" placeholder={this.props.mensajeBuscar} onKeyUp={this.handleKeyUp} value={this.props.valorBusqueda} onChange={this.handleChange} name="search" />
                    <button type="submit" onClick={this.props.search} class="btn btn-outline-success my-2 my-sm-0"><i class="fas fa-search"></i></button>

                </div>
            </div>
        )
    }
}


class ListObjects extends React.Component {

    renderTitle() {
        let keys = Object.keys(this.props.structure);
        let items = [];
        console.log(keys);
        keys.forEach(element => {
            if (this.props.orden[element]) {
                if (this.props.orden[element] == 1) {
                    if (this.props.structure[element].type) {
                        items.push(<div>
                            <div>{element}</div>
                            <input type="button" value="&#x2b63;" onClick={() => this.props.changeOrden(element)} />

                        </div>);
                    } else {
                        items.push(<div>
                            <div>{element}</div>


                        </div>);
                    }
                } else {

                    if (this.props.structure[element].type) {
                        items.push(<div>
                            <div>{element}</div>
                            <input type="button" value="&#x2B61;" onClick={() => this.props.changeOrden(element)} />

                        </div>);
                    } else {
                        items.push(<div>
                            <div>{element}</div>


                        </div>);
                    }
                }



            } else {
                if (this.props.structure[element].type) {
                    items.push(<div>
                        <div>{element}</div>
                        <input type="button" value="&#x2B64;" onClick={() => this.props.changeOrden(element)} />

                    </div>);
                } else {
                    items.push(<div>
                        <div>{element}</div>


                    </div>);
                }
            }

        });
        return items;
    }

    renderall() {
        let cont = 0;
        let items = [];
        this.props.listaDatos.forEach(element => {
            items.push(
                <ObjetoComplete
                    key={cont}
                    position={cont}
                    dbType={this.props.dbtype}
                    datos={element}
                    structure={this.props.structure}
                    handlefilter={(dato, key) => this.props.handleFilter(dato, key)}
                    checkObject={position => this.props.check(position)}
                    editObject={position => this.props.edit(position)}
                    deleteObject={position => this.props.delete(position)}
                />
            );
            cont++;
        });
        return items;
    }

    constructor(props) {
        super(props);

        this.renderall = this.renderall.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
    }

    render() {
        return (

            <div class="table table-bordered table-dark containerObjects">
                <div class="titles">
                    {this.renderTitle()}
                </div>
                {this.renderall()}
            </div>
        )
    }
}


class FilterGroup extends React.Component {

    handleChange(e) {

        this.props.handlefilter(e.target.value, e.target.name);

    }

    renderStructure(element, dato, key) {
        if (this.state.typeDb == "Mongo") {
            if (Array.isArray(element) || element.type) {
                let tipo = Array.isArray(element) ? "Lista" : "Campo";
                if (tipo == "Campo") {
                    let items =
                        <input type="text" value={dato} name={key} onChange={this.handleChange} />;
                    return items;
                }
            } else {
                let keys = Object.keys(element);
                let newKey = key.concat(".");
                let items = [];
                keys.forEach(ele => {
                    items.push(...this.renderStructure(element[ele], dato[ele], newKey.concat(ele)));
                });
                return items;
            }
        } else {
            let item =
                <input type="text" value={dato} name={key} onChange={this.handleChange} />;
            return item;

        }

    }

    renderAllFields() {
        let keysStructure = Object.keys(this.props.structure);
        let items = [];
        keysStructure.forEach(key => {

            items.push(...this.renderStructure(this.props.structure[key], this.props.filters[key], key.toString()));


        });

        return items;
    }

    constructor(props) {
        super(props);

        this.renderAllFields = this.renderAllFields.bind(this);
        this.renderStructure = this.renderStructure.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div class="listaFiltros">
                {this.renderAllFields}
            </div>
        );
    }
}

class Pagination extends React.Component {

    handlePagination(page) {
        this.props.pagination(page);
    }

    renderPagination(size, page, total) {
        if (page === 1) {
            return (
                <div>
                    <span>1-{size} de {total}</span>
                    <input type="button" name="anterior" value="" disabled />
                    <input type="button" name="siguiente" value="2" onClick={() => this.handlePagination(2)} />
                </div>
            );
        } else {
            if (page === Math.ceil(total / size)) {
                let begin = (size * (page - 1)) + 1;
                let end = total;
                return (
                    <div>
                        <span>{begin}-{end} de {total}</span>
                        <input type="button" name="anterior" value={page - 1} onClick={() => this.handlePagination(page - 1)} />
                        <input type="button" name="siguiente" value={page + 1} disabled />
                    </div>
                );
            } else {
                let begin = (size * (page - 1)) + 1;
                let end = size * page;
                return (
                    <div>
                        <span>{begin}-{end} de {total}</span>
                        <input type="button" name="anterior" value={page - 1} onClick={() => this.handlePagination(page - 1)} />
                        <input type="button" name="siguiente" value={page + 1} onClick={() => this.handlePagination(page + 1)} />
                    </div>
                );
            }
        }
    }

    constructor(props) {
        super(props);

        this.renderPagination = this.renderPagination.bind(this);
        this.handlePagination = this.handlePagination.bind(this);
    }

    render() {
        return (
            this.renderPagination(this.props.size, this.props.page, this.props.totalcount)
        );
    }


}

class ModuloAdmin extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div class="containerModule">
                <NavBarSeach
                    changeSearch={value => this.props.changesearch(value)}
                    search={() => this.props.seach()}

                />
                <div>
                    <input type="button" value="Create" onClick={() => this.props.create()} />
                </div>
                <div class="listaAndFilters">
                    <FilterGroup
                        handlefilter={(value, key) => this.props.changeFilter(value, key)}
                        structure={this.props.structure}
                        filters={this.props.filters}
                    />

                    <ListObjects
                        listaDatos={this.props.listaDatos}
                        dbtype={this.props.dbType}
                        structure={this.props.structure}
                        handleFilter={(value, key) => this.changeFilter(value, key)}
                        check={position => this.props.check(position)}
                        edit={position => this.props.edit(position)}
                        delete={position => this.props.delete(position)}
                        changeOrden={key => this.props.changeOrden(key)}
                        orden={this.props.orden}
                    />

                </div>
                <Pagination
                    pagination={page => this.props.pagination(page)}
                    size={this.props.size}
                    page={this.props.page}
                    totalcount={this.props.totalcount}
                />
            </div>
        );
    }

}

//desde aqui createOrEdit pantalla


class CreateOrUpdateField extends React.Component {

    renderOptions(lista, select) {
        let items = [];
        lista.forEach(element => {
            if (element.valor === select) {

                items.push(<option value={element.save} selected>{element.show}</option>);

            } else {

                items.push(<option value={element.save}>{element.show}</option>);

            }
        });
        return items;
    }

    handleChange(e) {
        //tipo, path, valor
        this.props.handleFieldChange(e.target.tipo, e.target.name, e.target.value);
    }
    handleChangeC(e) {
        this.props.handleFieldChange(e.target.tipo, e.target.name, e.target.checked);
    }

    renderField(dbType, dato, estructura, path, listaOpciones) {
        if (dbType === "Mongo" && path != "_id") {
            let newPath = path.splite(".").slice(-1)[0];
            if (estructura.type) {
                if (estructura.ref) {

                    let item =
                        <div class="campEditCreate">
                            <span>{newPath}</span>
                            <select name={path} tipo={estructura.type.name} class="selectfield" onChange={this.handleChange}>
                                {this.renderOptions(listaOpciones, dato)}
                            </select>
                        </div>;

                    return item;
                    // se renderiz con opciones
                } else {
                    let tipo = estructura.type.name;
                    let item;
                    switch (tipo) {
                        case "String":
                            item =
                                <div>
                                    <span>{newPath}</span>
                                    <input type="text" tipo="String" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                </div>
                                ;
                            return item;
                            break;
                        case "Boolean":

                            item =
                                <div>
                                    <span>{newPath}</span>
                                    <input type="checkbox" name={path} tipo="Boolean" value={newPath} class="checkboxfield" onChange={this.handleChangeC} />
                                </div>
                                ;
                            return item;
                            break;
                        case "Number":
                            item =
                                <div>
                                    <span>{newPath}</span>
                                    <input type="text" tipo="Number" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                </div>
                                ;
                            return item;
                            break;
                        case "Date":
                            item =
                                <div>
                                    <span>{newPath}</span>
                                    <input type="date" tipo="Date" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                </div>
                                ;
                            return item;

                            break;
                        default:
                            break;
                    }
                }
            }
            // se renderiza
        } else {
            let newPath = path.splite(".").slice(-1)[0];
            if (estructura.type != "BIGSERIAL") {
                if (estructura.primaryKey) {
                    if (estructura.foreignKey) {
                        //se renderiza con opciones
                        let item =
                            <div class="campEditCreate">
                                <span>{newPath}</span>
                                <select name={path} tipo={estructura.modelType} class="selectfield" onChange={this.handleChange}>
                                    {this.renderOptions(listaOpciones, dato)}
                                </select>
                            </div>;
                        return item;
                    } else {
                        //se renderiza
                        let item;
                        switch (estructura.type.tipo) {
                            case "String":
                                item =
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="text" tipo="String" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                    </div>
                                    ;
                                return item;
                                break;
                            case "Boolean":
                                item =
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="checkbox" name={path} tipo="Boolean" value={newPath} class="checkboxfield" onChange={this.handleChangeC} />
                                    </div>
                                    ;
                                return item;

                                break;
                            case "Number":
                                item =
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="text" tipo="Number" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                    </div>
                                    ;
                                return item;
                                break;
                            case "Date":
                                item =
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="date" tipo="Date" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                    </div>
                                    ;
                                return item;
                                break;
                            default:
                                break;
                        }
                    }

                } else {
                    if (estructura.foreignKey) {
                        let item =
                            <div class="campEditCreate">
                                <span>{newPath}</span>
                                <select name={path} tipo={estructura.modelType} class="selectfield" onChange={this.handleChange}>
                                    {this.renderOptions(listaOpciones, dato)}
                                </select>
                            </div>;
                        return item;
                        //se renderiza con opciones
                    } else {
                        let item;
                        switch (estructura.type.tipo) {
                            case "String":
                                item =
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="text" tipo="String" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                    </div>
                                    ;
                                return item;
                                break;
                            case "Boolean":
                                item =
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="checkbox" name={path} tipo="Boolean" value={newPath} class="checkboxfield" onChange={this.handleChangeC} />
                                    </div>
                                    ;
                                return item;

                                break;
                            case "Number":
                                item =
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="text" tipo="Number" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                    </div>
                                    ;
                                return item;
                                break;
                            case "Date":
                                item =
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="date" tipo="Date" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                    </div>
                                    ;
                                return item;

                                break;
                            default:
                                break;
                        }
                    }

                }
            }
        }
    }


    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeC = this.handleChangeC.bind(this);
        this.renderField = this.renderField.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
    }

    render() {
        return (
            this.renderField(this.props.dbType, this.props.dato, this.props.estructura, this.props.path, this.props.listaOpciones)
        );
    }

}

class FormCreateOrUpdate extends React.Component {

    renderList(dbType, estructura, dato, path, listaOpcionesfeach) {
        if (dbType == "Mongo") {
            if (estructura.type) {
                // campo
                let item =
                    <CreateOrUpdateField
                        dbType={dbType}
                        dato={dato}
                        estructura={estructura}
                        path={path}
                        listaOpciones={listaOpcionesfeach}
                        handleFieldChange={(tipo, path, value) => this.props.handleFieldChange(tipo, path, value)}
                    />
                    ;
                return item;
            } else {
                if (Array.isArray(estructura)) {
                    let cont = 0;
                    let title = path.split(".").slice(-1)[0]
                    items = [];
                    dato.forEach(element => {
                        let newPa = path.concat("#").concat(cont);
                        item.push(
                            <div class="objectInlist">
                                <button value="-" onClick={() => this.props.deleteInList(path, cont)}></button>
                                {this.renderList("Mongo", estructura[0], dato[cont], newPa, listaOpcionesfeach[0])}

                            </div>);
                        cont++;
                    });
                    let item =
                        <div>
                            <h3>{title}</h3>
                            <button value="+" onClick={() => this.props.insertList(path)}></button>
                            <div class="listaElementos">
                                {items}
                            </div>
                        </div>

                        ;
                    return item;
                    // lista
                } else {
                    let item = []
                    let newkeys = Object.keys(estructura);
                    newkeys.forEach(element => {
                        item.push(this.renderList(dbType, estructura, dato, path.concat(".").concat(element), listaOpcionesfeach[element]));
                    });
                    return item;
                    // objeto
                }
            }
        } else {
            let item =
                <CreateOrUpdateField
                    dbType={dbType}
                    dato={dato}
                    estructura={estructura}
                    path={path}
                    listaOpciones={listaOpcionesfeach}
                    handleFieldChange={(tipo, path, value) => this.props.handleFieldChange(tipo, path, value)}
                />;
            return item;

        }
    }


    constructor(props) {
        super(props);
        this.renderList = this.renderList.bind(this);
    }

    render() {
        let newkeys = Object.keys(this.props.estructura);
        newkeys.forEach(element => {
            if (this.props.typeFomr == "Create") {

                return (
                    <div class="formUpdateOrCreate">
                        <input type="button" value="x" onClick={() => this.props.exitCreateOrUpdate()} />
                        {this.renderList(this.props.dbType, this.props.estructura[element], this.props.datos[element], element.toString(), this.props.listaOpciones[element])}
                        <button class="btn-crear" value="Create" onClick={() => this.props.createObject()}></button>
                    </div>
                );
            } else {

                return (
                    <div class="formUpdateOrCreate">
                        <input type="button" value="x" onClick={() => this.props.exitCreateOrUpdate()} />
                        {this.renderList(this.props.dbType, this.props.estructura[element], this.props.datos[element], element.toString(), this.props.listaOpciones[element])}
                        <button class="btn-update" value="update" onClick={() => this.props.updateObject()}></button>
                    </div>
                );
            }
        });

    }




}


class MasterPage extends React.Component {

    listaModelosR() {
        let listaM = [];

        listaM.push({
            urlname: "encuesta", dbType: "Mongo", nombre: "encuesta", modelo: {
                _id: { type: String },
                usuario: { type: String, ref: "usuario", fieldShow: "nombre" },
                nombre_encuesta: { type: String, require: true },
                descrip_encuesta: { type: String, required: true },
                ip_disp: { type: String },
                tags_publico: [{ type: String }],
                lanzamiento_pago: [{ type: String, ref: "lanzamiento", fieldsave: "_id", fieldShow: "_id" }],

                preguntas: [{
                    encabezado: { type: String, require: true },
                    tipo: { type: String, required: true },
                    pregunta_abierta: { type: Boolean, required: true },
                    multi_respuesta: { type: Boolean, required: true },
                    requiere: [{ type: String }],
                    opciones: [{ titulo_opcion: { type: String } }]
                }]
            }, blank: {
                _id: null,
                usuario: null,
                nombre_encuesta: null,
                descrip_encuesta: null,
                ip_disp: null,
                tags_publico: [null],
                lanzamiento_pago: [null],

                preguntas: [{
                    encabezado: null,
                    tipo: null,
                    pregunta_abierta: null,
                    multi_respuesta: null,
                    requiere: [null],
                    opciones: [{ titulo_opcion: null }]
                }]
            }
        });

        listaM.push({
            urlname: "lanzamiento", dbType: "Mongo", nombre: "lanzamiento", modelo: {
                _id: { type: String },
                usuario: { type: String, ref: "usuario", fieldsave: "_id", fieldShow: "nombre" },
                encuesta: { type: String, ref: "encuesta", fieldsave: "_id", fieldShow: "nombre_encuesta" },
                cantidad_usuario: { type: Number, required: true },
                pagada: { type: Boolean, required: true },
                cantidad_respuesta: { type: Number, required: true },
                encuesta_terminada: { type: Boolean, required: true },
                costo: { type: Number }
            }, blank: {
                _id: null,
                usuario: null,
                encuesta: null,
                cantidad_usuario: null,
                pagada: null,
                cantidad_respuesta: null,
                encuesta_terminada: null,
                costo: null
            }
        });

        listaM.push({
            urlname: "notificacion", dbType: "Mongo", nombre: "notificacion", modelo: {
                _id: { type: String },
                usuariok: { type: String, ref: "usuario", fieldsave: "_id", fieldShow: "nombre" },
                encuesta: { type: String, ref: "encuesta", fieldsave: "_id", fieldShow: "nombre_encuesta" },
                descripcion: { type: String, required: true },
                tipo_notificacion: { type: String, required: true },
                eliminada: { type: Boolean, required: true },
                date: { type: Date, required: true },
                vista: { type: Boolean, required: true }
            }, blank: {
                _id: null,
                usuariok: null,
                encuesta: null,
                descripcion: null,
                tipo_notificacion: null,
                eliminada: null,
                date: null,
                vista: null
            }
        });


        listaM.push({
            urlname: "respuesta", dbType: "Mongo", nombre: "respuesta", modelo: {
                _id: { type: String },
                usuario: { type: String, ref: "usuario", fieldsave: "_id", fieldShow: "nombre" },
                encuesta: { type: String, ref: "encuesta", fieldsave: "_id", fieldShow: "nombre_encuesta" },
                pagada: { type: Boolean, required: true },
                respuesta: [{ id_pregunta: { type: String }, id_respuesta: { type: String }, respuesta_abierta: { type: String } }],
                //respuesta tiene dos referencias(buscar como se hace eso)!\
                //refOutItsel: {camporef: "encuesta",campo: "preguntas", fielSave: "_id", show: "encabezado"}
                //refOutItsel: {camporef: "encuesta", campo: "preguntas.opciones", fielSave: "_id", show: "titulo_opcion"}
                fecha: { type: Date },
                ip_disp: { type: String }
            }, blank: {
                _id: null,
                usuario: null,
                encuesta: null,
                pagada: null,
                respuesta: [{ id_pregunta: null, id_respuesta: null, respuesta_abierta: null }],
                //respuesta tiene dos referencias(buscar como se hace eso)!\
                //refOutItsel: {camporef: "encuesta",campo: "preguntas", fielSave: "_id", show: "encabezado"}
                //refOutItsel: {camporef: "encuesta", campo: "preguntas.opciones", fielSave: "_id", show: "titulo_opcion"}
                fecha: null,
                ip_disp: null
            }
        });

        listaM.push({
            urlname: "usuario", dbType: "Mongo", nombre: "usuario", modelo: {
                _id: { type: String },
                numId: { type: String, unique: true, require: true },
                nombre: { type: String, required: true },
                apellido: { type: String, required: true },
                peso: { type: Number, required: true },
                nacimiento: { type: Date, required: true },
                altura: { type: Number, required: true },
                pais: { type: String, required: true },
                cuidad: { type: String, required: true },
                sexo: { type: String, required: true },
                email: { type: String, unique: true, required: true },
                password: { type: String, required: true, restricted: "password" },
                tags: [{ type: String }],
                saldo: { type: Number, required: true },
                ip_disp: [{ type: String }],

                carrito: [{
                    id_encuesta: { type: String, ref: "encuesta", fieldsave: "_id", fieldShow: "nombre_encuesta" },
                    cant_personas: { type: Number, require: true },
                    publico: [{ type: String, required: true }],
                    costo: { type: Number, required: true },
                    descuento: { type: String }
                }],

            }, blank: {
                _id: null,
                numId: null,
                nombre: null,
                apellido: null,
                peso: null,
                nacimiento: null,
                altura: null,
                pais: null,
                cuidad: null,
                sexo: null,
                email: null,
                password: null,
                tags: [null],
                saldo: null,
                ip_disp: [null],

                carrito: [{
                    id_encuesta: null,
                    cant_personas: null,
                    publico: [null],
                    costo: null,
                    descuento: null
                }],

            }
        });

        listaM.push({
            urlname: "ciudad", dbType: "postgres", nombre: "ciudad", modelo: {

                id_ciudad: { type: "BIGSERIAL", primaryKey: true, name: "id_ciudad", modelType: "Number" },
                id_pais: { trype: "BIGINT", name: "id_pais", foreignKey: true, ref: "pais", refField: "id_pais", fieldShow: "nombre", commentForeign: "id_pais_fk", modelType: "Number" },
                nombre: { type: "VARCHAR(100)", name: "nombre", modelType: "String" }


            }, blanck: {

                id_ciudad: null,
                id_pais: null,
                nombre: null


            }
        });
        listaM.push({
            urlname: "cliente", dbType: "postgres", nombre: "cliente", modelo: {

                id_cliente: { type: "BIGSERIAL", primaryKey: true, name: "id_cliente", modelType: "Number" },
                id_usuario: {
                    type: "BIGINT", name: "id_usuario", foreignKey: true,
                    ref: "usuario", refField: "id_usuario", fieldShow: "id_obj", commentForeing: "id_usuario_fk", modelType: "Number"
                }

            }, blanck: {

                id_cliente: null,
                id_usuario: null

            }
        });
        listaM.push({
            urlname: "cuenta", dbType: "postgres", nombre: "cuenta", modelo: {

                id_cuenta: { type: "BIGSERIAL", primaryKey: true, name: "id_cuenta", modelType: "Number" },
                id_cliente: { type: "BIGINT", name: "id_cliente", foreignKey: true, fieldShow: "id_cliente", ref: "cliente", refField: "id_cliente", commentForeign: "id_clienet_fk", modelType: "String" },
                nombre: { type: "VARCHAR(64)", name: "nombre", modelType: "String" },
                direccion: { type: "VARCHAR(255)", name: "direccion", modelType: "String" },
                id_ciudad: { type: "BIGINT", name: "id_ciudad", foreignKey: true, fieldShow: "nombre", ref: "ciudad", refField: "id_ciudad", fieldShow: "nombre", commentForeign: "id_ciudad_fk", modelType: "Number" },
                empresa: { type: "BOOLEAN", name: "empresa", modelType: "Boolean" }

            }, blank: {

                id_cuenta: null,
                id_cliente: null,
                nombre: null,
                direccion: null,
                id_ciudad: null,
                empresa: null

            }
        });
        listaM.push({
            urlname: "descuento", dbType: "postgres", nombre: "descuento", modelo: {

                id_descuento: { type: "BIGSERIAL", primaryKey: true, name: "id_descuento", modelType: "Number" },
                descripcion_descuento: { type: "VARCHAR(255)", name: "descripcion_descuento", modelType: "String" }
            }, blank: {

                id_descuento: null,
                descripcion_descuento: null
            }
        });
        listaM.push({
            urlname: "detalleEncuesta", dbType: "postgres", nombre: "detalle_encuesta", modelo: detalle_encuesta = {

                id_tran_detail: { type: "BIGINT", fieldShow: "id_tran_detail", name: "id_tran_detail", foreignKey: true, ref: "transaccion_detalle", refField: "id_tran_detail", commentForeign: "id_tran_detail_fk", modelType: "Number" },
                id_encuesta: { type: "BIGINT", fieldShow: "nombre", name: "id_encuesta", foreignKey: true, ref: "encuesta", refField: "id_encuesta", commentForeign: "id_encuesta_fk", modelType: "Number" }

            }, blank: detalle_encuesta = {

                id_tran_detail: null,
                id_encuesta: null

            }
        });
        listaM.push({
            urlname: "encuestaT", dbType: "postgres", nombre: "encuesta", modelo: {

                id_encuesta: { type: "BIGSERIAL", primarykey: true, name: "id_encuesta", modelType: "Number" },
                id_obj: { type: "VARCHAR(128)", name: "id_obj", modelType: "String" },
                nombre: { type: "VARCHAR(100)", name: "nombre", modelType: "String" }
            }, blank: {

                id_encuesta: null,
                id_obj: null,
                nombre: null
            }
        });
        listaM.push({
            urlname: "pais", dbType: "postgres", nombre: "pais", modelo: {

                id_pais: { type: "BIGSERIAL", primaryKey: true, name: "id_pais", modelType: "Number" },
                nombre: { type: "VARCHAR(64)", name: "nombre", modelType: "String" }
            }, blank: {

                id_pais: null,
                nombre: null
            }
        });
        listaM.push({
            urlname: "servicio", dbType: "postgres", nombre: "servicio", modelo: {

                id_servicio: { type: "BIGSERIAL", primaryKey: true, name: "id_servicio", modelType: "Number" },
                nombre_servicio: { type: "VARCHAR(64)", name: "nombre_servicio", modelType: "String" }

            }, blank: {

                id_servicio: null,
                nombre_servicio: null

            }
        });
        listaM.push({
            urlname: "tipoPago", dbType: "postgres", nombre: "tipo_pago", modelo: {

                id_pago: { type: "BIGSERIAL", primaryKey: true, name: "id_pago", modelType: "Number" },
                descripcion_pago: { type: "VARCHAR(128)", name: "descripcion_pago", modelType: "String" }

            }, blank: {

                id_pago: null,
                descripcion_pago: null

            }
        });
        listaM.push({
            urlname: "tipotransaccionDoc", dbType: "postgres", nombre: "tipo_transaccion_documento", modelo: {

                id_documento: { type: "BIGSERIAL", primaryKey: true, name: "id_documento", modelType: "Number" },
                nombre_doc: { type: "VARCHAR(64)", name: "nombre_doc", modelType: "String" },
                descripcion_doc: { type: "VARCHAR(255)", name: "descripcion_doc", modelType: "String" }
            }, blank: {

                id_documento: null,
                nombre_doc: null,
                descripcion_doc: null
            }

        });
        listaM.push({
            urlname: "transaccionDetalle", dbType: "postgres", nombre: "transaccion_detalle", modelo: {

                id_tran_detail: { type: "BIGSERIAL", primaryKey: true, name: "id_tran_detalle", modelType: "Number" },
                id_factura: { type: "BIGINT", name: "id_factura", fielShow: "id_factura", foreignKey: true, ref: "transaccion", refField: "id_factura", commentForeign: "id_factura_fk", modelType: "Number" },
                id_servicio: { type: "BIGINT", name: "id_servicio", fielShow: "nombre_servicio", foreignKey: true, ref: "servicio", refField: "id_servicio", commentForeign: "id_servicio_fk", modelType: "Number" },
                id_documento: { type: "BIGINT", name: "id_documento", fielShow: "nombre_doc", foreignKey: true, ref: "documento", refField: "id_documento", commentForeign: "id_documento_fk", modelType: "Number" },
                costo: { type: "MONEY", name: "costo", modelType: "Number" },
                monto: { type: "MONEY", name: "monto", modelType: "Number" },
                descuento: { type: "MONEY", name: "descuento", modelType: "Number" },
                monto_con_descuento: { type: "MONEY", name: "monto_con_descuento", modelType: "Number" },
                id_descuento: { type: "BIGINT", name: "id_descuento", fielShow: "descripcion_descuento", foreignKey: true, ref: "descuento", refField: "id_descuento", commentForeign: "id_descuento_fk", modelType: "Number" }

            }, blank: {

                id_tran_detail: null,
                id_factura: null,
                id_servicio: null,
                id_documento: null,
                costo: null,
                monto: null,
                descuento: null,
                monto_con_descuento: null,
                id_descuento: null,

            }
        });
        listaM.push({
            urlname: "transaccion", dbType: "postgres", nombre: "transaccion", modelo: {

                id_factura: { type: "BIGSERIAL", name: "id_factura", modelType: "Number" },
                id_cuenta: { type: "BIGINT", name: "id_cuenta", fieldShow: "nombre", foreignKey: true, ref: "cuenta", refField: "id_cuenta", commentForeign: "id_cuenta_fk", modelType: "Number" },
                fecha: { type: "DATE", name: "fecha", modelType: "Date" },
                anulado: { type: "BOOLEAN", name: "anulado", modelType: "Boolean" },
                id_tipo_pago: { type: "BIGINT", name: "id_tipo_pago", fieldShow: "descripcion_pago", foreignKey: true, ref: "tipo_pago", refField: "id_tipo_pago", commentForeign: "id_tipo_pago_fk", modelType: "Number" }


            }, blank: {

                id_factura: null,
                id_cuenta: null,
                fecha: null,
                anulado: null,
                id_tipo_pago: null,


            }
        });
        listaM.push({
            urlname: "usuario", dbType: "postgres", nombre: "usuario", modelo: {

                id_usuario: { type: "BIGSERIAL", primaryKey: true, name: "id_usuario", modelType: "Number" },
                id_obj: { type: "VARCHAR(128)", name: "id_obj", modelType: "String" }
            }, blank: {

                id_usuario: null,
                id_obj: null
            }
        });
        listaM.push({
            urlname: "usuarioAdmin", dbType: "postgres", nombre: "adminusers", modelo: {

                id_usuario: { type: "BIGSERIAL", primaryKey: true, name: "id_usuario", modelType: "Number" },
                username: { type: "VARCHAR(128)", speciaL: "UNIQUE", name: "username", modelType: "String" },
                password: { type: "VARCHAR(128)", name: "password", modelType: "String", restricted: "password" }
            }, blanck: {

                id_usuario: null,
                username: null,
                password: null
            }
        });

        return listaM;

    }

    create() {
        let options_and_body = {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        };
        options_and_body["body"] = JSON.stringify(body);

        let body = {};
        if (this.state.modelo.dbType == "Mongo") {
            body = this.state.elementoToUpdateOrCreate;

        } else {
            let keys = Object.keys(this.state.modelo.modelo);
            let newModel = {};

            keys.forEach(ele => {
                if (!this.state.modelo.modelo.primaryKey && !this.state.modelo.modelo.type == "BIGSERIAL") {
                    newModel[ele] = this.state.elementoToUpdateOrCreate[ele];
                }

            });

            body = newModel;

        }


        let prefix = "";
        if (this.state.modelo.dbType == "Mongo") {
            prefix = "/api";
        } else {
            prefix = "/apit";
        }

        let auxUrl = `${prefix}/${this.state.modelo.urlname}/` + "?" + query;
        fetch(auxUrl, options_and_body)
            .then(res => res.json())
            .catch(error => {
                console.log("error: ", error);
                Swal.fire("Hubo un problema para crear el objet", error, "error");
            })
            .then(response => {
                console.log("success: ", response);
                Swal.fire("Se creo correctamente", "Continua", "ok");
            })
            .then(() => {
                let copy = this.state;
                copy.elementoToUpdateOrCreate = {};
                copy.CreateOrUpdate = "None";
                copy.listaOpciones = {};
                this.setState(copy);
                this.get();
            });

    }

    recursiveOptionList(estructura, params) {
        console.log(estructura);
        if (estructura.ref) {
            let query = Object.keys(params)
                .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
                .join("&");
            let options_and_body = {
                method: "GET",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                }
            };


            let auxUrl = `/api/${estructura.ref}/` + "?" + query;
            fetch(auxUrl, options_and_body)
                .then(res => res.json())
                .catch(error => console.log("error: ", error))
                .then(response => {
                    if (response.count > 0) {
                        return response.docs.map(obj => {
                            let a = { save: null, show: null }
                            for (i in obj) {

                                if (i == estructura.fieldShow) {
                                    console.log(i);
                                    a.show = obj[i]
                                }
                                if (i == "_id") {
                                    console.log(i);
                                    a.save = obj[i]
                                }
                            }


                            return a;
                        });
                    } else {
                        return [];
                    }


                });

        } else {
            if (Array.isArray(estructura)) {
                //
                let objRetu = []
                objRetu.push(this.recursiveOptionList(estructura[0], params));
                return objRetu;
            } else {
                if (!estructura.type) {
                    // objeto
                    let ret = {}
                    let newkeys = Object.keys(estructura);
                    newkeys.forEach(ele => {
                        ret[ele] = this.recursiveOptionList(estructura[ele], params);
                    });
                    return ret;
                }
            }
        }


    }

    getOptionsList() {
        console.log("getting list");
        let prefix = "";
        let params = {};
        let blank = this.state.modelo.blank;
        if (this.state.modelo.dbType == "Mongo") {
            params = {
                filters: "",
                filtro: JSON.stringify({}),
                page: 1,
                size: 0,
                orden: JSON.stringify({}),
            };
            prefix = "/api"
        } else {
            params = {
                filters: "",
                filtro: JSON.stringify({}),
                page: 1,
                size: "ALL",
                orden: JSON.stringify({}),
            };
            prefix = "/apit"
        }



        let keys = Object.keys(this.state.modelo.modelo);
        keys.forEach(element => {
            if (this.state.modelo.dbType == "Mongo") {
                if (this.state.modelo.modelo[element].ref) {
                    console.log("entra en ref");
                    let query = Object.keys(params)
                        .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
                        .join("&");
                    let options_and_body = {
                        method: "GET",
                        credentials: "same-origin",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    };
                    let auxUrl = `${prefix}/${this.state.modelo.modelo[element].ref}/` + "?" + query;



                    fetch(auxUrl, options_and_body)
                        .then(res => res.json())
                        .catch(error => console.log("error: ", error))
                        .then(response => {
                            console.log("success: ", response);
                            blank[element] = response.docs.map(obj => {
                                let a = { save: null, show: null }
                                for (i in obj) {

                                    if (i == this.state.modelo.modelo[element].fieldShow) {
                                        console.log(i);
                                        a.show = obj[i]
                                    }
                                    if (i == "_id") {
                                        console.log(i);
                                        a.save = obj[i]
                                    }
                                }


                                return a
                            });
                        });
                } else {
                    if (Array.isArray(element)) {
                        console.log("es un array");
                        blank[element][0] = this.recursiveOptionList(this.state.modelo.modelo[element][0], params)
                    } else {
                        if (!this.state.modelo.modelo[element].type) {
                            console.log("es un objeto");
                            let keysI = Object.keys(this.state.modelo.modelo[element]);

                            keysI.forEach(ele => {
                                blank[element][ele] = this.recursiveOptionList(this.state.modelo.modelo[element][ele], params);
                            });
                        }
                    }
                }
            } else {
                //[{null, []}]
                let query = Object.keys(params)
                    .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
                    .join("&");
                let options_and_body = {
                    method: "GET",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json"
                    }
                };


                let auxUrl = `${prefix}/${this.state.modelo.modelo[element].ref}/` + "?" + query;
                fetch(auxUrl, options_and_body)
                    .then(res => res.json())
                    .catch(error => console.log("error: ", error))
                    .then(response => {
                        blank[element] = response.docs.map(obj => {
                            let a = { save: null, show: null }
                            for (i in obj) {

                                if (i == this.state.modelo.modelo[element].fieldShow) {
                                    console.log(i);
                                    a.show = obj[i]
                                }
                                if (i == this.state.modelo.modelo[element].refField) {
                                    console.log(i);
                                    a.save = obj[i]
                                }
                            }


                            return a
                        });
                    });
            }
        });

        console.log("finished blank:", blank);
        return blank;

    }

    get() {
        let copy = this.state;
        let params = {
            filters: this.state.filters,
            filtro: JSON.stringify(this.state.filtros),
            pag: this.state.page,
            size: this.state.size,
            orden: JSON.stringify(this.state.orden),
        };
        let prefix = "";
        if (this.state.modelo.dbType == "Mongo") {
            prefix = "/api";
        } else {
            prefix = "/apit";
        }

        let query = Object.keys(params)
            .map(k => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
            .join("&");
        let options_and_body = {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        };

        let auxUrl = `${prefix}/${this.state.modelo.urlname}/` + "?" + query;

        fetch(auxUrl, options_and_body)
            .then(res => res.json())
            .catch(error => console.log("error: ", error))
            .then(response => {
                if (response.correct) {
                    console.log("success: ", response);
                    copy.listaDatos = response.docs;
                    copy.elementosTotales = response.count;
                    copy.checkList = []
                    copy.listaOpciones = {}
                    this.setState(copy);
                } else {
                    console.log("error: ", response);
                }

            });

    }

    update() {
        let body = { id: null, model: null };
        if (this.state.modelo.dbType == "Mongo") {
            body.id = this.state.elementoToUpdateOrCreate["_id"];
            body.model = this.state.elementoToUpdateOrCreate;
        } else {
            let keys = Object.keys(this.state.modelo.modelo);
            let newModel = {};
            let newkey = {};
            keys.forEach(ele => {
                if (this.state.modelo.modelo.primaryKey) {
                    newkey[ele] = this.state.elementoToUpdateOrCreate[ele];
                } else {
                    newModel[ele] = this.state.elementoToUpdateOrCreate[ele];
                }

            });
            body.id = newkey;
            body.model = newModel;

        }

        let prefix = "";
        if (this.state.modelo.dbType == "Mongo") {
            prefix = "/api";
        } else {
            prefix = "/apit";
        }



        let options_and_body = {
            method: "PUT",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        };
        let url = `${prefix}/${this.state.modelo.urlname}/`;

        options_and_body["body"] = JSON.stringify(body);
        fetch(url, options_and_body)
            .then(res => res.json())
            .catch(error => {
                console.log("error: ", error);
                Swal.fire("Hubo un problema para actualizar", error, "error");
            })
            .then(response => {
                console.log("success: ", response);
                Swal.fire("actualizado", "Continua", "success");
            })
            .then(() => {
                let copy = this.state;
                copy.elementoToUpdateOrCreate = {};
                copy.CreateOrUpdate = "None";
                copy.listaOpciones = {};
                this.setState(copy);
                this.get();

            });
    }

    delete(position) {
        let options_and_body = {
            method: "DELETE",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            }
        };

        let prefix = "";
        if (this.state.modelo.dbType == "Mongo") {
            prefix = "/api"
        } else {
            prefix = "/apit"
        }

        if (this.state.modelo.dbType == "Mongo") {
            options_and_body["body"] = JSON.stringify({
                id: this.state.listaDatos[position]["_id"]
            });
        } else {
            let idcond = {};
            let keyModel = Object.keys(this.state.modelo.modelo);
            keyModel.forEach(element => {
                if (this.state.modelo.modelo.primaryKey) {
                    idcond[element] = this.state.listaDatos[position][key];
                }
            });

            options_and_body["body"] = JSON.stringify({
                id: idcond
            });

        }

        let url = `${prefix}/${this.state.modelo.modelo.urlname}/`;
        fetch(url, options_and_body)
            .then(res => res.json())
            .catch(error => {
                console.log("error: ", error);
                Swal.fire("Error al eliminar.", error, "error");
            })
            .then(response => {
                console.log("success: ", response);
                Swal.fire(response.msg, "Continua", response.ok);
            })
            .then(() => { })
            .then(() => {
                // implement get
                this.get();
            });
    }

    changeModel(e) {
        console.log(e.target);
        let copy = this.state;
        copy.modelo = this.Modelos[e.target.getAttribute("cont")];
        copy.CreateOrUpdate = "None";
        copy.filtros = {};
        copy.filters = "";
        copy.orden = {};
        copy.listaDatos = [];
        copy.page = 1;
        copy.size = 20;
        copy.elementosTotales = 0;
        copy.checkList = [];
        copy.listaOpciones = {};

        this.setState(copy);


        //TODO: get implementation
        this.get();
    }

    constructor(props) {

        super(props);
        this.Modelos = this.listaModelosR();
        this.state = {
            modelo: this.Modelos[0],
            elementoToUpdateOrCreate: {},
            CreateOrUpdate: "None",
            page: 1,
            size: 20,
            listaDatos: [],
            elementosTotales: 0,
            filters: "",
            orden: {},
            filtros: {},
            checkList: [],
            listaOpciones: {}
        };
        this.get = this.get.bind(this);
        this.changeModel = this.changeModel.bind(this);
        //implemente all methods
        this.get();

    }



    renderTables() {
        let cont = 0;
        let items = [];
        this.Modelos.forEach(element => {
            // console.log(element);

            items.push(<div class="table_list">
                <input type="button" cont={cont} value={element.nombre} onClick={this.changeModel} />
            </div>);
            cont++;
        });
        return items;
    }

    changeseach(value) {
        let copy = this.state;
        copy.seach = value;
        this.setState(copy);

    }
    changeFilter(value, key) {
        let copy = this.state;
        copy.filtros["key"] = value;
        this.setState(copy);
        //implememnt get
        this.get();
    }

    searchGet() {
        this.get();
        //implement get
    }

    toCreate() {
        console.log(copy);
        let copy = this.state;
        copy.elementoToUpdateOrCreate = this.state.modelo.blank;
        copy.CreateOrUpdate = "Create";
        // implement options lis
        copy.listaOpciones = this.getOptionsList();
        console.log(copy);
        this.setState(copy);
    }

    check(position) {
        let copy = this.state;
        let index = copy.checkList.indexOf(position);
        if (index > -1) {
            copy.checkList.splice(index, 1);
        } else {
            copy.checkList.push(position);
        }
        this.setState(copy);

    }

    edit(position) {
        let copy = this.state;
        copy.elementoToUpdateOrCreate = copy.listaDatos[position];
        copy.CreateOrUpdate = "Update";
        // implement option list
        copy.listaOpciones = this.getOptionsList();
        this.setState(copy);
    }

    changeOrden(key) {
        let copy = this.state;
        if (this.state.orden[key] == undefined) {
            copy.orden[key] = -1;
        } else {
            if(this.state.orden[key] == -1){
                copy.orden[key] = copy.orden[key] * -1;
            }else{
                delete copy.orden[key];
            }
            
        }
        copy.page = 1;
        copy.size = 20;
        this.setState(copy);
        this.get();
        // implement get
    }

    pagination(page) {
        let copy = this.state;
        copy.page = page;
        this.setState(copy);
        this.get();
        // implement get
    }

    exitCreateUpdate() {
        let copy = this.state;
        copy.elementoToUpdateOrCreate = {};
        copy.CreateOrUpdate = "None";
        copy.listaOpciones = {};
        this.setState(copy);
    }

    changeData(tipo, path, value) {
        let copy = this.state;
        switch (tipo) {
            case "String":
                copy.elementoToUpdateOrCreate = insertValuePath(copy.elementoToUpdateOrCreate, path, value);
                break;
            case "Boolean":
                let valor = value == "true";
                copy.elementoToUpdateOrCreate = insertValuePath(copy.elementoToUpdateOrCreate, path, valor);
                break;
            case "Date":
                copy.elementoToUpdateOrCreate = insertValuePath(copy.elementoToUpdateOrCreate, path, value);
                break;
            case "Number":
                copy.elementoToUpdateOrCreate = insertValuePath(copy.elementoToUpdateOrCreate, path, parseFloat(value));
                break;

            default:
                break;
        }
        this.setState(copy);
    }

    insertInList(path) {
        let copy = this.state;

        let value = deepFind(this.state.elementoToUpdateOrCreate, path);
        let valuePush = deepFind(this.state.modelo.blank, path.concat(".#0"));
        value.push(valuePush);
        copy.elementoToUpdateOrCreate = insertValuePath(copy.elementoToUpdateOrCreate, path, value);

        this.setState(copy);
    }

    deleteInList(path, count) {
        let copy = this.state;
        let value = deepFind(this.state.elementoToUpdateOrCreate, path);

        value.splice(count, 1);
        copy.elementoToUpdateOrCreate = insertValuePath(copy.elementoToUpdateOrCreate, path, value);
        this.setState(copy);
    }

    render() {
        if (this.state.CreateOrUpdate == "None") {
            return (
                <div class="row">
                    <div class="col-2 costadoTablasMenu">
                        {this.renderTables()}
                    </div>
                    <div class="col-10 module">

                        <ModuloAdmin
                            changesearch={value => this.changeseach(value)}
                            seach={() => this.searchGet()}
                            create={() => this.toCreate()}
                            changeFilter={(value, key) => this.changeFilter(value, key)}
                            structure={this.state.modelo.modelo}
                            filters={this.state.filters}
                            listaDatos={this.state.listaDatos}
                            dbType={this.state.modelo.dbType}
                            check={position => this.check(position)}
                            edit={position => this.edit(position)}
                            delete={position => this.delete(position)}
                            changeOrden={key => this.changeOrden(key)}
                            pagination={page => this.pagination(page)}
                            size={this.state.size}
                            page={this.state.page}
                            totalcount={this.state.elementosTotales}
                            orden={this.state.orden}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div class="row">
                    <div class="col-2 costadoTablasMenu">
                        {this.renderTables()}
                    </div>
                    <div class="col-10 module">

                        <FormCreateOrUpdate
                            exitCreateOrUpdate={() => this.exitCreateUpdate()}
                            estructura={this.state.modelo.modelo}
                            dbType={this.state.modelo.dbType}
                            datos={this.state.elementoToUpdateOrCreate}
                            createObject={() => this.create()}
                            updateObject={() => this.update()}
                            typeFomr={this.state.CreateOrUpdate}
                            listaOpciones={this.state.listaOpciones}
                            handleFieldChange={(tipo, path, value) => this.changeData(tipo, path, value)}
                            insertList={() => this.insertInList(path)}
                            deleteInList={(newPath, count) => this.deleteInList(newPath, count)}
                        />
                    </div>
                </div>
            );

        }
    }
}

ReactDOM.render(<MasterPage />, document.getElementById('contenedorReact'));

function insertValuePath(obj, path, value) {
    let copy = obj;
    path = path.split(".");
    if (path == "") {
        return value;
    } else {

        if (path.length == 1) {
            if (path[0][0] == "#") {
                copy[parseInt(path[0].substring(1))] = insertValuePath(obj[parseInt(path[0].substring(1))],
                    "", value);
            } else {
                copy[path[0]] = insertValuePath(obj[path[0]], "", value);
            }
        } else {
            if (path[0][0] == "#") {
                copy[parseInt(path[0].substring(1))] = insertValuePath(obj[parseInt(path[0].substring(1))],
                    path.slice(1).join("."), value);
            } else {
                copy[path[0]] = insertValuePath(obj[path[0]], path.slice(1).join("."), value);
            }
        }
    }
    return copy;
}


function deepFind(obj, path) {
    var paths = path.split('.')
        , current = obj
        , i;

    for (i = 0; i < paths.length; ++i) {
        if (paths[i][0] == "#") {
            if (current[parseInt(paths[i].substring(1))] == undefined) {
                return undefined;
            } else {
                current = current[parseInt(paths[i].substring(1))];
            }
        } else {

            if (current[paths[i]] == undefined) {
                return undefined;
            } else {
                current = current[paths[i]];
            }
        }
    }
    return current;
}
