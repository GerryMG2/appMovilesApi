var express = require('express');
var router = express.Router();
var adminPage = require("../controllers/administrativePageControllers/moduleAdmin");
var auth = require("../security/adminsecurity/auth");
var login = require("../controllers/login/admin/login");

router.get("/module",auth,adminPage.adminPage);
router.get("/login", login.getlogin);
router.post("/login", login.postlogin);
router.get("/logout",auth, login.logout);

module.exports = router;