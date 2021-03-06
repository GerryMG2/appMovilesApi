
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
        console.log(this.props.path);
        console.log(typeof(variableText) == "boolean");
        if(typeof(variableText) == "boolean"){
            console.log("es booleano");
            return (
                <div class="ObjectFieldShow" onDoubleClick={() => this.props.ondclick(variableText, this.props.tipo, this.props.path)}>{variableText.toString() + ""}</div>
            )
        }else{
            return (
                <div class="ObjectFieldShow" onDoubleClick={() => this.props.ondclick(variableText, this.props.tipo, this.props.path)}>{variableText}</div>
            )
        }
        

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
        // console.log("manual:", `${dato} ${tipo} ${key}`)
        if (tipo == "Campo") {
            this.props.handlefilter(dato, key);
        }
    }

    renderStructure(element, dato, key) {
        // console.log("elemento:", element);
        // console.log("dato:", dato);
        console.log("keyP:", key);
        if (this.props.dbType == "Mongo") {
            if (Array.isArray(element) || element.type) {
                console.log("es un array o campo");
                let tipo = Array.isArray(element) ? "Lista" : "Campo";

                let item = [
                    <td>
                        <Field
                            datos={dato}
                            tipo={tipo}
                            path={key}
                            restricted={element.restricted ? element.restricted : ""}
                            security={element.security ? element.security : ""}
                            ondclick={(dato, tipo, key) => this.handlerManual(dato, tipo, key)}
                        />
                    </td>
                ];
                console.log(item);
                return item;

            } else {
                let items = [];
                let keys = Object.keys(element);
                let newkey = key.concat(".");
                keys.forEach(ele => {
                    items.push(...this.renderStructure(element[ele], dato[ele], newkey.concat(ele)));
                });

                return items;
            }
        } else {


            let item = [
                <td>
                    <Field
                        datos={dato}
                        tipo={"Campo"}
                        path={key}
                        restricted={element.restricted ? element.restricted : ""}
                        security={element.security ? element.security : ""}
                        ondclick={(dato, tipo, key) => this.handlerManual(dato, tipo, key)}
                    />
                </td>
            ];

            return item;

        }

    }

    renderChoice(position) {
        return (
            <th scope="row">
                <input type="checkbox" class="checkBoxSelect" onClick={() => this.props.checkObject(position)}></input>

            </th>
        )
    }

    renderEdit(position) {
        return (
            <td>
                <input type="button" class="editButton" onClick={() => this.props.editObject(position)}></input>

            </td>
        )
    }

    renderDelete(position) {
        return (
            <td>
                <input type="button" class="deleteButton" onClick={() => this.props.deleteObject(position)}></input>

            </td>
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
        // console.log("props:", props);
        this.renderStructure = this.renderStructure.bind(this);
        this.renderChoice = this.renderChoice.bind(this);
        this.renderEdit = this.renderEdit.bind(this);
        this.renderDelete = this.renderDelete.bind(this);
        this.renderAllFields = this.renderAllFields.bind(this);

    }
    render() {
        return (
            <tr class="ObjectComplete">
                {this.renderChoice(this.props.position)}
                {this.renderAllFields()}
                {this.renderEdit(this.props.position)}
                {this.renderDelete(this.props.position)}
            </tr>
        )
    }
}


class NavBarSeach extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
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
        items.push(
            <th scope="col">
                <div>&#x2B1A;</div>
            </th>
        );
        keys.forEach(element => {
            if (this.props.orden[element]) {
                if (this.props.orden[element] == 1) {
                    if (this.props.structure[element].type) {
                        items.push(<th scope="col" >

                            <div >
                                {element} <span type="button" class="bg-transparent badge" onClick={() => this.props.changeOrden(element)} >
                                    <i class="fas fa-sort-down"></i>
                                </span>
                            </div>




                        </th>);
                    } else {
                        items.push(<th scope="col">
                            <div>{element}</div>


                        </th>);
                    }
                } else {

                    if (this.props.structure[element].type) {
                        items.push(
                            <th scope="col" >

                                <div >{element}
                                    <span class="bg-transparent badge" type="button" onClick={() => this.props.changeOrden(element)} ><i class="fas fa-sort-up"></i></span>

                                </div>

                            </th>);
                    } else {
                        items.push(
                            <th scope="col">
                                <div>{element}</div>
                            </th>
                        );
                    }
                }



            } else {
                if (this.props.structure[element].type) {
                    items.push(
                        <th scope="col" >

                            <div >{element}
                                <span class="bg-transparent badge" type="button" onClick={() => this.props.changeOrden(element)} ><i class="fas fa-sort"></i></span>

                            </div>

                        </th>
                    );
                } else {
                    items.push(
                        <th scope="col">
                            <div>{element}</div>
                        </th>);
                }
            }

        });
        items.push(
            <th scope="col">
                <div><i class="fas fa-edit"></i></div>
            </th>
        )
        items.push(
            <th scope="col">
                <div><i class="fas fa-minus-circle"></i></div>
            </th>
        )

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

            <table class="table table-bordered containerObjects" id="DataList">
                <thead class="thead-dark" >
                    <tr>
                        {this.renderTitle()}
                    </tr>


                </thead>
                <tbody>
                    {this.renderall()}
                </tbody>

            </table>
        )
    }
}


class FilterGroup extends React.Component {

    handleChange(e) {

        this.props.handlefilter(e.target.value, e.target.name);

    }

