var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Field = function (_React$Component) {
    _inherits(Field, _React$Component);

    function Field() {
        _classCallCheck(this, Field);

        return _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).apply(this, arguments));
    }

    _createClass(Field, [{
        key: "render",
        value: function render() {
            console.log("Field:");
            var variableText = "";
            switch (this.props.tipo) {
                case "Lista":
                    variableText = this.props.datos.length + " Elementos";
                    break;
                case "Campo":
                    if (this.props.restricted == "password") {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = this.props.datos[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var iterator = _step.value;

                                variableText += "*";
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    } else if (this.props.restricted == "card") {
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator3 = this.props.datos[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator3.next()).done); _iteratorNormalCompletion2 = true) {
                                var _iterator2 = _step2.value;

                                variableText += "#";
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator3.return) {
                                    _iterator3.return();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
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

            return React.createElement(
                "div",
                { "class": "ObjectFieldShow", onDoubleClick: this.props.ondclick },
                variableText
            );
        }
    }]);

    return Field;
}(React.Component);

var transaccion_detalle = {

    id_tran_detail: { type: "BIGSERIAL", primaryKey: true, name: "id_tran_detalle", modelType: "Number" },
    id_factura: { type: "BIGINT", name: "id_factura", foreignKey: true, ref: "factura", refField: "id_factura", commentForeign: "id_factura_fk", modelType: "Number" },
    id_servicio: { type: "BIGINT", name: "id_servicio", foreignKey: true, ref: "servicio", refField: "id_servicio", commentForeign: "id_servicio_fk", modelType: "Number" },
    id_documento: { type: "BIGINT", name: "id_documento", foreignKey: true, ref: "documento", refField: "id_documento", commentForeign: "id_documento_fk", modelType: "Number" },
    costo: { type: "MONEY", name: "costo", modelType: "Number" },
    monto: { type: "MONEY", name: "monto", modelType: "Number" },
    descuento: { type: "MONEY", name: "descuento", modelType: "Number" },
    monto_con_descuento: { type: "MONEY", name: "monto_con_descuento", modelType: "Number" },
    id_descuento: { type: "BIGINT", name: "id_descuento", foreignKey: true, ref: "descuento", refField: "id_descuento", commentForeign: "id_descuento_fk", modelType: "Number" }
    // keys = ["usuario", "nombre_encuesta",....]
};var ejemplo = {
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
};

var ObjetoComplete = function (_React$Component2) {
    _inherits(ObjetoComplete, _React$Component2);

    _createClass(ObjetoComplete, [{
        key: "handlerManual",
        value: function handlerManual(dato, tipo, key) {
            if (tipo == "Campo") {
                this.props.handlefilter(dato, key);
            }
        }
    }, {
        key: "renderStructure",
        value: function renderStructure(element, dato, key) {
            var _this3 = this;

            // console.log("elemento:", element);
            // console.log("dato:", dato);
            // console.log("key:", key);
            if (this.props.dbType == "Mongo") {
                if (Array.isArray(element) || element.type) {
                    console.log("es un array o campo");
                    var tipo = Array.isArray(element) ? "Lista" : "Campo";
                    var item = [React.createElement(Field, {
                        datos: dato,
                        tipo: tipo,
                        restricted: element.restricted ? element.restricted : "",
                        security: element.security ? element.security : "",
                        ondclick: function ondclick() {
                            return _this3.handlerManual(dato, tipo, key);
                        }
                    })];
                    console.log(item);
                    return item;
                } else {
                    var _items = [];
                    var keys = Object.keys(element);
                    var newkey = key.concat(".");
                    keys.forEach(function (ele) {
                        _items.push.apply(_items, _toConsumableArray(_this3.renderStructure(element[ele], dato[ele], newkey.concat(ele))));
                    });
                    console.log(_items);
                    return _items;
                }
            } else {

                var _item = [React.createElement(Field, {
                    datos: dato,
                    tipo: "Campo",
                    restricted: element.restricted ? element.restricted : "",
                    security: element.security ? element.security : "",
                    ondclick: function ondclick() {
                        return _this3.props.handlefilter(dato, key);
                    }
                })];
                console.log(_item);
                return _item;
            }
        }
    }, {
        key: "renderChoice",
        value: function renderChoice(position) {
            var _this4 = this;

            return React.createElement("input", { scope: "row", type: "checkbox", "class": "checkBoxSelect", onClick: function onClick() {
                    return _this4.props.checkObject(position);
                } });
        }
    }, {
        key: "renderEdit",
        value: function renderEdit(position) {
            var _this5 = this;

            return React.createElement("input", { type: "button", "class": "editButton", onClick: function onClick() {
                    return _this5.props.editObject(position);
                } });
        }
    }, {
        key: "renderDelete",
        value: function renderDelete(position) {
            var _this6 = this;

            return React.createElement("input", { type: "button", "class": "deleteButton", onClick: function onClick() {
                    return _this6.props.deleteObject(position);
                } });
        }
    }, {
        key: "renderAllFields",
        value: function renderAllFields() {
            var _this7 = this;

            var keysStructure = Object.keys(this.props.structure);
            var items = [];
            keysStructure.forEach(function (key) {

                items.push.apply(items, _toConsumableArray(_this7.renderStructure(_this7.props.structure[key], _this7.props.datos[key], key.toString())));
            });
            console.log("fields:", items);
            return items;
        }
    }]);

    function ObjetoComplete(props) {
        _classCallCheck(this, ObjetoComplete);

        var _this2 = _possibleConstructorReturn(this, (ObjetoComplete.__proto__ || Object.getPrototypeOf(ObjetoComplete)).call(this, props));

        _this2.renderStructure = _this2.renderStructure.bind(_this2);
        _this2.renderChoice = _this2.renderChoice.bind(_this2);
        _this2.renderEdit = _this2.renderEdit.bind(_this2);
        _this2.renderDelete = _this2.renderDelete.bind(_this2);
        _this2.renderAllFields = _this2.renderAllFields.bind(_this2);

        return _this2;
    }

    _createClass(ObjetoComplete, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { "class": "ObjectComplete" },
                this.renderChoice(this.props.position),
                this.renderAllFields(),
                this.renderEdit(this.props.position),
                this.renderDelete(this.props.position)
            );
        }
    }]);

    return ObjetoComplete;
}(React.Component);

