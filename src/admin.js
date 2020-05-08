

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
                let newkey = key.concat(".");
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
            <div class="searchBox">
                <button type="submit" onClick={this.props.search}><i class="fa fa-search"></i></button>
                <input type="text" placeholder={this.props.mensajeBuscar} onKeyUp={this.handleKeyUp} value={this.props.valorBusqueda} onChange={this.handleChange} name="search" />
            </div>
        )
    }
}


class ListObjects extends React.Component {

    renderTitle() {
        let keys = Object.keys(this.props.structure);

        keys.forEach(element => {
            if (this.props.orden[key] == 1) {
                return (
                    <div>
                        <div>{element}</div>
                        <input type="button" value="&#x2b61;" onClick={() => this.props.changeOrden(key)} />

                    </div>
                );
            } else {
                return (
                    <div>
                        <div>{element}</div>
                        <input type="button" value="&#x2b63;" onClick={() => this.props.changeOrden(key)} />

                    </div>
                );
            }

        });
    }

    renderall() {
        let cont = 0;
        this.props.listaDatos.forEach(element => {
            return (
                <ObjetoComplete
                    position={cont}
                    dbType={this.props.dbtype}
                    datos={element}
                    structure={this.props.structure}
                    handlefilter={dato, key => this.props.handleFilter(dato, key)}
                    checkObject={position => this.props.check(position)}
                    editObject={position => this.props.edit(position)}
                    deleteObject={position => this.props.delete(position)}
                />
            );
            count++;
        });
    }

    constructor(props) {
        super(props);

        this.renderall = this.renderall.bind(this);
        this.renderTitle = this.renderTitle.bind(this);
    }

