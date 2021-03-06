//Use just in development enviroment, if not the data will be deleted from the database. 

const {DB_POSTGRES_DEVELOPMENT} = require("../config");
var glob = require("glob")

var scritpDBinit = () => {
    try {
        if(DB_POSTGRES_DEVELOPMENT == "true"){
            var listaServicios = []
            console.warn("Initialization of DB creations");
            console.warn("Is running a danguerous method,that can delete all the data in DB.");
            glob("transactional/transactionServices/*", {}, function (err, files) {
                if(!err){
                    files.forEach(file =>{
                        console.log(file);
                        let servicio = require(`../${file}`);
                       
                        let servicioInit = new servicio();
                        listaServicios.push(servicioInit);
                    });
                    console.error(files[0]);
                    //delete relations
                    listaServicios.forEach(service =>{
                        
                        service.EliminarRelaciones();
                    });
                    

                    //delete tables
                    listaServicios.forEach(service =>{
                        service.EliminarTabla();

                    });
                    
                    

                    //crear tablas
                    listaServicios.forEach(service =>{
                        service.createTable();
                    });
                    
                   

                    //crear pks
                    listaServicios.forEach(service =>{
                        service.createRelationsPK();
                    });

                    
                    

                    //crear fks
                    listaServicios.forEach(service =>{
                        service.createRelationsFK();
                    });

                    
                   



                }else{
                    console.log("Un Error ocurrio en la creacion de la DB:", err);
                }

            });
        }else{
            
        }
    } catch (error) {
        console.log("Un Error ocurrio en la creacion de la DB:", error);
    }
};


module.exports = scritpDBinit;