var NavBarSeach = function (_React$Component3) {
    _inherits(NavBarSeach, _React$Component3);

    function NavBarSeach(props) {
        _classCallCheck(this, NavBarSeach);

        var _this8 = _possibleConstructorReturn(this, (NavBarSeach.__proto__ || Object.getPrototypeOf(NavBarSeach)).call(this, props));

        _this8.handleChange = _this8.handleChange.bind(_this8);
        return _this8;
    }

    _createClass(NavBarSeach, [{
        key: "handleChange",
        value: function handleChange(e) {
            this.props.changeSearch(e.target.value);
        }
    }, {
        key: "handleKeyUp",
        value: function handleKeyUp(e) {
            if (e.key == "Enter") {
                this.props.search();
            }
            e.preventDefault();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { "class": "navbar navbar-light bg-light" },
                React.createElement(
                    "div",
                    { "class": "form-inline" },
                    React.createElement("input", { type: "search", "class": "form-control mr-sm-2", placeholder: this.props.mensajeBuscar, onKeyUp: this.handleKeyUp, value: this.props.valorBusqueda, onChange: this.handleChange, name: "search" }),
                    React.createElement(
                        "button",
                        { type: "submit", onClick: this.props.search, "class": "btn btn-outline-success my-2 my-sm-0" },
                        React.createElement("i", { "class": "fas fa-search" })
                    )
                )
            );
        }
    }]);

    return NavBarSeach;
}(React.Component);

var ListObjects = function (_React$Component4) {
    _inherits(ListObjects, _React$Component4);

    _createClass(ListObjects, [{
        key: "renderTitle",
        value: function renderTitle() {
            var _this10 = this;

            var keys = Object.keys(this.props.structure);
            var items = [];
            console.log(keys);
            keys.forEach(function (element) {
                if (_this10.props.orden[element]) {
                    if (_this10.props.orden[element] == 1) {
                        if (_this10.props.structure[element].type) {
                            items.push(React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "div",
                                    null,
                                    element
                                ),
                                React.createElement("input", { type: "button", value: "\u2B63", onClick: function onClick() {
                                        return _this10.props.changeOrden(element);
                                    } })
                            ));
                        } else {
                            items.push(React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "div",
                                    null,
                                    element
                                )
                            ));
                        }
                    } else {

                        if (_this10.props.structure[element].type) {
                            items.push(React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "div",
                                    null,
                                    element
                                ),
                                React.createElement("input", { type: "button", value: "\u2B61", onClick: function onClick() {
                                        return _this10.props.changeOrden(element);
                                    } })
                            ));
                        } else {
                            items.push(React.createElement(
                                "div",
                                null,
                                React.createElement(
                                    "div",
                                    null,
                                    element
                                )
                            ));
                        }
                    }
                } else {
                    if (_this10.props.structure[element].type) {
                        items.push(React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "div",
                                null,
                                element
                            ),
                            React.createElement("input", { type: "button", value: "\u2B64", onClick: function onClick() {
                                    return _this10.props.changeOrden(element);
                                } })
                        ));
                    } else {
                        items.push(React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "div",
                                null,
                                element
                            )
                        ));
                    }
                }
            });
            return items;
        }
    }, {
        key: "renderall",
        value: function renderall() {
            var _this11 = this;

            var cont = 0;
            var items = [];
            this.props.listaDatos.forEach(function (element) {
                items.push(React.createElement(ObjetoComplete, {
                    key: cont,
                    position: cont,
                    dbType: _this11.props.dbtype,
                    datos: element,
                    structure: _this11.props.structure,
                    handlefilter: function handlefilter(dato, key) {
                        return _this11.props.handleFilter(dato, key);
                    },
                    checkObject: function checkObject(position) {
                        return _this11.props.check(position);
                    },
                    editObject: function editObject(position) {
                        return _this11.props.edit(position);
                    },
                    deleteObject: function deleteObject(position) {
                        return _this11.props.delete(position);
                    }
                }));
                cont++;
            });
            return items;
        }
    }]);

    function ListObjects(props) {
        _classCallCheck(this, ListObjects);

        var _this9 = _possibleConstructorReturn(this, (ListObjects.__proto__ || Object.getPrototypeOf(ListObjects)).call(this, props));

        _this9.renderall = _this9.renderall.bind(_this9);
        _this9.renderTitle = _this9.renderTitle.bind(_this9);
        return _this9;
    }

    _createClass(ListObjects, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { "class": "table table-bordered table-dark containerObjects" },
                React.createElement(
                    "div",
                    { "class": "titles" },
                    this.renderTitle()
                ),
                this.renderall()
            );
        }
    }]);

    return ListObjects;
}(React.Component);

var FilterGroup = function (_React$Component5) {
    _inherits(FilterGroup, _React$Component5);

    _createClass(FilterGroup, [{
        key: "handleChange",
        value: function handleChange(e) {

            this.props.handlefilter(e.target.value, e.target.name);
        }
    }, {
        key: "renderStructure",
        value: function renderStructure(element, dato, key) {
            var _this13 = this;

            if (this.state.typeDb == "Mongo") {
                if (Array.isArray(element) || element.type) {
                    var tipo = Array.isArray(element) ? "Lista" : "Campo";
                    if (tipo == "Campo") {
                        var _items2 = React.createElement("input", { type: "text", value: dato, name: key, onChange: this.handleChange });
                        return _items2;
                    }
                } else {
                    var keys = Object.keys(element);
                    var newKey = key.concat(".");
                    var _items3 = [];
                    keys.forEach(function (ele) {
                        _items3.push.apply(_items3, _toConsumableArray(_this13.renderStructure(element[ele], dato[ele], newKey.concat(ele))));
                    });
                    return _items3;
                }
            } else {
                var item = React.createElement("input", { type: "text", value: dato, name: key, onChange: this.handleChange });
                return item;
            }
        }
    }, {
        key: "renderAllFields",
        value: function renderAllFields() {
            var _this14 = this;

            var keysStructure = Object.keys(this.props.structure);
            var items = [];
            keysStructure.forEach(function (key) {

                items.push.apply(items, _toConsumableArray(_this14.renderStructure(_this14.props.structure[key], _this14.props.filters[key], key.toString())));
            });

            return items;
        }
    }]);

    function FilterGroup(props) {
        _classCallCheck(this, FilterGroup);

        var _this12 = _possibleConstructorReturn(this, (FilterGroup.__proto__ || Object.getPrototypeOf(FilterGroup)).call(this, props));

        _this12.renderAllFields = _this12.renderAllFields.bind(_this12);
        _this12.renderStructure = _this12.renderStructure.bind(_this12);
        _this12.handleChange = _this12.handleChange.bind(_this12);
        return _this12;
    }

    _createClass(FilterGroup, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { "class": "listaFiltros" },
                this.renderAllFields
            );
        }
    }]);

    return FilterGroup;
}(React.Component);

