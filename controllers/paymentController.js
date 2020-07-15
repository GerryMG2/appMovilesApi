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

const getEncuestaData = async (req,res) => {
    data.getEncuestaData(req.session.user,req.params.id,(validar, buffer)=>{
        console.log("validar:",validar)
        if(validar){
            res.writeHead(200, [['Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']]);
            res.end(buffer);
            
        }else{
            res.status(500).send("Imposiblle to send Data");
        }
    })
};

module.exports.donwloadData = getEncuestaData;