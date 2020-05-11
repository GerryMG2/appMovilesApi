//Use just in development enviroment, if not the data will be deleted from the database. 

const {DB_POSTGRES_DEVELOPMENT} = require("../config");
var glob = require("glob")

var scritpDBinit = () => {
    try {
        if(DB_POSTGRES_DEVELOPMENT == "true"){
            var listaServicios = []
            console.log("Initialization of DB creations");
            console.log("Is running a danguerous method,that can delete all the data in DB.");
            glob("../transactional/transactionServices/*", {}, function (err, files) {
                if(!err){
                    files.forEach(file =>{
                        let servicio = require(`../transactional/transactionServices/${file}`);
                        let servicioInit = new servicio();
                        listaServicios.push(servicioInit);
                    });

                    //delete relations
                    listaServicios.forEach(service =>{
                        service.EliminarRelaciones();
                    });
                    console.log("se eliminaron las relaciones");

                    //delete tables
                    listaServicios.forEach(service =>{
                        service.EliminarTabla();

                    });
                    
                    console.log("se eliminaron las tablas");

                    //crear tablas
                    listaServicios.forEach(service =>{
                        service.createTable();
                    });
                    
                    console.log("se crearon las tablas");

                    //crear pks
                    listaServicios.forEach(service =>{
                        service.createRelationsPK();
                    });

                    
                    console.log("se crearon las pks");

                    //crear fks
                    listaServicios.forEach(service =>{
                        service.createRelationsFK();
                    });

                    
                    console.log("se crearon las fks");



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