var Pagination = function (_React$Component6) {
    _inherits(Pagination, _React$Component6);

    _createClass(Pagination, [{
        key: "handlePagination",
        value: function handlePagination(page) {
            this.props.pagination(page);
        }
    }, {
        key: "renderPagination",
        value: function renderPagination(size, page, total) {
            var _this16 = this;

            if (page === 1) {
                return React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "span",
                        null,
                        "1-",
                        size,
                        " de ",
                        total
                    ),
                    React.createElement("input", { type: "button", name: "anterior", value: "", disabled: true }),
                    React.createElement("input", { type: "button", name: "siguiente", value: "2", onClick: function onClick() {
                            return _this16.handlePagination(2);
                        } })
                );
            } else {
                if (page === Math.ceil(total / size)) {
                    var begin = size * (page - 1) + 1;
                    var end = total;
                    return React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "span",
                            null,
                            begin,
                            "-",
                            end,
                            " de ",
                            total
                        ),
                        React.createElement("input", { type: "button", name: "anterior", value: page - 1, onClick: function onClick() {
                                return _this16.handlePagination(page - 1);
                            } }),
                        React.createElement("input", { type: "button", name: "siguiente", value: page + 1, disabled: true })
                    );
                } else {
                    var _begin = size * (page - 1) + 1;
                    var _end = size * page;
                    return React.createElement(
                        "div",
                        null,
                        React.createElement(
                            "span",
                            null,
                            _begin,
                            "-",
                            _end,
                            " de ",
                            total
                        ),
                        React.createElement("input", { type: "button", name: "anterior", value: page - 1, onClick: function onClick() {
                                return _this16.handlePagination(page - 1);
                            } }),
                        React.createElement("input", { type: "button", name: "siguiente", value: page + 1, onClick: function onClick() {
                                return _this16.handlePagination(page + 1);
                            } })
                    );
                }
            }
        }
    }]);

    function Pagination(props) {
        _classCallCheck(this, Pagination);

        var _this15 = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

        _this15.renderPagination = _this15.renderPagination.bind(_this15);
        _this15.handlePagination = _this15.handlePagination.bind(_this15);
        return _this15;
    }

    _createClass(Pagination, [{
        key: "render",
        value: function render() {
            return this.renderPagination(this.props.size, this.props.page, this.props.totalcount);
        }
    }]);

    return Pagination;
}(React.Component);

var ModuloAdmin = function (_React$Component7) {
    _inherits(ModuloAdmin, _React$Component7);

    function ModuloAdmin(props) {
        _classCallCheck(this, ModuloAdmin);

        return _possibleConstructorReturn(this, (ModuloAdmin.__proto__ || Object.getPrototypeOf(ModuloAdmin)).call(this, props));
    }

    _createClass(ModuloAdmin, [{
        key: "render",
        value: function render() {
            var _this18 = this;

            return React.createElement(
                "div",
                { "class": "containerModule" },
                React.createElement(NavBarSeach, {
                    changeSearch: function changeSearch(value) {
                        return _this18.props.changesearch(value);
                    },
                    search: function search() {
                        return _this18.props.seach();
                    }

                }),
                React.createElement(
                    "div",
                    null,
                    React.createElement("input", { type: "button", value: "Create", onClick: function onClick() {
                            return _this18.props.create();
                        } })
                ),
                React.createElement(
                    "div",
                    { "class": "listaAndFilters" },
                    React.createElement(FilterGroup, {
                        handlefilter: function handlefilter(value, key) {
                            return _this18.props.changeFilter(value, key);
                        },
                        structure: this.props.structure,
                        filters: this.props.filters
                    }),
                    React.createElement(ListObjects, {
                        listaDatos: this.props.listaDatos,
                        dbtype: this.props.dbType,
                        structure: this.props.structure,
                        handleFilter: function handleFilter(value, key) {
                            return _this18.changeFilter(value, key);
                        },
                        check: function check(position) {
                            return _this18.props.check(position);
                        },
                        edit: function edit(position) {
                            return _this18.props.edit(position);
                        },
                        "delete": function _delete(position) {
                            return _this18.props.delete(position);
                        },
                        changeOrden: function changeOrden(key) {
                            return _this18.props.changeOrden(key);
                        },
                        orden: this.props.orden
                    })
                ),
                React.createElement(Pagination, {
                    pagination: function pagination(page) {
                        return _this18.props.pagination(page);
                    },
                    size: this.props.size,
                    page: this.props.page,
                    totalcount: this.props.totalcount
                })
            );
        }
    }]);

    return ModuloAdmin;
}(React.Component);

//desde aqui createOrEdit pantalla