    render() {
        return (
            <div class="containerObjects">
                <div class="titles">
                    {this.renderTitle}
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
                    return (
                        <input type="text" value={dato} name={key} onChange={this.handleChange} />
                    )
                }
            } else {
                let keys = Object.keys(element);
                let newKey = key.concat(".");
                keys.forEach(ele => {
                    this.renderStructure(element[ele], dato[ele], newKey.concat(ele));
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
                this.renderStructure(this.props.structure[key], this.props.filters[key], key.toString())
            )

        });
    }

    constructor(props) {
        super(props);

        this.renderAllFields = this.renderAllFields.bind(this);
        this.renderStructure = this.renderStructure.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                    <input type="button" value="Create" onClick={() => this.props.create(this.props.modelBlanck)} />
                </div>
                <div class="listaAndFilters">
                    <FilterGroup
                        handlefilter={value, key => this.props.changeFilter(value, key)}
                        structure={this.props.structure}
                        filters={this.props.filters}
                    />

                    <ListObjects
                        listaDatos={this.props.listaDatos}
                        dbtype={this.props.dbType}
                        structure={this.props.structure}
                        handleFilter={value, key => this.changeFilter(value, key)}
                        check={position => this.props.check(position)}
                        edit={position => this.props.edit(position)}
                        delete={position => this.props.delete(position)}
                        changeOrden={key => this.props.changeOrden(key)}
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

class CreateOrUpdateField extends React.Component {

    renderOptions(lista, select) {
        lista.forEach(element => {
            if (element.valor === select) {
                return (
                    <option value={element.valor} selected>{element.show}</option>
                )
            } else {
                return (
                    <option value={element.valor}>{element.show}</option>
                )
            }
        });
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

                    return (
                        <div class="campEditCreate">
                            <span>{newPath}</span>
                            <select name={path} tipo={estructura.type.name} class="selectfield" onChange={this.handleChange}>
                                {this.renderOptions(listaOpciones, dato)}
                            </select>
                        </div>

                    );
                    // se renderiz con opciones
                } else {
                    let tipo = estructura.type.name;
                    switch (tipo) {
                        case "String":
                            return (
                                <div>
                                    <span>{newPath}</span>
                                    <input type="text" tipo="String" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                </div>
                            );
                            break;
                        case "Boolean":

                            return (
                                <div>
                                    <span>{newPath}</span>
                                    <input type="checkbox" name={path} tipo="Boolean" value={newPath} class="checkboxfield" onChange={this.handleChangeC} />
                                </div>
                            );

                            break;
                        case "Number":
                            return (
                                <div>
                                    <span>{newPath}</span>
                                    <input type="text" tipo="Number" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                </div>
                            );
                            break;
                        case "Date":
                            return (
                                <div>
                                    <span>{newPath}</span>
                                    <input type="date" tipo="Date" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                </div>
                            );

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
                        <div class="campEditCreate">
                            <span>{newPath}</span>
                            <select name={path} tipo={estructura.modelType} class="selectfield" onChange={this.handleChange}>
                                {this.renderOptions(listaOpciones, dato)}
                            </select>
                        </div>
                    } else {
                        //se renderiza
                        switch (estructura.type.tipo) {
                            case "String":
                                return (
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="text" tipo="String" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                    </div>
                                );
                                break;
                            case "Boolean":
                                return (
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="checkbox" name={path} tipo="Boolean" value={newPath} class="checkboxfield" onChange={this.handleChangeC} />
                                    </div>
                                );

                                break;
                            case "Number":
                                return (
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="text" tipo="Number" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                    </div>
                                );
                                break;
                            case "Date":
                                return (
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="date" tipo="Date" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                    </div>
                                );

                                break;
                            default:
                                break;
                        }
                    }

                } else {
                    if (estructura.foreignKey) {
                        <div class="campEditCreate">
                            <span>{newPath}</span>
                            <select name={path} tipo={estructura.modelType} class="selectfield" onChange={this.handleChange}>
                                {this.renderOptions(listaOpciones, dato)}
                            </select>
                        </div>
                        //se renderiza con opciones
                    } else {
                        switch (estructura.type.tipo) {
                            case "String":
                                return (
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="text" tipo="String" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                    </div>
                                );
                                break;
                            case "Boolean":
                                return (
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="checkbox" name={path} tipo="Boolean" value={newPath} class="checkboxfield" onChange={this.handleChangeC} />
                                    </div>
                                );

                                break;
                            case "Number":
                                return (
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="text" tipo="Number" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                    </div>
                                );
                                break;
                            case "Date":
                                return (
                                    <div>
                                        <span>{newPath}</span>
                                        <input type="date" tipo="Date" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                    </div>
                                );

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
                return (
                    <CreateOrUpdateField
                        dbType={dbType}
                        dato={dato}
                        estructura={estructura}
                        path={path}
                        listaOpciones={listaOpcionesfeach}
                    />
                );
            } else {
                if (Array.isArray(estructura)) {
                    let cont = 0;
                    let title = path.split(".").slice(-1)[0]
                    items = [];
                    dato.forEach(element => {
                        let newPa = path.concat("#").concat(cont);
                        item.push(
                            <div class="objectInlist">
                                <button value="-" onClick={() => this.props.deleteInList(newPa)}></button>
                                {this.renderList("Mongo", estructura[0], dato[cont], newPa, listaOpcionesfeach[0])}

                            </div>);
                        cont++;
                    });
                    return (
                        <div>
                            <h3>{title}</h3>
                            <button value="+" onClick={() => this.props.insertList(path)}></button>
                            <div class="listaElementos">
                                {items}
                            </div>
                        </div>

                    );
                    // lista
                } else {
                    let newkeys = Object.keys(estructura);
                    newkeys.forEach(element => {
                        this.renderList(dbType, estructura, dato, path.concat(".").concat(element), listaOpcionesfeach[element]);
                    });

                    // objeto
                }
            }
        } else {
            // campo
            <CreateOrUpdateField
                dbType={dbType}
                dato={dato}
                estructura={estructura}
                path={path}
                listaOpciones={listaOpcionesfeach}
            />

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
                        <input type="button" value="x" onClick={()=> this.props.exitCreateOrUpdate()}/>
                        {this.renderList(this.props.dbType, this.props.estructura[element], this.props.datos[element], newkeys.toString(), this.props.listaOpciones[element])}
                        <button class="btn-crear" value="Create" onClick={this.props.createObject}></button>
                    </div>
                );
            } else {

                return (
                    <div class="formUpdateOrCreate">
                        <input type="button" value="x" onClick={()=> this.props.exitCreateOrUpdate()}/>
                        {this.renderList(this.props.dbType, this.props.estructura[element], this.props.datos[element], newkeys.toString(), this.props.listaOpciones[element])}
                        <button class="btn-update" value="update" onClick={this.props.updateObject}></button>
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
            urlname: "usuarioAdmin", dbType: "postgres", nombre: "adminUsers", modelo: {

                id_usuario: { type: "BIGSERIAL", primaryKey: true, name: "id_usuario", modelType: "Number" },
                username: { type: "VARCHAR(128)", speciaL: "UNIQUE", name: "username", modelType: "String" },
                password: { type: "VARCHAR(128)", name: "password", modelType: "String" }
            }, blanck: {

                id_usuario: null,
                username: null,
                password: null
            }
        });

    }

    create() {

    }

    get(urlname, dbType, filters, filtro, page, size, orden) {

        let params = {
            filters: filters,
            filtro: JSON.stringify(filtro),
            page: page,
            size: size,
            orden: JSON.stringify(orden),
        };

        if (dbType == "Mongo") {


        } else {

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

        let auxUrl = `/${urlname}/` + "?" + query;

        fetch(auxUrl, options_and_body)
            .then(res => res.json())
            .catch(error => console.log("error: ", error))
            .then(response => {
                console.log("success: ", response);

            });

    }

    update() {

    }

    delete() {

    }
    changeModel(cont) {
        let copy = this.state;
        copy.Model = Modelos[cont];
        copy.CreateOrUpdate = "None";
        this.setState(copy);


        //TODO: get implementation
    }

    constructor(props) {

        super(props);
        this.Modelos = this.listaModelosR();
        this.state = {
            modelo: Modelos[0],
            elementoToUpdateOrCreate: {},
            CreateOrUpdate: "None",
            page: 1,
            size: 20,
            listaDatos =[],
            elementosTotales = 0,

        };
        this.get = this.get.bind(this);
        this.changeModel = this.changeModel.bind(this);

    }



    renderTables() {
        let cont = 0;
        this.Modelos.forEach(element => {
            return (
                <div class="table_list">
                    <input type="button" value={element.name} onClick={() => this.changeModel(cont)} />
                </div>
            );
            cont++;
        });
    }

    render() {
        if (this.state.CreateOrUpdate == "None") {
            return (
                <div class="main">
                    <div class="costadoTablasMenu">
                        {this.renderTables}
                    </div>
                    <div class="module">
                        <ModuloAdmin 
                            changesearch={}
                            seach={}
                            
                        />
                    </div>
                </div>
            );
        } else {
            if (this.CreateOrUpdate == "Create") {

            } else {

            }

        }
    }
}