    renderStructure(element, dato, key) {
        console.log("renderStructure:", element);
        console.log("renderStructure:", dato);
        console.log("renderStructure:", key);
        if (this.props.dbType == "Mongo") {
            console.log("elemento:", element);
            if (Array.isArray(element) || element.type) {
                console.log("elemento: array o campo", element);
                let tipo = Array.isArray(element) ? "Lista" : "Campo";
                if (tipo == "Campo") {
                    let items = [
                        <div class="badge badge-pill badge-secondary mx-1">
                            <input class="bg-transparent text-light change" style={{ border: "none" }} placeholder={key} type="text" value={dato} name={key} onChange={this.handleChange} />
                        </div>
                    ];
                    return items;
                } else {
                    let items = [<div>
                    </div>];
                    return items;

                }
            } else {
                console.log("elemento: objeto", element);
                let keys = Object.keys(element);
                let newKey = key.concat(".");
                let items = [];
                keys.forEach(ele => {
                    items.push(...this.renderStructure(element[ele], dato[ele], newKey.concat(ele)));
                });
                return items;
            }
        } else {
            let item = [<div class="badge badge-pill badge-secondary mx-1">
                <input type="text" class="bg-transparent text-light change" style={{ border: "none" }} placeholder={key} value={dato} name={key} onChange={this.handleChange} />
            </div>];
            return item;

        }

    }

    renderAllFields() {
        console.log("renderStructure:", this.props);
        let keysStructure = Object.keys(this.props.structure);
        let items = [];
        // items.push(<th scope="col"><i class="fas fa-border-none"></i></th>);
        keysStructure.forEach(key => {

            items.push(...this.renderStructure(this.props.structure[key], this.props.filters[key], key.toString()));


        });
        // items.push(<th scope="col"><i class="fas fa-border-none"></i></th>);
        // items.push(<th scope="col"><i class="fas fa-border-none"></i></th>);
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
            <nav class="nav py-1">
                {this.renderAllFields()}
            </nav>

        );
    }
}

class Pagination extends React.Component {

    handlePagination(page) {
        this.props.pagination(page);
    }