var CreateOrUpdateField = function (_React$Component8) {
    _inherits(CreateOrUpdateField, _React$Component8);

    _createClass(CreateOrUpdateField, [{
        key: "renderOptions",
        value: function renderOptions(lista, select) {
            var items = [];
            lista.forEach(function (element) {
                if (element.valor === select) {

                    items.push(React.createElement(
                        "option",
                        { value: element.save, selected: true },
                        element.show
                    ));
                } else {

                    items.push(React.createElement(
                        "option",
                        { value: element.save },
                        element.show
                    ));
                }
            });
            return items;
        }
    }, {
        key: "handleChange",
        value: function handleChange(e) {
            //tipo, path, valor
            this.props.handleFieldChange(e.target.tipo, e.target.name, e.target.value);
        }
    }, {
        key: "handleChangeC",
        value: function handleChangeC(e) {
            this.props.handleFieldChange(e.target.tipo, e.target.name, e.target.checked);
        }
    }, {
        key: "renderField",
        value: function renderField(dbType, dato, estructura, path, listaOpciones) {
            if (dbType === "Mongo" && path != "_id") {
                var newPath = path.splite(".").slice(-1)[0];
                if (estructura.type) {
                    if (estructura.ref) {

                        var item = React.createElement(
                            "div",
                            { "class": "campEditCreate" },
                            React.createElement(
                                "span",
                                null,
                                newPath
                            ),
                            React.createElement(
                                "select",
                                { name: path, tipo: estructura.type.name, "class": "selectfield", onChange: this.handleChange },
                                this.renderOptions(listaOpciones, dato)
                            )
                        );

                        return item;
                        // se renderiz con opciones
                    } else {
                        var tipo = estructura.type.name;
                        var _item2 = void 0;
                        switch (tipo) {
                            case "String":
                                _item2 = React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        "span",
                                        null,
                                        newPath
                                    ),
                                    React.createElement("input", { type: "text", tipo: "String", name: path, id: "textfield", value: dato, onChange: this.handleChange })
                                );
                                return _item2;
                                break;
                            case "Boolean":

                                _item2 = React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        "span",
                                        null,
                                        newPath
                                    ),
                                    React.createElement("input", { type: "checkbox", name: path, tipo: "Boolean", value: newPath, "class": "checkboxfield", onChange: this.handleChangeC })
                                );
                                return _item2;
                                break;
                            case "Number":
                                _item2 = React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        "span",
                                        null,
                                        newPath
                                    ),
                                    React.createElement("input", { type: "text", tipo: "Number", name: path, id: "textfield", value: dato, onChange: this.handleChange })
                                );
                                return _item2;
                                break;
                            case "Date":
                                _item2 = React.createElement(
                                    "div",
                                    null,
                                    React.createElement(
                                        "span",
                                        null,
                                        newPath
                                    ),
                                    React.createElement("input", { type: "date", tipo: "Date", name: path, id: "textfield", value: dato, onChange: this.handleChange })
                                );
                                return _item2;

                                break;
                            default:
                                break;
                        }
                    }
                }
                // se renderiza
            } else {
                var _newPath = path.splite(".").slice(-1)[0];
                if (estructura.type != "BIGSERIAL") {
                    if (estructura.primaryKey) {
                        if (estructura.foreignKey) {
                            //se renderiza con opciones
                            var _item3 = React.createElement(
                                "div",
                                { "class": "campEditCreate" },
                                React.createElement(
                                    "span",
                                    null,
                                    _newPath
                                ),
                                React.createElement(
                                    "select",
                                    { name: path, tipo: estructura.modelType, "class": "selectfield", onChange: this.handleChange },
                                    this.renderOptions(listaOpciones, dato)
                                )
                            );
                            return _item3;
                        } else {
                            //se renderiza
                            var _item4 = void 0;
                            switch (estructura.type.tipo) {
                                case "String":
                                    _item4 = React.createElement(
                                        "div",
                                        null,
                                        React.createElement(
                                            "span",
                                            null,
                                            _newPath
                                        ),
                                        React.createElement("input", { type: "text", tipo: "String", name: path, id: "textfield", value: dato, onChange: this.handleChange })
                                    );
                                    return _item4;
                                    break;
                                case "Boolean":
                                    _item4 = React.createElement(
                                        "div",
                                        null,
                                        React.createElement(
                                            "span",
                                            null,
                                            _newPath
                                        ),
                                        React.createElement("input", { type: "checkbox", name: path, tipo: "Boolean", value: _newPath, "class": "checkboxfield", onChange: this.handleChangeC })
                                    );
                                    return _item4;

                                    break;
                                case "Number":
                                    _item4 = React.createElement(
                                        "div",
                                        null,
                                        React.createElement(
                                            "span",
                                            null,
                                            _newPath
                                        ),
                                        React.createElement("input", { type: "text", tipo: "Number", name: path, id: "textfield", value: dato, onChange: this.handleChange })
                                    );
                                    return _item4;
                                    break;
                                case "Date":
                                    _item4 = React.createElement(
                                        "div",
                                        null,
                                        React.createElement(
                                            "span",
                                            null,
                                            _newPath
                                        ),
                                        React.createElement("input", { type: "date", tipo: "Date", name: path, id: "textfield", value: dato, onChange: this.handleChange })
                                    );
                                    return _item4;
                                    break;
                                default:
                                    break;
                            }
                        }
                    } else {
                        if (estructura.foreignKey) {
                            var _item5 = React.createElement(
                                "div",
                                { "class": "campEditCreate" },
                                React.createElement(
                                    "span",
                                    null,
                                    _newPath
                                ),
                                React.createElement(
                                    "select",
                                    { name: path, tipo: estructura.modelType, "class": "selectfield", onChange: this.handleChange },
                                    this.renderOptions(listaOpciones, dato)
                                )
                            );
                            return _item5;
                            //se renderiza con opciones
                        } else {
                            var _item6 = void 0;
                            switch (estructura.type.tipo) {
                                case "String":
                                    _item6 = React.createElement(
                                        "div",
                                        null,
                                        React.createElement(
                                            "span",
                                            null,
                                            _newPath
                                        ),
                                        React.createElement("input", { type: "text", tipo: "String", name: path, id: "textfield", value: dato, onChange: this.handleChange })
                                    );
                                    return _item6;
                                    break;
                                case "Boolean":
                                    _item6 = React.createElement(
                                        "div",
                                        null,
                                        React.createElement(
                                            "span",
                                            null,
                                            _newPath
                                        ),
                                        React.createElement("input", { type: "checkbox", name: path, tipo: "Boolean", value: _newPath, "class": "checkboxfield", onChange: this.handleChangeC })
                                    );
                                    return _item6;

                                    break;
                                case "Number":
                                    _item6 = React.createElement(
                                        "div",
                                        null,
                                        React.createElement(
                                            "span",
                                            null,
                                            _newPath
                                        ),
                                        React.createElement("input", { type: "text", tipo: "Number", name: path, id: "textfield", value: dato, onChange: this.handleChange })
                                    );
                                    return _item6;
                                    break;
                                case "Date":
                                    _item6 = React.createElement(
                                        "div",
                                        null,
                                        React.createElement(
                                            "span",
                                            null,
                                            _newPath
                                        ),
                                        React.createElement("input", { type: "date", tipo: "Date", name: path, id: "textfield", value: dato, onChange: this.handleChange })
                                    );
                                    return _item6;

                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            }
        }
    }]);

    function CreateOrUpdateField(props) {
        _classCallCheck(this, CreateOrUpdateField);

        var _this19 = _possibleConstructorReturn(this, (CreateOrUpdateField.__proto__ || Object.getPrototypeOf(CreateOrUpdateField)).call(this, props));

        _this19.handleChange = _this19.handleChange.bind(_this19);
        _this19.handleChangeC = _this19.handleChangeC.bind(_this19);
        _this19.renderField = _this19.renderField.bind(_this19);
        _this19.renderOptions = _this19.renderOptions.bind(_this19);
        return _this19;
    }

    _createClass(CreateOrUpdateField, [{
        key: "render",
        value: function render() {
            return this.renderField(this.props.dbType, this.props.dato, this.props.estructura, this.props.path, this.props.listaOpciones);
        }
    }]);

    return CreateOrUpdateField;
}(React.Component);

