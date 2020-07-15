var express = require('express');
var router = express.Router();
var authMovil = require("../security/movilsecurity/auth");
var authWeb = require("../security/websecurity/auth")
const payment = require("../controllers/paymentController");
const { Router } = require('express');

router.get("/stripe-key",authMovil,payment.getkey);
router.post("/pay",authMovil,payment.pay);
router.get("/",(req,res)=>{
    res.redirect("/admin/module")
});
router.get("/policy",(req,res)=>{
    res.render("webApp/policy.pug",{});
});
router.get("/terms",(req,res)=>{
    res.render("webApp/terms.pug",{});
});

router.get("/donwload/:id",authWeb,payment.donwloadData);

module.exports = router;