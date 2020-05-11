const { DB_URL } = require("../../config");


class GenericDB {
    static db = null;
    constructor() {

        if (GenericDB.db == null) {
            var dbClass = require("../../utils/dbRelationalsConnections/postgress");
            console.log("DB_URL:",DB_URL)
            var dbGenerator = new dbClass(DB_URL);

            GenericDB.db = dbGenerator.getdb();
        }

    }

    query(qr, cb) {
        this.db.any(qr)
            .then(function (data) {
                console.log("Connection -> query() -> data: ", data);
                // success;
                cb(true, data);
            })
            .catch(function (error) {
                console.log("Connection -> error -> error: ", error);
                // error;
                cb(false, {});
            });
    }


}




module.exports = GenericDB;