var FormCreateOrUpdate = function (_React$Component9) {
    _inherits(FormCreateOrUpdate, _React$Component9);

    _createClass(FormCreateOrUpdate, [{
        key: "renderList",
        value: function renderList(dbType, estructura, dato, path, listaOpcionesfeach) {
            var _this21 = this;

            if (dbType == "Mongo") {
                if (estructura.type) {
                    // campo
                    var _item7 = React.createElement(CreateOrUpdateField, {
                        dbType: dbType,
                        dato: dato,
                        estructura: estructura,
                        path: path,
                        listaOpciones: listaOpcionesfeach,
                        handleFieldChange: function handleFieldChange(tipo, path, value) {
                            return _this21.props.handleFieldChange(tipo, path, value);
                        }
                    });
                    return _item7;
                } else {
                    if (Array.isArray(estructura)) {
                        var cont = 0;
                        var title = path.split(".").slice(-1)[0];
                        items = [];
                        dato.forEach(function (element) {
                            var newPa = path.concat("#").concat(cont);
                            _item8.push(React.createElement(
                                "div",
                                { "class": "objectInlist" },
                                React.createElement("button", { value: "-", onClick: function onClick() {
                                        return _this21.props.deleteInList(path, cont);
                                    } }),
                                _this21.renderList("Mongo", estructura[0], dato[cont], newPa, listaOpcionesfeach[0])
                            ));
                            cont++;
                        });
                        var _item8 = React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "h3",
                                null,
                                title
                            ),
                            React.createElement("button", { value: "+", onClick: function onClick() {
                                    return _this21.props.insertList(path);
                                } }),
                            React.createElement(
                                "div",
                                { "class": "listaElementos" },
                                items
                            )
                        );
                        return _item8;
                        // lista
                    } else {
                        var _item9 = [];
                        var newkeys = Object.keys(estructura);
                        newkeys.forEach(function (element) {
                            _item9.push(_this21.renderList(dbType, estructura, dato, path.concat(".").concat(element), listaOpcionesfeach[element]));
                        });
                        return _item9;
                        // objeto
                    }
                }
            } else {
                var _item10 = React.createElement(CreateOrUpdateField, {
                    dbType: dbType,
                    dato: dato,
                    estructura: estructura,
                    path: path,
                    listaOpciones: listaOpcionesfeach,
                    handleFieldChange: function handleFieldChange(tipo, path, value) {
                        return _this21.props.handleFieldChange(tipo, path, value);
                    }
                });
                return _item10;
            }
        }
    }]);

    function FormCreateOrUpdate(props) {
        _classCallCheck(this, FormCreateOrUpdate);

        var _this20 = _possibleConstructorReturn(this, (FormCreateOrUpdate.__proto__ || Object.getPrototypeOf(FormCreateOrUpdate)).call(this, props));

        _this20.renderList = _this20.renderList.bind(_this20);
        return _this20;
    }

    _createClass(FormCreateOrUpdate, [{
        key: "render",
        value: function render() {
            var _this22 = this;

            var newkeys = Object.keys(this.props.estructura);
            newkeys.forEach(function (element) {
                if (_this22.props.typeFomr == "Create") {

                    return React.createElement(
                        "div",
                        { "class": "formUpdateOrCreate" },
                        React.createElement("input", { type: "button", value: "x", onClick: function onClick() {
                                return _this22.props.exitCreateOrUpdate();
                            } }),
                        _this22.renderList(_this22.props.dbType, _this22.props.estructura[element], _this22.props.datos[element], element.toString(), _this22.props.listaOpciones[element]),
                        React.createElement("button", { "class": "btn-crear", value: "Create", onClick: function onClick() {
                                return _this22.props.createObject();
                            } })
                    );
                } else {

                    return React.createElement(
                        "div",
                        { "class": "formUpdateOrCreate" },
                        React.createElement("input", { type: "button", value: "x", onClick: function onClick() {
                                return _this22.props.exitCreateOrUpdate();
                            } }),
                        _this22.renderList(_this22.props.dbType, _this22.props.estructura[element], _this22.props.datos[element], element.toString(), _this22.props.listaOpciones[element]),
                        React.createElement("button", { "class": "btn-update", value: "update", onClick: function onClick() {
                                return _this22.props.updateObject();
                            } })
                    );
                }
            });
        }
    }]);

    return FormCreateOrUpdate;
}(React.Component);

