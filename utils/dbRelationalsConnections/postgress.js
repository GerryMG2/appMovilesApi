
class postgressDB {

    constructor(URI){
        
        this.pgp = require("pg-promise")(/*options*/);
        this.pgp.pg.defaults.ssl = true;
        this.db = null;
        this.URI = URI;
    }

    getdb(){
        console.log("Utils -> Database connections -> relationals -> postgres created" );
        if(this.db != null){
            return this.db;
        }else{
            this.db = this.pgp(this.URI);
            return this.db;
        }
    }
}



module.exports = postgressDB;