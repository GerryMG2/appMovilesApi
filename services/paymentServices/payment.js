const { APP_ENV, STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY } = require("../../config");
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const lanzamientos = require("../../services/noRelacionalServices/lanzamientoService");
// const e = require("express");
const serviceLanzamientos = new lanzamientos();


const stripeKey = (cb) => {
    try {
        cb(true, STRIPE_PUBLISHABLE_KEY);
    } catch (error) {
        cb(false, "");
    }
};
module.exports.key = stripeKey;

const ServicioPagos = async (modelPay, cb) => {


    const { paymentMethodId, paymentIntentId, items, currency, useStripeSdk } = modelPay;

    var orderAmount = await calculateOrderAmount(items);
    try {
        let intent;
        console.log("Costo: Orderamount",orderAmount);
        if (paymentMethodId) {
            // Create new PaymentIntent with a PaymentMethod ID from the client.
            intent = await stripe.paymentIntents.create({
                amount: orderAmount,
                currency: currency,
                payment_method: paymentMethodId,
                confirmation_method: "manual",
                confirm: true,
                // If a mobile client passes `useStripeSdk`, set `use_stripe_sdk=true`
                // to take advantage of new authentication features in mobile SDKs
                use_stripe_sdk: useStripeSdk,
            });
            // After create, if the PaymentIntent's status is succeeded, fulfill the order.
        } else if (paymentIntentId) {
            // Confirm the PaymentIntent to finalize payment after handling a required action
            // on the client.
            intent = await stripe.paymentIntents.confirm(paymentIntentId);
            // After confirm, if the PaymentIntent's status is succeeded, fulfill the order.
        }
        
        cb(generateResponse(intent, items[0].id,orderAmount));
    } catch (e) {
        // Handle "hard declines" e.g. insufficient funds, expired card, etc
        // See https://stripe.com/docs/declines/codes for more
        cb({ error: e.message });
    }

};

module.exports.paymentService = ServicioPagos


const generateResponse = (intent, id,monto) => {
    // Generate a response based on the intent's status
    switch (intent.status) {
        case "requires_action":
        case "requires_source_action":
            // Card requires authentication
            return {
                requiresAction: true,
                clientSecret: intent.client_secret
            };
        case "requires_payment_method":
        case "requires_source":
            // Card was not properly authenticated, suggest a new payment method
            return {
                error: "Your card was denied, please provide a new payment method"
            };
        case "succeeded":
            serviceLanzamientos.paylanzamiento(id, (validar) => {
                if (validar) {

                    //crear factura
                    console.log("💰 Payment received!");
                    // return { clientSecret: intent.client_secret };
                } else {
                    console.log("💰 Payment received! but is not paid because we are idiots");
                    // return { clientSecret: intent.client_secret };
                }
            })
            createFactura(id,monto);
            return { clientSecret: intent.client_secret };
        // Payment is complete, authentication not required
        // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)

    }
};

const calculateOrderAmount = (items) => {

    return new Promise(function(resolve,reject){
        serviceLanzamientos.get("",{_id: items[0].id},1,1,{},(validar,docs,n)=>{
            if(validar){
                console.log("Costo: $", docs[0].costo);
                resolve(docs[0].costo * 100)
            }else{
                resolve(0)
            }
        });
    });

    
};

const usuarioT = require("../../transactional/transactionServices/usuarioService");
const usuarioServiceS = new usuarioT();
const Cliente = require("../../transactional/transactionServices/clienteService");
const ClienteService = new Cliente();
const cuenta = require("../../transactional/transactionServices/cuentaService");
const cuentaService = new cuenta();
const Transaccion = require("../../transactional/transactionServices/transaccionService");
const transaccionService = new Transaccion();
const TransaccionD = require("../../transactional/transactionServices/transaccionDetalleService");
const transaccionServiceD = new TransaccionD();

const createFactura = (id_lanzamiento,monto)=>{
    serviceLanzamientos.get("",{_id: id_lanzamiento},1,1,{},(validar,docs,n)=>{
        if(validar){
            var usuario = docs[0]["usuario"];
            usuarioServiceS.get("",{id_obj: usuario},1,1,{},(validar,usuaA,n)=>{
                if(validar){
                    ClienteService.get("",{id_usuario: usuaA[0]["id_usuario"]},1,1,{},(validar,cliente,n)=>{
                        if(validar){
                            cuentaService.get("",{id_cliente: cliente[0]["id_cliente"]},1,1,{},(validar,cuenta,n)=>{
                                if(validar){
                                    var actual = new Date();
                                    transaccionService.createWithId({
                                        id_cuenta: cuenta[0]["id_cuenta"],
                                        fecha: actual.toISOString(),
                                        anulado: false,
                                        id_tipo_pago: 27

                                    },(validar,id_transaccion)=>{
                                        if(validar){
                                            
                                            
                                            transaccionServiceD.createWithId({
                                                id_factura: id_transaccion["id_factura"],
                                                id_servicio: 1,
                                                id_documento: 2,
                                                costo: 0.5,
                                                monto: monto,
                                                descuento: 0,
                                                monto_con_descuento: monto,
                                                id_descuento: 2
                                            },(validar, id_final)=>{
                                                if(validar){
                                                    console.log("factura creada!");
                                                }else{
                                                    console.log("factura no creada!");
                                                }
                                            });
                                        }else{

                                        }
                                    });
                                }else{

                                }
                            });
                        }else{
                            console.log("no se pudo traer el cliente")
                        }
                    });
                }else{
                    console.log("no se pudo traer el ussuario normal");
                }
            });

        }else{
            console.log("no se pudo traer el usuario de los lanzamientos")
        }
    });
};
