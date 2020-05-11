var express = require('express');
var router = express.Router();
var adminPage = require("../controllers/administrativePageControllers/moduleAdmin");

router.get("/module",adminPage.adminPage);

module.exports = router;