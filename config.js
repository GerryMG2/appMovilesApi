const dotenv = require('dotenv');
dotenv.config();

configuraciones = {
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    APP_KEY: process.env.APP_KEY, 
    PORT: process.env.PORT,
    DB_POSTGRES_DEVELOPMENT: process.env.DB_POSTGRES_DEVELOPMENT,
    DB_URL: process.env.DB_URL,
    MONGO_URL: process.env.MONGO_URL
};

module.exports = configuraciones;