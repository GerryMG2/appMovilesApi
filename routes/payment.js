var express = require('express');
var router = express.Router();
var authMovil = require("../security/movilsecurity/auth");
const payment = require("../controllers/paymentController");

router.get("/stripe-key",authMovil,payment.getkey);
router.post("/pay",authMovil,payment.pay);


module.exports = router;