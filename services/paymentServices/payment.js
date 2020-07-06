const { APP_ENV, STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY } = require("../config");
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const lanzamientos = require("../../services/noRelacionalServices/lanzamientoService");
const serviceLanzamientos = new lanzamientos();


const stripeKey = (cb) => {
    try {
        cb(true, STRIPE_PUBLISHABLE_KEY);
    } catch (error) {
        cb(false, "");
    }
};
module.exports.key = stripeKey;

const ServicioPagos = (modelPay, cb) => {


    const { paymentMethodId, paymentIntentId, items, currency, useStripeSdk, id_lanzamiento } = modelPay;

    const orderAmount = calculateOrderAmount(items);

    try {
        let intent;
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
        cb(generateResponse(intent, id_lanzamiento));
    } catch (e) {
        // Handle "hard declines" e.g. insufficient funds, expired card, etc
        // See https://stripe.com/docs/declines/codes for more
        cb({ error: e.message });
    }

};

module.exports.paymentService = ServicioPagos


const generateResponse = (intent, id) => {
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
                    console.log("💰 Payment received!");
                    return { clientSecret: intent.client_secret };
                } else {
                    console.log("💰 Payment received! but is not paid because we are idiots");
                    return { clientSecret: intent.client_secret };
                }
            })
        // Payment is complete, authentication not required
        // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)

    }
};