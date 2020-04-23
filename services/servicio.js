class service{

    constructor(
        model, 
        msg_create = {ok: "Created", err: "Not created"},
        msg_update = {ok: "Updated", err: "Not updated"}, 
        mgs_delete = {ok: "Deleted", err: "Not deleted"}, 
        id = "_id"
    ){
        this.model = model;
        this.msgCreate = msg_create;
        this.msgUpdate = msg_update;
        this.msgDelete = mgs_delete;
        this.modelId = id;
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

    update(id, newModel, cb){
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

    delete(id, cb){
        try {
            var conditions = {};
            conditions[this.modelId] = id;
            this.model.deleteOne(conditions, (err, doc) => {
                if (err) {
                    cb(false, this.msgDelete.ok)
                } else {
                    cb(true, this.msgDelete.err);
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

    get(filters="",filtros={}, size=10, pag=1, orden={}, cb) {
        try {
            let filtro = filtros;
            if (filters != "") {
                filtro = {
                    $and: [{ $or: []}, filtros]
                };
                let props = Object.keys(this.model.schema.paths);
                props.forEach(element => {
                    if (element != "_id" && element != "__v") {
                        filtro["$and"][0].push({ element: { $regex: '.*' + filters + '.*' } });
                    }
                })
            }
            this.model.find(filtro, function (err, docs) {
                if (err) {
                    cb(false,{}, 0);
                } else {
                    this.getcount(filters,filtros, function (validar, n) {
                        if(validar){
                            cb(true, docs, n);
                        }else{
                            cb(false, {}, 0);
                        }
                    });
                }
            }).skip(size * (pag - 1)).limit(size).sort(orden);
        } catch (error) {
            cb(false, {}, 0);
        }
    }

    //no lleva ruta
    getcount(filters, filtros, cb) {
        try {
            let filtro = filtros;
            if (filters != "") {
                filtro = {
                    $and: [{ $or: []}, filtros]
                };
                let props = Object.keys(this.model.schema.paths);
                props.forEach(element => {
                    if (element != "_id" && element != "__v") {
                        filtro["$and"][0].push({ element: { $regex: '.*' + filters + '.*' } });
                    }
                })
            }
            this.model.count(filtro, (err, n) => {
                if (err) {
                    console.log("error: ", err);
                    cb(false,0);
                } else {
                    cb(true,n);

                }
            });

        } catch (error) {
            cb(false,0);
        }
    }


    
}

module.exports = service;