    renderPagination(size, page, total) {
        if (page === 1) {
            console.log("pagination: ", `total ${total} size ${size}`)
            if (size > total) {
                return (
                    <nav>
                        <ul class="pagination">
                            <li ><span>1-{size} de {total}</span></li>
                            {/* <li class="page-item"> <input type="button" class="page-link" name="anterior" value="" disabled /></li> */}

                        </ul>



                    </nav>
                );
            } else {
                return (
                    <nav>
                        <ul class="pagination">
                            <li><span>1-{size} de {total}</span></li>
                            <li class="page-item"><input class="page-link" type="button" name="anterior" value="" disabled /></li>
                            <li class="page-item"> <input type="button" class="page-link" name="siguiente" value="2" onClick={() => this.handlePagination(2)} /></li>
                        </ul>



                    </nav>)
            }

        } else {
            if (page === Math.ceil(total / size)) {
                let begin = (size * (page - 1)) + 1;
                let end = total;
                return (
                    <nav>
                        <ul class="pagination">
                            <li> <span>{begin}-{end} de {total}</span></li>
                            <li class="page-item"> <input type="button" class="page-link" name="anterior" value={page - 1} onClick={() => this.handlePagination(page - 1)} /></li>
                            <li class="page-item"><input type="button" class="page-link" name="siguiente" value={page + 1} disabled /></li>
                        </ul>



                    </nav>
                );
            } else {
                let begin = (size * (page - 1)) + 1;
                let end = size * page;
                return (
                    <nav>
                        <ul class="pagination">
                            <li><span>{begin}-{end} de {total}</span></li>
                            <li class="page-item"> <input type="button" class="page-link" name="anterior" value={page - 1} onClick={() => this.handlePagination(page - 1)} /></li>
                            <li class="page-item"> <input type="button" class="page-link" name="siguiente" value={page + 1} onClick={() => this.handlePagination(page + 1)} /></li>
                        </ul>



                    </nav>
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
        console.log("admin module: ", this.props.structure);
        return (
            <div class="containerModule">
                <NavBarSeach
                    changeSearch={value => this.props.changesearch(value)}
                    search={() => this.props.search()}
                    valorBusqueda={this.props.valorBusqueda}
                />
                <div>
                    <a href="/admin/logout">Cerrar Sesion</a>
                    <input type="button" class="btn btn-primary" value="Create" onClick={() => this.props.create()} />
                </div>
                <div class="listaAndFilters">
                    <FilterGroup
                        handlefilter={(value, key) => this.props.changeFilter(value, key)}
                        structure={this.props.structure}
                        filters={this.props.filters}
                        dbType={this.props.dbType}
                    />

                    <ListObjects
                        listaDatos={this.props.listaDatos}
                        dbtype={this.props.dbType}
                        structure={this.props.structure}
                        handleFilter={(value, key) => this.props.changeFilter(value, key)}
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
        
        let add = true;
        if (Array.isArray(lista)) {
            lista.forEach(element => {
                console.log("valor", element);
                if (element.save === select) {
                    console.log("lista opciones: select", element)
                    add = false;
                    console.log("entra en la opcionselect");

                    items.push(<option value={element.save} selected>{element.show}</option>);

                } else {

                    items.push(<option value={element.save}>{element.show}</option>);

                }
            });
        }
        if (add) {
            items.push(<option disabled selected value="">Seleccione una opcion</option>)
        }
        return items;
    }

    handleChange(e) {
        //tipo, path, valor
        console.log("valor:", e.target.value);
        this.props.handleFieldChange(e.target.getAttribute("tipo"), e.target.name, e.target.value);
    }
    handleChangeC(e) {
        this.props.handleFieldChange(e.target.getAttribute("tipo"), e.target.name, e.target.checked);
    }

    renderField(dbType, dato, estructura, path, listaOpciones) {
        console.log(`dbtype: ${dbType} dato: ${dato} path: ${path} listaOpiones${listaOpciones}`);
        if (dbType === "Mongo" && path != "_id") {
            let newPath = path.split(".").slice(-1)[0];
            if (estructura.type) {
                if (estructura.ref) {

                    let item = [
                        <div class="form-group" >
                            <label for={path}>{newPath}</label>
                            <select name={path} id={path} tipo={estructura.type.name} class="form-control" onChange={this.handleChange}>

                                {this.renderOptions(listaOpciones, dato)}
                            </select>
                        </div>];

                    return item;
                    // se renderiz con opciones
                } else {
                    let tipo = estructura.type.name;
                    let item;
                    switch (tipo) {
                        case "String":
                            item = [
                                <div class="form-group" >
                                    <label for={path}>{newPath}</label>
                                    <input type="text" tipo="String" name={path} id={path} class="form-control" value={dato} onChange={this.handleChange} />
                                </div>
                            ];
                            return item;
                            break;
                        case "Boolean":

                            item = [
                                <div class="form-group form-check" >
                                    <label for={path} class="form-check-label">{newPath}</label>
                                    <input type="checkbox" id={path} name={path} tipo="Boolean" defaultChecked={dato} value={dato} class="checkboxfield form-control" onChange={this.handleChangeC} />
                                </div>
                            ];
                            return item;
                            break;
                        case "Number":
                            item = [
                                <div class="form-group">
                                    <label for={path}>{newPath}</label>
                                    <input type="text" class="form-control" id={path} tipo="Number" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                </div>
                            ];
                            return item;
                            break;
                        case "Date":
                            item = [
                                <div class="form-group" >
                                    <label for={path}>{newPath}</label>
                                    <input type="date" id={path} tipo="Date" class="form-control" name={path} id="textfield" value={dato} onChange={this.handleChange} />
                                </div>
                            ];
                            return item;

                            break;
                        default:
                            break;
                    }
                }
            }
            // se renderiza
        } else if (dbType != "Mongo") {
            let newPath = path.split(".").slice(-1)[0];
            if (estructura.type != "BIGSERIAL") {
                if (estructura.primaryKey) {
                    if (estructura.foreignKey) {
                        //se renderiza con opciones
                        console.log("lista:");
                        let item = [
                            <div class="form-group" >
                                <label for={path}>{newPath}</label>
                                <select id={path} name={path} tipo={estructura.modelType} class="form-control selectfield" onChange={this.handleChange}>

                                    {this.renderOptions(listaOpciones, dato)}
                                </select>
                            </div>];
                        return item;
                    } else {
                        //se renderiza
                        let item;
                        switch (estructura.type.name) {
                            case "String":
                                item = [
                                    <div class="form-group" >
                                        <label for={path}>{newPath}</label>
                                        <input type="text" class="form-control" tipo="String" name={path} id={path} value={dato} onChange={this.handleChange} />
                                    </div>
                                ];
                                return item;
                                break;
                            case "Boolean":
                                item = [
                                    <div class="form-group form-check" >
                                        <label class="form-check-label" for={path}>{newPath}</label>
                                        <input type="checkbox" id={path} name={path} class="form-control" defaultChecked={dato} tipo="Boolean" value={dato} onChange={this.handleChangeC} />
                                    </div>
                                ];
                                return item;

                                break;
                            case "Number":
                                item = [
                                    <div class="form-group" >
                                        <label for={path}>{newPath}</label>
                                        <input type="text" tipo="Number" class="form-control" name={path} id={path} value={dato} onChange={this.handleChange} />
                                    </div>
                                ];
                                return item;
                                break;
                            case "Date":
                                item = [
                                    <div class="form-group" >
                                        <label for={path}>{newPath}</label>
                                        <input type="date" tipo="Date" class="form-control" name={path} id={path} value={dato} onChange={this.handleChange} />
                                    </div>
                                ];
                                return item;
                                break;
                            default:
                                break;
                        }
                    }

                } else {
                    if (estructura.foreignKey) {
                        let item = [
                            <div class="form-group" >
                                <label for={path}>{newPath}</label>
                                <select id={path} name={path} tipo={estructura.modelType} class="form-control" onChange={this.handleChange}>

                                    {this.renderOptions(listaOpciones, dato)}
                                </select>
                            </div>]
                        return item;
                        //se renderiza con opciones
                    } else {
                        let item;
                        switch (estructura.modelType) {
                            case "String":
                                console.log("entro string");
                                item = [
                                    <div class="form-group" >
                                        <label for={path}>{newPath}</label>
                                        <input type="text" tipo="String" class="form-control" name={path} id={path} value={dato} onChange={this.handleChange} />
                                    </div>]
                                    ;
                                return item;
                                break;
                            case "Boolean":
                                item = [
                                    <div class="form-group form-check">
                                        <label class="form-check-label" for={path}>{newPath}</label >
                                        <input type="checkbox" id={path} name={path} tipo="Boolean" defaultChecked={dato} value={newPath} class="form-control" onChange={this.handleChangeC} />
                                    </div>]
                                    ;
                                return item;

                                break;
                            case "Number":
                                item = [
                                    <div class="form-group" >
                                        <label for={path}>{newPath}</label>
                                        <input type="text" id={path} tipo="Number" name={path} class="form-control" value={dato} onChange={this.handleChange} />
                                    </div>]
                                    ;
                                return item;
                                break;
                            case "Date":
                                item = [
                                    <div class="form-group" >
                                        <label for={path}>{newPath}</label>
                                        <input type="date" class="form-control" tipo="Date" name={path} id={path} value={dato} onChange={this.handleChange} />
                                    </div>]
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
        console.log("props:field:", this.props);
        let item = [];
        item.push(this.renderField(this.props.dbType, this.props.dato, this.props.estructura, this.props.path, this.props.listaOpciones));
        console.log(item);
        return (

            item

        );
    }

}

class ListCreateOrUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.deleteInList = this.deleteInList.bind(this);
    }

    deleteInList(e) {
        console.log("target: ", e.target);
        this.props.deleteInList(e.target.name, parseInt(e.target.getAttribute("cont")));
    }


    render() {
        let item = [];
        var cont = 0;
        console.log("pelota: ", this.props);
        let title = this.props.path.split(".").slice(-1)[0]
        console.log("titulo:", title);
        console.log("nulo dato: ", this.props.dato);
        this.props.dato.forEach(ele => {
            if (this.props.estructura[0].type) {
                item.push(
                    <div class="container" >
                        <a class="btn btn-sm" name={this.props.path.concat(".#").concat(cont)} cont={cont} onClick={this.deleteInList}><i class="fas fa-minus-circle"></i></a>
                        <CreateOrUpdateField

                            dbType={this.props.dbType}
                            dato={this.props.dato[cont]}
                            estructura={this.props.estructura[0]}
                            path={this.props.path.concat(".#").concat(cont)}
                            listaOpciones={this.props.listaOpciones[0]}
                            handleFieldChange={(tipo, path, value) => this.props.handleFieldChange(tipo, path, value)}
                        />

                    </div>
                );
                //campo
            } else {
                if (Array.isArray(this.props.estructura[0])) {
                    // otra lista
                    item.push(
                        <div class="container" >
                            <a class="btn   btn-sm" cont={cont} name={this.props.path.concat(".#").concat(cont)} onClick={this.deleteInList}><i class="fas fa-minus-circle"></i></a>
                            <ListCreateOrUpdate

                                dbType={this.props.dbType}
                                dato={this.props.dato[cont]}
                                estructura={this.props.estructura[0]}
                                path={this.props.path.concat(".#").concat(cont)}
                                listaOpciones={this.props.listaOpciones[0]}
                                handleFieldChange={(tipo, path, value) => this.props.handleFieldChange(tipo, path, value)}
                                insertList={path => this.props.insertList(path)}
                                deleteInList={(path, cont) => this.props.deleteInList(path, cont)}
                            />

                        </div>
                    );
                } {
                    item.push(
                        <div class="container" >
                            <a class="btn   btn-sm" cont={cont} name={this.props.path.concat(".#").concat(cont)} onClick={this.deleteInList}><i class="fas fa-minus-circle"></i></a>
                            <ObjectFieldCreateOrUpdate

                                dbType={this.props.dbType}
                                dato={this.props.dato[cont]}
                                estructura={this.props.estructura[0]}
                                path={this.props.path.concat(".#").concat(cont)}
                                listaOpciones={this.props.listaOpciones[0]}
                                handleFieldChange={(tipo, path, value) => this.props.handleFieldChange(tipo, path, value)}
                                insertList={path => this.props.insertList(path)}
                                deleteInList={(path, cont) => this.props.deleteInList(path, cont)}
                            />

                        </div>
                    );
                    // otro objeto
                }
            }

            cont++;
        });

        return (
            <div class="form-group" key={this.props.path}>
                <label>{title}</label>
                <a class="btn btn-sm text-primary" onClick={() => this.props.insertList(this.props.path)}><i class="fas fa-plus"></i></a>
                <div class="container">
                    {item}
                </div>
            </div>
        )

    }
}

class ObjectFieldCreateOrUpdate extends React.Component {


    render() {
        let item = [];

        let keys = Object.keys(this.props.estructura);
        keys.forEach(ele => {
            if (this.props.estructura[ele].type) {

                item.push(
                    <CreateOrUpdateField

                        dbType={this.props.dbType}
                        dato={this.props.dato[ele]}
                        estructura={this.props.estructura[ele]}
                        path={this.props.path.concat(".").concat(ele)}
                        listaOpciones={this.props.listaOpciones[ele]}
                        handleFieldChange={(tipo, path, value) => this.props.handleFieldChange(tipo, path, value)}
                    />


                );
                // un campo
            } else {
                if (Array.isArray(this.props.estructura[ele])) {
                    // una lista

                    item.push(

                        <ListCreateOrUpdate

                            dbType={this.props.dbType}
                            dato={this.props.dato[ele]}
                            estructura={this.props.estructura[ele]}
                            path={this.props.path.concat(".").concat(ele)}
                            listaOpciones={this.props.listaOpciones[ele]}
                            handleFieldChange={(tipo, path, value) => this.props.handleFieldChange(tipo, path, value)}
                            deleteInList={(path, cont) => this.props.deleteInList(path, cont)}
                            insertList={path => this.props.insertList(path)}
                        />
                    );

                } else {
                    item.push(
                        <ObjectFieldCreateOrUpdate

                            dbType={this.props.dbType}
                            dato={this.props.dato[ele]}
                            estructura={this.props.estructura[ele]}
                            path={this.props.path.concat(".").concat(ele)}
                            listaOpciones={this.props.listaOpciones[ele]}
                            handleFieldChange={(tipo, path, value) => this.props.handleFieldChange(tipo, path, value)}
                            deleteInList={(path, cont) => this.props.deleteInList(path, cont)}
                            insertList={path => this.props.insertList(path)}
                        />
                    );
                    // otro objeto
                }
            }
        });

        return (
            <div class="form-group">
                {item}
            </div>
        );


    }
}

class FormCreateOrUpdate extends React.Component {




    render() {
        let newkeys = Object.keys(this.props.estructura);
        console.log("form:", this.props);

        let item = [];
        newkeys.forEach(element => {

            if (this.props.estructura[element].type) {
                item.push(
                    <CreateOrUpdateField

                        dbType={this.props.dbType}
                        dato={this.props.datos[element]}
                        estructura={this.props.estructura[element]}
                        path={element}
                        listaOpciones={this.props.listaOpciones[element]}
                        handleFieldChange={(tipo, path, value) => this.props.handleFieldChange(tipo, path, value)}
                    />
                );
            } else {
                if (Array.isArray(this.props.estructura[element])) {
                    item.push(
                        <ListCreateOrUpdate

                            dbType={this.props.dbType}
                            dato={this.props.datos[element]}
                            estructura={this.props.estructura[element]}
                            path={element}
                            listaOpciones={this.props.listaOpciones[element]}
                            handleFieldChange={(tipo, path, value) => this.props.handleFieldChange(tipo, path, value)}
                            deleteInList={(path, cont) => this.props.deleteInList(path, cont)}
                            insertList={path => this.props.insertList(path)}
                        />
                    );
                } else {
                    item.push(
                        <ObjectFieldCreateOrUpdate

                            dbType={this.props.dbType}
                            dato={this.props.datos[element]}
                            estructura={this.props.estructura[element]}
                            path={element}
                            listaOpciones={this.props.listaOpciones[element]}
                            handleFieldChange={(tipo, path, value) => this.props.handleFieldChange(tipo, path, value)}
                            deleteInList={(path, cont) => this.props.deleteInList(path, cont)}
                            insertList={path => this.props.insertList(path)}
                        />
                    );
                }
            }

            // items.push(this.renderList(this.props.dbType, this.props.estructura[element], this.props.datos[element], element.toString(), this.props.listaOpciones[element]));
        });
        // console.log("items form:", items);
        if (this.props.typeFomr == "Create") {

            return (
                <div class="form-group">
                    <a type="button" onClick={() => this.props.exitCreateOrUpdate()}>Salir < i class="fas fa-sign-out-alt"></i></a>
                    {item}
                    <button class="btn btn-success" value="Create" onClick={() => this.props.createObject()}>Save.</button>
                </div>
            );
        } else {

            return (
                <div class="form-group">
                    <a type="button" onClick={() => this.props.exitCreateOrUpdate()} >Salir <i class="fas fa-sign-out-alt"></i></a>
                    {item}
                    <button class="btn btn-success" value="update" onClick={() => this.props.updateObject()}>Update.</button>
                </div>
            );
        }

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
                lanzamiento_pago: [{ type: String, ref: "lanzamiento", fieldsave: "_id", fieldShow: "_id" }],
                preguntas: [{
                    encabezado: { type: String, require: true },
                    tipo: { type: String, required: true },
                    pregunta_abierta: { type: Boolean, required: true },
                    multi_respuesta: { type: Boolean, required: true },
                    requiere: { type: Boolean },
                    opciones: [{ titulo_opcion: { type: String } }]
                }]
            }, blank: {
                _id: null,
                usuario: null,
                nombre_encuesta: null,
                descrip_encuesta: null,
                ip_disp: null,
                lanzamiento_pago: [null],

                preguntas: [{
                    encabezado: null,
                    tipo: null,
                    pregunta_abierta: false,
                    multi_respuesta: false,
                    requiere: false,
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
                tags_publico: [{ type: String }],
                cantidad_respuesta: { type: Number, required: true },
                encuesta_terminada: { type: Boolean, required: true },
                costo: { type: Number }
            }, blank: {
                _id: null,
                usuario: null,
                encuesta: null,
                cantidad_usuario: null,
                pagada: false,
                tags_publico: [null],
                cantidad_respuesta: null,
                encuesta_terminada: false,
                costo: null
            }
        });

        listaM.push({
            urlname: "notificacion", dbType: "Mongo", nombre: "notificacion", modelo: {
                _id: { type: String },
                usuario: { type: String, ref: "usuario", fieldsave: "_id", fieldShow: "nombre" },
                encuesta: { type: String, ref: "encuesta", fieldsave: "_id", fieldShow: "nombre_encuesta" },
                descripcion: { type: String, required: true },
                tipo_notificacion: { type: String, required: true },
                eliminada: { type: Boolean, required: true },
                date: { type: Date, required: true },
                vista: { type: Boolean, required: true }
            }, blank: {
                _id: null,
                usuario: null,
                encuesta: null,
                descripcion: null,
                tipo_notificacion: null,
                eliminada: false,
                date: null,
                vista: false
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
                pagada: false,
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
                ciudad: { type: String, required: true },
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
                ciudad: null,
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
                id_pais: { type: "BIGINT", name: "id_pais", foreignKey: true, ref: "pais", refField: "id_pais", fieldShow: "nombre", commentForeign: "id_pais_fk", modelType: "Number" },
                nombre: { type: "VARCHAR(100)", name: "nombre", modelType: "String" }


            }, blank: {

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

            }, blank: {

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

                id_encuesta: { type: "BIGSERIAL", primaryKey: true, name: "id_encuesta", modelType: "Number" },
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

                id_factura: { type: "BIGSERIAL", name: "id_factura", modelType: "Number", primaryKey: true },
                id_cuenta: { type: "BIGINT", name: "id_cuenta", fieldShow: "nombre", foreignKey: true, ref: "cuenta", refField: "id_cuenta", commentForeign: "id_cuenta_fk", modelType: "Number" },
                fecha: { type: "DATE", name: "fecha", modelType: "Date" },
                anulado: { type: "BOOLEAN", name: "anulado", modelType: "Boolean" },
                id_tipo_pago: { type: "BIGINT", name: "id_tipo_pago", fieldShow: "descripcion_pago", foreignKey: true, ref: "tipo_pago", refurl: "tipoPago", refField: "id_pago", commentForeign: "id_tipo_pago_fk", modelType: "Number" }


            }, blank: {

                id_factura: null,
                id_cuenta: null,
                fecha: null,
                anulado: false,
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
            }, blank: {

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


        let body = {};
        if (this.state.modelo.dbType == "Mongo") {
            body = _.cloneDeep(this.state.elementoToUpdateOrCreate);
            delete body["_id"];

        } else {
            let keys = Object.keys(this.state.modelo.modelo);
            let newModel = {};

            keys.forEach(ele => {
                console.log(ele);
                console.log(!(this.state.modelo.modelo[ele].type == "BIGSERIAL"));
                if (!(this.state.modelo.modelo[ele].type == "BIGSERIAL")) {

                    newModel[ele] = this.state.elementoToUpdateOrCreate[ele];
                }

            });

            body = newModel;

        }
        console.log(body);
        options_and_body["body"] = JSON.stringify({ model: body });

        let prefix = "";
        if (this.state.modelo.dbType == "Mongo") {
            prefix = "/api";
        } else {
            prefix = "/apit";
        }

        let auxUrl = `${prefix}/${this.state.modelo.urlname}/`;
        fetch(auxUrl, options_and_body)
            .then(res => res.json())
            .catch(error => {
                console.log("error: ");
                swal("Hubo un problema para crear el objet", "error", "error");
            })
            .then(response => {
                if (response.correct) {
                    console.log("success: ", response);
                    swal("Se creo correctamente", "Continua", "success");
                } else {
                    swal("Hubo un problema para crear el objet", "Server Error", "error");
                }

            })
            .then(() => {
                let copy = {};
                copy["elementoToUpdateOrCreate"] = {};
                copy["CreateOrUpdate"] = "None";
                copy["listaOpciones"] = {};
                this.setState(copy, () => { this.get(); });

            });

    }

    recursiveOptionList(estructura, params, path) {
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


            let auxUrl;
            if (estructura.refurl) {
                auxUrl = `api/${estructura.refurl}/` + "?" + query;
            } else {
                auxUrl = `api/${estructura.ref}/` + "?" + query;
            }
            fetch(auxUrl, options_and_body)
                .then(res => res.json())
                .catch(error => console.log("error: ", error))
                .then(response => {
                    console.log("response: ", response);
                    if (response.count > 0) {
                        console.log("response: ", response);
                        let mapita = response.docs.map(obj => {
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
                        this.changeListOptions(path, mapita);
                    } else {

                    }


                });

        } else {
            if (Array.isArray(estructura)) {
                //

                this.recursiveOptionList(estructura[0], params, path.concat(".#0"));

            } else {
                if (!estructura.type) {
                    // objeto

                    let newkeys = Object.keys(estructura);
                    newkeys.forEach(ele => {
                        this.recursiveOptionList(estructura[ele], params, path.concat(".").concat(ele));
                    });

                }
            }
        }


    }

    getOptionsList() {
        console.log("getting list");
        let prefix = "";
        let params = {};
        let blank = _.cloneDeep(this.state.modelo.blank);
        if (this.state.modelo.dbType == "Mongo") {
            params = {
                filters: "",
                filtro: JSON.stringify({}),
                pag: 1,
                size: 0,
                orden: JSON.stringify({}),
            };
            prefix = "/api"
        } else {
            params = {
                filters: "",
                filtro: JSON.stringify({}),
                pag: 1,
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
                    let auxUrl;
                    if (this.state.modelo.modelo[element].refurl) {
                        auxUrl = `${prefix}/${this.state.modelo.modelo[element].refurl}/` + "?" + query;
                    } else {
                        auxUrl = `${prefix}/${this.state.modelo.modelo[element].ref}/` + "?" + query;
                    }




                    fetch(auxUrl, options_and_body)
                        .then(res => res.json())
                        .catch(error => console.log("error: ", error))
                        .then(response => {
                            console.log("success: ", response);
                            if (response.correct) {

                                let mapita = response.docs.map(obj => {
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
                                this.changeListOptions(element, mapita);
                            } else {

                            }

                        });

                } else {
                    if (Array.isArray(element)) {
                        console.log("es un array");
                        this.recursiveOptionList(this.state.modelo.modelo[element][0], params, element.concat(".#0"))
                    } else {
                        if (!this.state.modelo.modelo[element].type) {
                            console.log("es un objeto");
                            let keysI = Object.keys(this.state.modelo.modelo[element]);

                            keysI.forEach(ele => {
                                this.recursiveOptionList(this.state.modelo.modelo[element][ele], params, element.concat(".").concat(ele));
                            });
                        }
                    }
                }
            } else {
                if (this.state.modelo.modelo[element].ref) {
                    // no tiene referencias
                    console.log("response")
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


                    let auxUrl;
                    if (this.state.modelo.modelo[element].refurl) {
                        auxUrl = `${prefix}/${this.state.modelo.modelo[element].refurl}/` + "?" + query;
                    } else {
                        auxUrl = `${prefix}/${this.state.modelo.modelo[element].ref}/` + "?" + query;
                    }

                    fetch(auxUrl, options_and_body)
                        .then(res => res.json())
                        .catch(error => console.log("error: ", error))
                        .then(response => {
                            console.log(response);
                            let mapita = response.docs.map(obj => {
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
                            console.log("elemento:", element);

                            this.changeListOptions(element, mapita);
                        });
                } {
                    // no hace nada
                }
                //[{null, []}]

            }
        });





    }

    get() {
        let copy = _.cloneDeep(this.state);
        console.log("get copy", copy);
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
        console.log("params:", params);
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
                if (this.state.modelo.modelo[ele].primaryKey) {
                    newkey[ele] = this.state.elementoToUpdateOrCreate[ele];
                } else {
                    newModel[ele] = this.state.elementoToUpdateOrCreate[ele];
                }

            });
            body.id = newkey;
            body.model = newModel;

        }
        console.log(body);

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
                console.log("error: ", "Error");
                swal("Hubo un problema para actualizar", "Error", "error");
            })
            .then(response => {
                if (response.correct) {
                    console.log("success: ", response);
                    swal("actualizado", "Continua", "success");
                } else {
                    console.log("success: ", response);
                    swal("Hubo un problema para actualizar", "Error", "error");
                }

            })
            .then(() => {
                let copy = _.cloneDeep(this.state);
                copy.elementoToUpdateOrCreate = {};
                copy.CreateOrUpdate = "None";
                copy.listaOpciones = {};
                this.setState(copy, () => { this.get(); });


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
            console.log("entra en postgres");
            let idcond = {};
            let keyModel = Object.keys(this.state.modelo.modelo);
            keyModel.forEach(element => {
                if (this.state.modelo.modelo[element].primaryKey) {
                    idcond[element] = this.state.listaDatos[position][element];
                }
            });

            console.log("cond: ", idcond);
            options_and_body["body"] = JSON.stringify({
                id: idcond
            });

        }
        console.log(options_and_body);
        let url = `${prefix}/${this.state.modelo.urlname}/`;
        fetch(url, options_and_body)
            .then(res => res.json())
            .catch(error => {
                console.log("error: ", error);
                swal("Error al eliminar.", error, "error");
            })
            .then(response => {
                if (response.correct) {
                    console.log("success: ", response);
                    swal(response.msg, "Continua", "success");
                } else {
                    console.log("error: ", response);
                    swal(response.msg, "Error", "error");
                }

            })
            .then(() => { })
            .then(() => {
                // implement get
                this.get();
            });
    }

    changeModel(e) {
        console.log("copia: ", this.Modelos[e.target.getAttribute("cont")]);
        console.log(e.target);
        let copy = {};
        copy["modelo"] = _.cloneDeep(this.Modelos[e.target.getAttribute("cont")]);
        copy["CreateOrUpdate"] = "None";
        copy["elementoToUpdateOrCreate"] = {};
        copy["filtros"] = {};
        copy["filters"] = "";
        copy["orden"] = {};
        copy["listaDatos"] = [];
        copy["page"] = 1;
        copy["size"] = 20;
        copy["elementosTotales"] = 0;
        copy["checkList"] = [];
        copy["listaOpciones"] = {};

        this.setState(copy, () => { this.get() });


        //TODO: get implementation

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
        console.log("estate", this.state);
        //implemente all methods
        this.get();

    }



    renderTables() {
        let cont = 0;
        let items = [];
        this.Modelos.forEach(element => {
            // console.log(element);
            if (this.state.modelo.nombre == element.nombre && this.state.modelo.dbType == element.dbType) {
                items.push(
                    <a type="button" class="list-group-item list-group-item-action list-group-item-light active" cont={cont} value={element.nombre} onClick={this.changeModel}>{element.nombre}</a>
                );
            } else {
                items.push(
                    <a type="button" class="list-group-item list-group-item-action list-group-item-light" cont={cont} value={element.nombre} onClick={this.changeModel}>{element.nombre}</a>
                );
            }

            cont++;
        });
        return items;
    }

    changeseach(value) {
        let copy = _.cloneDeep(this.state);
        copy.filters = value;
        this.setState(copy);

    }
    changeFilter(value, key) {
        let copy = _.cloneDeep(this.state);
        if (key.split(".").length > 1) {
            if (value.toString().trim() == "") {
                copy.filtros = deleteObjPath(copy.filtros, key);
            } else {
                copy.filtros = createInsertObject(copy.filtros, key, value);
            }
        } else {
            if (value.toString().trim() == "") {
                delete copy.filtros[key];
            } else {
                copy.filtros[key] = value;
            }
        }



        this.setState(copy, () => { this.get(); });
        //implememnt get

    }

    searchGet() {
        this.get();
        //implement get
    }

    toCreate() {
        console.log("copia2:", this.state.modelo.blank);
        let copy = {};

        copy["elementoToUpdateOrCreate"] = _.cloneDeep(this.state.modelo.blank);
        copy["listaOpciones"] = _.cloneDeep(this.state.modelo.blank);
        copy["CreateOrUpdate"] = "Create";
        // implement options lis
        // this.getOptionsList();

        this.setState(copy, () => {
            this.getOptionsList();
        });






    }

    check(position) {
        let copy = _.cloneDeep(this.state);
        let index = copy.checkList.indexOf(position);
        if (index > -1) {
            copy.checkList.splice(index, 1);
        } else {
            copy.checkList.push(position);
        }
        this.setState(copy);

    }

    edit(position) {
        let copy = {}
        copy["elementoToUpdateOrCreate"] = _.cloneDeep(this.state.listaDatos[position]);
        copy["listaOpciones"] = _.cloneDeep(this.state.modelo.blank);
        copy["CreateOrUpdate"] = "Update";
        // implement option list

        this.setState(copy, () => {
            this.getOptionsList();
        });
    }

    changeOrden(key) {
        let copy = _.cloneDeep(this.state);
        if (this.state.orden[key] == undefined) {
            copy.orden[key] = -1;
        } else {
            if (this.state.orden[key] == -1) {
                copy.orden[key] = copy.orden[key] * -1;
            } else {
                delete copy.orden[key];
            }

        }
        copy.page = 1;
        copy.size = 20;
        this.setState(copy, () => { { this.get(); } });

        // implement get
    }

    pagination(page) {
        let copy = _.cloneDeep(this.state);
        copy.page = page;
        this.setState(copy, () => { this.get(); });

        // implement get
    }

    exitCreateUpdate() {
        let copy = _.cloneDeep(this.state);
        copy.elementoToUpdateOrCreate = {};
        copy.CreateOrUpdate = "None";
        copy.listaOpciones = {};
        this.setState(copy);
    }

    changeData(tipo, path, value) {
        console.log("change data:", path);
        console.log("change data:", value);
        console.log("change data:", tipo);

        let copy = {};
        copy["elementoToUpdateOrCreate"] = _.cloneDeep(this.state.elementoToUpdateOrCreate);
        let eletoCreate = _.cloneDeep(this.state.elementoToUpdateOrCreate);
        console.log("change data:", this.state);
        switch (tipo) {
            case "String":
                copy["elementoToUpdateOrCreate"] = insertValuePath(eletoCreate, path, value);
                break;
            case "Boolean":

                copy["elementoToUpdateOrCreate"] = insertValuePath(eletoCreate, path, value);
                break;
            case "Date":
                copy["elementoToUpdateOrCreate"] = insertValuePath(eletoCreate, path, value);
                break;
            case "Number":
                let valor = 0;
                try {
                    if (value == "") {
                        valor = 0;
                    } else {
                        if (isNaN(parseFloat(value))) {
                            valor = 0
                        } else {
                            if (value.slice(-1) == ".") {
                                valor = value;
                            } else {
                                if (value.split(".").length == 2) {
                                    if (parseInt(value.split(".")[1]) > 0) {
                                        valor = parseFloat(value);
                                    } else {
                                        console.log("entro aqui");
                                        if (parseInt(value.split(".")[1]) == 0) {
                                            valor = value;
                                        } else {
                                            valor = parseFloat(value);
                                        }

                                    }
                                } else {
                                    valor = parseFloat(value);
                                }

                            }

                        }
                    }
                } catch (error) {
                    console.log("error number: ", error);
                    valor = 0;
                }

                copy["elementoToUpdateOrCreate"] = insertValuePath(eletoCreate, path, valor);
                break;

            default:
                break;
        }
        this.setState(copy);
    }

    changeListOptions(path, value) {
        console.log(`change lista options: ${path} ${value}`);
        console.log("change lista options:", this.state.listaOpciones);
        let copy = {};
        copy["listaOpciones"] = _.cloneDeep(this.state.listaOpciones);
        console.log("copia3:", this.state);
        let listaOpciones = _.cloneDeep(this.state.listaOpciones);
        copy["listaOpciones"] = insertValuePath(listaOpciones, path, value);
        this.setState(copy);
    }

    insertInList(path) {
        let copy = {};
        console.log("insertIntLIst: ", this.state);
        copy["elementoToUpdateOrCreate"] = _.cloneDeep(this.state.elementoToUpdateOrCreate);
        let elementoToUpdateOrCreate = _.cloneDeep(this.state.elementoToUpdateOrCreate);
        let value = deepFind(elementoToUpdateOrCreate, path);
        let modeloBlank = _.cloneDeep(this.state.modelo.blank);
        let valuePush = deepFind(modeloBlank, path.concat(".#0"));
        console.log("value push:", valuePush);
        value.push(valuePush);
        copy["elementoToUpdateOrCreate"] = insertValuePath(elementoToUpdateOrCreate, path, value);
        console.log("copy:", copy);
        this.setState(copy);
    }

    deleteInList(path, count) {
        console.log("delete in list: ", path);
        console.log("delete in list: ", count);
        let copy = {};
        console.log("delete copy: ", copy);
        copy["elementoToUpdateOrCreate"] = _.cloneDeep(this.state.elementoToUpdateOrCreate);
        let elementoToUpdateOrCreate = _.cloneDeep(this.state.elementoToUpdateOrCreate);
        let value = deepFind(elementoToUpdateOrCreate, path.split(".").slice(0, -1).join("."));

        value.splice(count, 1);
        copy["elementoToUpdateOrCreate"] = insertValuePath(elementoToUpdateOrCreate, path.split(".").slice(0, -1).join("."), value);
        console.log("delete copy: ", copy);
        this.setState(copy);
    }




    render() {
        console.log("master page: ", this.state.modelo.modelo);
        if (this.state.CreateOrUpdate == "None") {
            return (
                <div class="row">
                    <div class="col-2 list-group leftTable pr-0"  >
                        {this.renderTables()}
                    </div>
                    <div class="col-10 module leftTable">

                        <ModuloAdmin
                            valorBusqueda={this.state.filters}
                            changesearch={value => this.changeseach(value)}
                            search={() => this.searchGet()}
                            create={() => this.toCreate()}
                            changeFilter={(value, key) => this.changeFilter(value, key)}
                            structure={this.state.modelo.modelo}
                            filters={this.state.filtros}
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
                    <div class="col-2 list-group leftTable pr-0"  >
                        {this.renderTables()}
                    </div>
                    <div class="col-10 module leftTable pr-0">

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
                            insertList={(path) => this.insertInList(path)}
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
    let copy;
    if (Array.isArray(obj)) {
        copy = obj.slice()
    } else {
        copy = _.cloneDeep(obj);
    }

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
        , current = Array.isArray(obj) ? obj.slice() : _.cloneDeep(obj)
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

function createInsertObject(obj, path, value) {
    console.log(path);
    if (path == "") {
        return value;
    } else {
        obj[path.split(".")[0]] = createInsertObject(obj[path.split(".")[0]] ? obj[path.split(".")[0]] : {}, path.split(".").slice(1).join("."), value);
        return obj;
    }
}

function deleteInObject(obj, path) {


    if (path.split(".").length == 1) {
        delete obj[path];
        // console.log(obj);

        return obj;
    } else {
        obj[path.split(".")[0]] = deleteInObject(obj[path.split(".")[0]], path.split(".").slice(1).join("."));
        return obj;
    }

}

function deleteObjPath(obj, path) {

    for (let i = 0; i < path.split(".").length; i++) {
        obj = deleteInObject(obj, path.split(".").reverse().slice(i).reverse().join("."));
    };
    return obj;
}