var MasterPage = function (_React$Component10) {
    _inherits(MasterPage, _React$Component10);

    _createClass(MasterPage, [{
        key: "listaModelosR",
        value: function listaModelosR() {
            var _id_ciudad;

            var listaM = [];

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
                    }]

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
                    }]

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
                    id_ciudad: (_id_ciudad = { type: "BIGINT", name: "id_ciudad", foreignKey: true, fieldShow: "nombre", ref: "ciudad", refField: "id_ciudad" }, _defineProperty(_id_ciudad, "fieldShow", "nombre"), _defineProperty(_id_ciudad, "commentForeign", "id_ciudad_fk"), _defineProperty(_id_ciudad, "modelType", "Number"), _id_ciudad),
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
                    id_descuento: null

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
                    id_tipo_pago: null

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
    }, {
        key: "create",
        value: function create() {
            var _this24 = this;

            var options_and_body = {
                method: "POST",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            options_and_body["body"] = JSON.stringify(body);

            var body = {};
            if (this.state.modelo.dbType == "Mongo") {
                body = this.state.elementoToUpdateOrCreate;
            } else {
                var keys = Object.keys(this.state.modelo.modelo);
                var newModel = {};

                keys.forEach(function (ele) {
                    if (!_this24.state.modelo.modelo.primaryKey && !_this24.state.modelo.modelo.type == "BIGSERIAL") {
                        newModel[ele] = _this24.state.elementoToUpdateOrCreate[ele];
                    }
                });

                body = newModel;
            }

            var prefix = "";
            if (this.state.modelo.dbType == "Mongo") {
                prefix = "/api";
            } else {
                prefix = "/apit";
            }

            var auxUrl = prefix + "/" + this.state.modelo.urlname + "/" + "?" + query;
            fetch(auxUrl, options_and_body).then(function (res) {
                return res.json();
            }).catch(function (error) {
                console.log("error: ", error);
                Swal.fire("Hubo un problema para crear el objet", error, "error");
            }).then(function (response) {
                console.log("success: ", response);
                Swal.fire("Se creo correctamente", "Continua", "ok");
            }).then(function () {
                var copy = _this24.state;
                copy.elementoToUpdateOrCreate = {};
                copy.CreateOrUpdate = "None";
                copy.listaOpciones = {};
                _this24.setState(copy);
                _this24.get();
            });
        }
    }, {
        key: "recursiveOptionList",
        value: function recursiveOptionList(estructura, params) {
            var _this25 = this;

            console.log(estructura);
            if (estructura.ref) {
                var _query = Object.keys(params).map(function (k) {
                    return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
                }).join("&");
                var options_and_body = {
                    method: "GET",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json"
                    }
                };

                var auxUrl = "/api/" + estructura.ref + "/" + "?" + _query;
                fetch(auxUrl, options_and_body).then(function (res) {
                    return res.json();
                }).catch(function (error) {
                    return console.log("error: ", error);
                }).then(function (response) {
                    if (response.count > 0) {
                        return response.docs.map(function (obj) {
                            var a = { save: null, show: null };
                            for (i in obj) {

                                if (i == estructura.fieldShow) {
                                    console.log(i);
                                    a.show = obj[i];
                                }
                                if (i == "_id") {
                                    console.log(i);
                                    a.save = obj[i];
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
                    var objRetu = [];
                    objRetu.push(this.recursiveOptionList(estructura[0], params));
                    return objRetu;
                } else {
                    if (!estructura.type) {
                        // objeto
                        var ret = {};
                        var newkeys = Object.keys(estructura);
                        newkeys.forEach(function (ele) {
                            ret[ele] = _this25.recursiveOptionList(estructura[ele], params);
                        });
                        return ret;
                    }
                }
            }
        }
    }, {
        key: "getOptionsList",
        value: function getOptionsList() {
            var _this26 = this;

            console.log("getting list");
            var prefix = "";
            var params = {};
            var blank = this.state.modelo.blank;
            if (this.state.modelo.dbType == "Mongo") {
                params = {
                    filters: "",
                    filtro: JSON.stringify({}),
                    page: 1,
                    size: 0,
                    orden: JSON.stringify({})
                };
                prefix = "/api";
            } else {
                params = {
                    filters: "",
                    filtro: JSON.stringify({}),
                    page: 1,
                    size: "ALL",
                    orden: JSON.stringify({})
                };
                prefix = "/apit";
            }

            var keys = Object.keys(this.state.modelo.modelo);
            keys.forEach(function (element) {
                if (_this26.state.modelo.dbType == "Mongo") {
                    if (_this26.state.modelo.modelo[element].ref) {
                        console.log("entra en ref");
                        var _query2 = Object.keys(params).map(function (k) {
                            return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
                        }).join("&");
                        var options_and_body = {
                            method: "GET",
                            credentials: "same-origin",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        };
                        var auxUrl = prefix + "/" + _this26.state.modelo.modelo[element].ref + "/" + "?" + _query2;

                        fetch(auxUrl, options_and_body).then(function (res) {
                            return res.json();
                        }).catch(function (error) {
                            return console.log("error: ", error);
                        }).then(function (response) {
                            console.log("success: ", response);
                            blank[element] = response.docs.map(function (obj) {
                                var a = { save: null, show: null };
                                for (i in obj) {

                                    if (i == _this26.state.modelo.modelo[element].fieldShow) {
                                        console.log(i);
                                        a.show = obj[i];
                                    }
                                    if (i == "_id") {
                                        console.log(i);
                                        a.save = obj[i];
                                    }
                                }

                                return a;
                            });
                        });
                    } else {
                        if (Array.isArray(element)) {
                            console.log("es un array");
                            blank[element][0] = _this26.recursiveOptionList(_this26.state.modelo.modelo[element][0], params);
                        } else {
                            if (!_this26.state.modelo.modelo[element].type) {
                                console.log("es un objeto");
                                var keysI = Object.keys(_this26.state.modelo.modelo[element]);

                                keysI.forEach(function (ele) {
                                    blank[element][ele] = _this26.recursiveOptionList(_this26.state.modelo.modelo[element][ele], params);
                                });
                            }
                        }
                    }
                } else {
                    //[{null, []}]
                    var _query3 = Object.keys(params).map(function (k) {
                        return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
                    }).join("&");
                    var _options_and_body = {
                        method: "GET",
                        credentials: "same-origin",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    };

                    var _auxUrl = prefix + "/" + _this26.state.modelo.modelo[element].ref + "/" + "?" + _query3;
                    fetch(_auxUrl, _options_and_body).then(function (res) {
                        return res.json();
                    }).catch(function (error) {
                        return console.log("error: ", error);
                    }).then(function (response) {
                        blank[element] = response.docs.map(function (obj) {
                            var a = { save: null, show: null };
                            for (i in obj) {

                                if (i == _this26.state.modelo.modelo[element].fieldShow) {
                                    console.log(i);
                                    a.show = obj[i];
                                }
                                if (i == _this26.state.modelo.modelo[element].refField) {
                                    console.log(i);
                                    a.save = obj[i];
                                }
                            }

                            return a;
                        });
                    });
                }
            });

            console.log("finished blank:", blank);
            return blank;
        }
    }, {
        key: "get",
        value: function get() {
            var _this27 = this;

            var copy = this.state;
            var params = {
                filters: this.state.filters,
                filtro: JSON.stringify(this.state.filtros),
                pag: this.state.page,
                size: this.state.size,
                orden: JSON.stringify(this.state.orden)
            };
            var prefix = "";
            if (this.state.modelo.dbType == "Mongo") {
                prefix = "/api";
            } else {
                prefix = "/apit";
            }

            var query = Object.keys(params).map(function (k) {
                return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
            }).join("&");
            var options_and_body = {
                method: "GET",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                }
            };

            var auxUrl = prefix + "/" + this.state.modelo.urlname + "/" + "?" + query;

            fetch(auxUrl, options_and_body).then(function (res) {
                return res.json();
            }).catch(function (error) {
                return console.log("error: ", error);
            }).then(function (response) {
                if (response.correct) {
                    console.log("success: ", response);
                    copy.listaDatos = response.docs;
                    copy.elementosTotales = response.count;
                    copy.checkList = [];
                    copy.listaOpciones = {};
                    _this27.setState(copy);
                } else {
                    console.log("error: ", response);
                }
            });
        }
    }, {
        key: "update",
        value: function update() {
            var _this28 = this;

            var body = { id: null, model: null };
            if (this.state.modelo.dbType == "Mongo") {
                body.id = this.state.elementoToUpdateOrCreate["_id"];
                body.model = this.state.elementoToUpdateOrCreate;
            } else {
                var keys = Object.keys(this.state.modelo.modelo);
                var newModel = {};
                var newkey = {};
                keys.forEach(function (ele) {
                    if (_this28.state.modelo.modelo.primaryKey) {
                        newkey[ele] = _this28.state.elementoToUpdateOrCreate[ele];
                    } else {
                        newModel[ele] = _this28.state.elementoToUpdateOrCreate[ele];
                    }
                });
                body.id = newkey;
                body.model = newModel;
            }

            var prefix = "";
            if (this.state.modelo.dbType == "Mongo") {
                prefix = "/api";
            } else {
                prefix = "/apit";
            }

            var options_and_body = {
                method: "PUT",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            var url = prefix + "/" + this.state.modelo.urlname + "/";

            options_and_body["body"] = JSON.stringify(body);
            fetch(url, options_and_body).then(function (res) {
                return res.json();
            }).catch(function (error) {
                console.log("error: ", error);
                Swal.fire("Hubo un problema para actualizar", error, "error");
            }).then(function (response) {
                console.log("success: ", response);
                Swal.fire("actualizado", "Continua", "success");
            }).then(function () {
                var copy = _this28.state;
                copy.elementoToUpdateOrCreate = {};
                copy.CreateOrUpdate = "None";
                copy.listaOpciones = {};
                _this28.setState(copy);
                _this28.get();
            });
        }
    }, {
        key: "delete",
        value: function _delete(position) {
            var _this29 = this;

            var options_and_body = {
                method: "DELETE",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json"
                }
            };

            var prefix = "";
            if (this.state.modelo.dbType == "Mongo") {
                prefix = "/api";
            } else {
                prefix = "/apit";
            }

            if (this.state.modelo.dbType == "Mongo") {
                options_and_body["body"] = JSON.stringify({
                    id: this.state.listaDatos[position]["_id"]
                });
            } else {
                var idcond = {};
                var keyModel = Object.keys(this.state.modelo.modelo);
                keyModel.forEach(function (element) {
                    if (_this29.state.modelo.modelo.primaryKey) {
                        idcond[element] = _this29.state.listaDatos[position][key];
                    }
                });

                options_and_body["body"] = JSON.stringify({
                    id: idcond
                });
            }

            var url = prefix + "/" + this.state.modelo.modelo.urlname + "/";
            fetch(url, options_and_body).then(function (res) {
                return res.json();
            }).catch(function (error) {
                console.log("error: ", error);
                Swal.fire("Error al eliminar.", error, "error");
            }).then(function (response) {
                console.log("success: ", response);
                Swal.fire(response.msg, "Continua", response.ok);
            }).then(function () {}).then(function () {
                // implement get
                _this29.get();
            });
        }
    }, {
        key: "changeModel",
        value: function changeModel(e) {
            console.log(e.target);
            var copy = this.state;
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
    }]);

    function MasterPage(props) {
        _classCallCheck(this, MasterPage);

        var _this23 = _possibleConstructorReturn(this, (MasterPage.__proto__ || Object.getPrototypeOf(MasterPage)).call(this, props));

        _this23.Modelos = _this23.listaModelosR();
        _this23.state = {
            modelo: _this23.Modelos[0],
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
        _this23.get = _this23.get.bind(_this23);
        _this23.changeModel = _this23.changeModel.bind(_this23);
        //implemente all methods
        _this23.get();

        return _this23;
    }

    _createClass(MasterPage, [{
        key: "renderTables",
        value: function renderTables() {
            var _this30 = this;

            var cont = 0;
            var items = [];
            this.Modelos.forEach(function (element) {
                // console.log(element);

                items.push(React.createElement(
                    "div",
                    { "class": "table_list" },
                    React.createElement("input", { type: "button", cont: cont, value: element.nombre, onClick: _this30.changeModel })
                ));
                cont++;
            });
            return items;
        }
    }, {
        key: "changeseach",
        value: function changeseach(value) {
            var copy = this.state;
            copy.seach = value;
            this.setState(copy);
        }
    }, {
        key: "changeFilter",
        value: function changeFilter(value, key) {
            var copy = this.state;
            copy.filtros["key"] = value;
            this.setState(copy);
            //implememnt get
            this.get();
        }
    }, {
        key: "searchGet",
        value: function searchGet() {
            this.get();
            //implement get
        }
    }, {
        key: "toCreate",
        value: function toCreate() {
            console.log(copy);
            var copy = this.state;
            copy.elementoToUpdateOrCreate = this.state.modelo.blank;
            copy.CreateOrUpdate = "Create";
            // implement options lis
            copy.listaOpciones = this.getOptionsList();
            console.log(copy);
            this.setState(copy);
        }
    }, {
        key: "check",
        value: function check(position) {
            var copy = this.state;
            var index = copy.checkList.indexOf(position);
            if (index > -1) {
                copy.checkList.splice(index, 1);
            } else {
                copy.checkList.push(position);
            }
            this.setState(copy);
        }
    }, {
        key: "edit",
        value: function edit(position) {
            var copy = this.state;
            copy.elementoToUpdateOrCreate = copy.listaDatos[position];
            copy.CreateOrUpdate = "Update";
            // implement option list
            copy.listaOpciones = this.getOptionsList();
            this.setState(copy);
        }
    }, {
        key: "changeOrden",
        value: function changeOrden(key) {
            var copy = this.state;
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
            this.setState(copy);
            this.get();
            // implement get
        }
    }, {
        key: "pagination",
        value: function pagination(page) {
            var copy = this.state;
            copy.page = page;
            this.setState(copy);
            this.get();
            // implement get
        }
    }, {
        key: "exitCreateUpdate",
        value: function exitCreateUpdate() {
            var copy = this.state;
            copy.elementoToUpdateOrCreate = {};
            copy.CreateOrUpdate = "None";
            copy.listaOpciones = {};
            this.setState(copy);
        }
    }, {
        key: "changeData",
        value: function changeData(tipo, path, value) {
            var copy = this.state;
            switch (tipo) {
                case "String":
                    copy.elementoToUpdateOrCreate = insertValuePath(copy.elementoToUpdateOrCreate, path, value);
                    break;
                case "Boolean":
                    var valor = value == "true";
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
    }, {
        key: "insertInList",
        value: function insertInList(path) {
            var copy = this.state;

            var value = deepFind(this.state.elementoToUpdateOrCreate, path);
            var valuePush = deepFind(this.state.modelo.blank, path.concat(".#0"));
            value.push(valuePush);
            copy.elementoToUpdateOrCreate = insertValuePath(copy.elementoToUpdateOrCreate, path, value);

            this.setState(copy);
        }
    }, {
        key: "deleteInList",
        value: function deleteInList(path, count) {
            var copy = this.state;
            var value = deepFind(this.state.elementoToUpdateOrCreate, path);

            value.splice(count, 1);
            copy.elementoToUpdateOrCreate = insertValuePath(copy.elementoToUpdateOrCreate, path, value);
            this.setState(copy);
        }
    }, {
        key: "render",
        value: function render() {
            var _this31 = this;

            if (this.state.CreateOrUpdate == "None") {
                return React.createElement(
                    "div",
                    { "class": "row" },
                    React.createElement(
                        "div",
                        { "class": "col-2 costadoTablasMenu" },
                        this.renderTables()
                    ),
                    React.createElement(
                        "div",
                        { "class": "col-10 module" },
                        React.createElement(ModuloAdmin, {
                            changesearch: function changesearch(value) {
                                return _this31.changeseach(value);
                            },
                            seach: function seach() {
                                return _this31.searchGet();
                            },
                            create: function create() {
                                return _this31.toCreate();
                            },
                            changeFilter: function changeFilter(value, key) {
                                return _this31.changeFilter(value, key);
                            },
                            structure: this.state.modelo.modelo,
                            filters: this.state.filters,
                            listaDatos: this.state.listaDatos,
                            dbType: this.state.modelo.dbType,
                            check: function check(position) {
                                return _this31.check(position);
                            },
                            edit: function edit(position) {
                                return _this31.edit(position);
                            },
                            "delete": function _delete(position) {
                                return _this31.delete(position);
                            },
                            changeOrden: function changeOrden(key) {
                                return _this31.changeOrden(key);
                            },
                            pagination: function pagination(page) {
                                return _this31.pagination(page);
                            },
                            size: this.state.size,
                            page: this.state.page,
                            totalcount: this.state.elementosTotales,
                            orden: this.state.orden
                        })
                    )
                );
            } else {
                return React.createElement(
                    "div",
                    { "class": "row" },
                    React.createElement(
                        "div",
                        { "class": "col-2 costadoTablasMenu" },
                        this.renderTables()
                    ),
                    React.createElement(
                        "div",
                        { "class": "col-10 module" },
                        React.createElement(FormCreateOrUpdate, {
                            exitCreateOrUpdate: function exitCreateOrUpdate() {
                                return _this31.exitCreateUpdate();
                            },
                            estructura: this.state.modelo.modelo,
                            dbType: this.state.modelo.dbType,
                            datos: this.state.elementoToUpdateOrCreate,
                            createObject: function createObject() {
                                return _this31.create();
                            },
                            updateObject: function updateObject() {
                                return _this31.update();
                            },
                            typeFomr: this.state.CreateOrUpdate,
                            listaOpciones: this.state.listaOpciones,
                            handleFieldChange: function handleFieldChange(tipo, path, value) {
                                return _this31.changeData(tipo, path, value);
                            },
                            insertList: function insertList() {
                                return _this31.insertInList(path);
                            },
                            deleteInList: function deleteInList(newPath, count) {
                                return _this31.deleteInList(newPath, count);
                            }
                        })
                    )
                );
            }
        }
    }]);

    return MasterPage;
}(React.Component);

ReactDOM.render(React.createElement(MasterPage, null), document.getElementById('contenedorReact'));

function insertValuePath(obj, path, value) {
    var copy = obj;
    path = path.split(".");
    if (path == "") {
        return value;
    } else {

        if (path.length == 1) {
            if (path[0][0] == "#") {
                copy[parseInt(path[0].substring(1))] = insertValuePath(obj[parseInt(path[0].substring(1))], "", value);
            } else {
                copy[path[0]] = insertValuePath(obj[path[0]], "", value);
            }
        } else {
            if (path[0][0] == "#") {
                copy[parseInt(path[0].substring(1))] = insertValuePath(obj[parseInt(path[0].substring(1))], path.slice(1).join("."), value);
            } else {
                copy[path[0]] = insertValuePath(obj[path[0]], path.slice(1).join("."), value);
            }
        }
    }
    return copy;
}

function deepFind(obj, path) {
    var paths = path.split('.'),
        current = obj,
        i;

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