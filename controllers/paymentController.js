const payment = require("../services/paymentServices/payment");


const getStripeKey = (req,res)=>{
    payment.key((validar,msg)=>{
        res.send({ publishableKey: msg })
    })
};

module.exports.getkey = getStripeKey;


const pay = (req,res) =>{
    payment.paymentService(req.body,(response)=>{
        console.log("respopnse: ", response);
        res.send(response);
    })
};

module.exports.pay = pay;