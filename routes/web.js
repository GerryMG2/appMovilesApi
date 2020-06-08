var express = require('express');
var router = express.Router();
var main = require("../controllers/webControllers/webController");
var auth = require("../security/websecurity/auth");
var login = require("../controllers/login/web/login");

router.get("/main",auth,main.main);
router.get("/login", login.getlogin);
router.post("/login", login.postlogin);
router.get("/logout",auth, login.logout);

module.exports = router;