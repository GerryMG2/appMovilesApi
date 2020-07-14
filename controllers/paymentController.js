const payment = require("../services/paymentServices/payment");
const data = require("../services/downloadService/encuestasDataService");

const getStripeKey = (req,res)=>{
    payment.key((validar,msg)=>{
        res.send({ publishableKey: msg })
    });
};

module.exports.getkey = getStripeKey;


const pay = (req,res) =>{
    payment.paymentService(req.body,(response)=>{
        console.log("respopnse: ", response);
        res.send(response);
    });
};

module.exports.pay = pay;

const getEncuestaData = (req,res) => {
    data.getEncuestaData(req.session.user,req.params.id,(validar, buffer)=>{
        if(validar){
            res.sendFile(buffer);
        }else{
            res.end();
        }
    })
};

module.exports.donwloadData = getEncuestaData;