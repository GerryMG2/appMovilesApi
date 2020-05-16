class controllerTransaccional{

    constructor(service, options){
        this.service = new service();
        this.options = options;

        this.update = this.update.bind(this);
        this.get = this.get.bind(this);
        this.getOneById = this.getOneById.bind(this);
        this.delete = this.delete.bind(this);
        this.updateOrCreate = this.updateOrCreate.bind(this);
        this.create = this.create.bind(this);
    }

    update(req, res){
        try {
            console.log(req.body.id);
            this.service.update(req.body.id, req.body.model, (validar, msg) => {
                if(validar){
                    res.status(200).json({msg: msg, correct: true});
                }else{
                    res.status(400).json({msg: msg, correct: false});
                }
            });
        } catch (error) {
            console.log("Error: ", error);
            
            res.status(500).json({msg: "error", correct: false});
        }
    }

    get(req,res){
        try {
            let newsize = parseInt(req.query.size);
            console.log(parseInt(req.query.page));
            if(req.query.size = "ALL"){
                newsize = "ALL";
            }
            this.service.get(req.query.filters, JSON.parse(req.query.filtro),newsize, parseInt(req.query.pag),JSON.parse(req.query.orden), (validar, docs, count) => {
                if(validar){
                    res.status(200).json({msg: "ok", correct: true, docs: docs, count: count});
                }else{
                    res.status(400).json({msg: "error", correct: false, docs: {}, count: 0});
                }
            });
        } catch (error) {
            console.log("Error: ", error);
            
            res.status(500).json({msg: "error", correct: false, docs: {}, count: 0});
        }
    }

    getOneById(req, res){
        try {
            this.service.getOneById(JSON.parse(req.query.id), (validar, docs) => {
                if(validar){
                    res.status(500).json({msg: "ok", correct: true, docs: docs});
                }else{
                    res.status(500).json({msg: "error", correct: false, docs: {}});
                }
            });
        } catch (error) {
            console.log("Error: ", error);
            res.status(500).json({msg: "error", correct: false, docs: {}});
        }
        
    }

    delete(req, res){
        try {
            this.service.delete(req.body.id, (validar, msg) => {
                if(validar){
                    res.status(200).json({msg: msg, correct: true});
                }else{
                    
                    res.status(400).json({msg: msg, correct: false});
                }
            });
        } catch (error) {
            console.log("error: ", error);
            
            res.status(500).json({msg: msg, correct: false});
        }
    }

    create(req, res){
        try {
            console.log("entra a crear")
            this.service.create(req.body.model,(validar) => {
                if(validar){
                    res.status(201).json({correct: true, msg: "ok"});
                }else{
                    res.status(400).json({correct: false, msg: "error"});
                }
            });
        } catch (error) {
            console.log("error: ", error);
            res.status(500).json({correct: false, msg: "error"});
        }
    }

    updateOrCreate(req, res){
        try {
            this.service.updateOrCreate(req.body.id, req.body.model, (validar) => {
                if(validar){
                    res.status(201).json({correct: true, msg: "ok"});
                }else{
                    res.status(400).json({correct: false, msg: "error"});
                }
            });
        } catch (error) {
            console.log("error: ", error);
            res.status(500).json({correct: false, msg: "error"});
        }
    }
}

module.exports  = controllerTransaccional;