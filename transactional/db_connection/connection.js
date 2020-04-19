const { DB_URL } = require("../../config");


class GenericDB {
    static db = null;
    constructor() {

        if (this.db == null) {
            var dbClass = require("../../utils/dbRelationalsConnections/postgress");
            var dbGenerator = new dbClass(DB_URL);

            this.db = dbGenerator.getdb();
        }

    }

    query(qr, cb) {
        switch (DB_TYPE) {
            case "postgres":
                this.db.any(qr)
                    .then(function (data) {
                        console.log("UserConnection -> query() -> data: ", data);
                        // success;
                        cb(true, data);
                    })
                    .catch(function (error) {
                        console.log("UserConnection -> error -> error: ", error);
                        // error;
                        cb(false, {});
                    });
                break;

            default:
                break;
        }
    }


}




module.exports = GenericDB;