class service {

    constructor(
        model,
        msg_create = { ok: "Created", err: "Not created" },
        msg_update = { ok: "Updated", err: "Not updated" },
        mgs_delete = { ok: "Deleted", err: "Not deleted" },
        id = "_id"
    ) {
        this.model = model;
        this.msgCreate = msg_create;
        this.msgUpdate = msg_update;
        this.msgDelete = mgs_delete;
        this.modelId = id;
        // this.updateOrCreate = this.updateOrCreate.bind(this);
        // this.create = this.create.bind(this);
        // this.get = this.get.bind(this);
        // this.getOneById = this.getOneById.bind(this);
        // this.getcount = this.getcount.bind(this);
        // this.delete = this.delete.bind(this);
        // this.update = this.update.bind(this);
    }

    updateOrCreate(id, newModel, cb) {
        try {
            var conditions = {};
            conditions[this.modelId] = id;
            this.model.updateOne(conditions, newModel, { upsert: true }, (err, doc) => {
                if (err) {
                    cb(false);
                } else {
                    cb(true);
                }
            });
        } catch (error) {
            console.log("err: ", error)
            cb(false);
        }
    }

    create(model, cb) {
        try {
            const newModel = new this.model(model);
            newModel.save((err, doc) => {
                if (err) {
                    console.log("err:", err)
                    cb(false);
                } else {
                    cb(true);
                }
            });
        } catch (error) {
            console.log("error: ", error);
            cb(false);
        }
    }

    update(id, newModel, cb) {
        try {
            var conditions = {};
            conditions[this.modelId] = id;
            this.model.updateOne(conditions, newModel, (err, doc) => {
                if (err) {
                    cb(false, this.msgUpdate.err);
                } else {
                    cb(true, this.msgUpdate.ok);
                }
            });
        } catch (error) {
            console.log("error: ", error);
            cb(false, this.msgUpdate.err);
        }
    }

    delete(id, cb) {
        try {
            var conditions = {};
            conditions[this.modelId] = id;
            this.model.deleteOne(conditions, (err, doc) => {
                if (err) {
                    cb(false, this.msgDelete.err)
                } else {
                    cb(true, this.msgDelete.ok);
                }
            });
        } catch (error) {
            console.log("error:", error);
            cb(false, this.msgDelete.err);
        }
    }

    getOneById(id, cb) {
        try {
            var conditions = {};
            conditions[this.modelId] = id;
            this.model.findOne(conditions, (err, doc) => {
                if (err) {
                    console.log("err: ", err);
                    cb(false, {});
                } else {
                    cb(true, doc);
                }
            });
        } catch (error) {
            console.log("error: ", error);
            cb(false, {});
        }
    }

    get(filters = "", filtros = {}, size = 10, pag = 1, orden = {}, cb) {
        try {
            console.log("filtros:",filtros);
            console.log("filters:",filters)
            let nn = 0;
            let validarCount = false;
            this.getcount(filters, filtros, function (validar, n) {
                if (validar) {
                   nn =n;
                   validarCount = true;
                } 
            });
            let filtro = filtros;
            if (filters != "") {
                filtro = {
                    $and: [{ $or: [] }, filtros]
                };
                let props = Object.keys(this.model.schema.paths);
                props.forEach(element => {
                    console.log(this.model.schema.paths[element].instance);
                    if (element != "_id" && element != "__v") {
                        if ( ["String", "Date", "Number", "Boolean", "ObjectId"].indexOf(this.model.schema.paths[element].instance) != -1) {
                            let regex = {};
                            if(this.model.schema.paths[element].instance != "Number"){
                                if(this.model.schema.paths[element].instance != "Date"){
                                    regex[element] =  { $regex: '.*' + filters + '.*' };
                                filtro["$and"][0]["$or"].push(regex);
                                }else{
                                    if(!isNaN(Date.parse(filters))){
                                        regex[element] =  filters;
                                    filtro["$and"][0]["$or"].push(regex);
                                    }else{
                                        //nada
                                    }
                                }
                                
                            }else{
                                if(!isNaN(parseFloat(filters))){
                                    regex[element] =  parseFloat(filters) 
                                    filtro["$and"][0]["$or"].push(regex);
                                }
                            }
                          
                           
                        }
                    }
                })
                console.log("result:",filtro["$and"][0]["$or"]);
            }
            
            this.model.find(filtro, function (err, docs) {
                if (err) {
                    console.log(err);
                    cb(false, {}, 0);
                } else {
                    if(validarCount){
                        cb(true, docs, nn);
                    }else{
                        cb(false, {}, 0);
                    }
                }
            }).skip(size * (pag - 1)).limit(size).sort(orden);
        } catch (error) {
            console.log(error);
            cb(false, {}, 0);
        }
    }

    //no lleva ruta
    getcount(filters, filtros, cb) {
        try {
            let filtro = filtros;
            if (filters != "") {
                filtro = {
                    $and: [{ $or: [] }, filtros]
                };
                let props = Object.keys(this.model.schema.paths);
                props.forEach(element => {
                    console.log(this.model.schema.paths[element].instance);
                    if (element != "_id" && element != "__v") {
                        if ( ["String", "Date", "Number", "Boolean", "ObjectId"].indexOf(this.model.schema.paths[element].instance) != -1) {
                            let regex = {};
                            if(this.model.schema.paths[element].instance != "Number"){
                                if(this.model.schema.paths[element].instance != "Date"){
                                    regex[element] =  { $regex: '.*' + filters + '.*' };
                                    filtro["$and"][0]["$or"].push(regex);
                                }else{
                                    if(!isNaN(Date.parse(filters))){
                                        regex[element] =  filters;
                                    filtro["$and"][0]["$or"].push(regex);
                                    }else{
                                        
                                    }
                                    
                                }
                                
                            }else{
                                if(!isNaN(parseFloat(filters))){
                                    regex[element] =  parseFloat(filters) 
                                    filtro["$and"][0]["$or"].push(regex);
                                }
                            }
                          
                           
                        }
                    }
                })
            }
            this.model.count(filtro, (err, n) => {
                if (err) {
                    console.log("error: ", err);
                    cb(false, 0);
                } else {
                    cb(true, n);

                }
            });

        } catch (error) {
            cb(false, 0);
        }
    }



}

module.exports = service;