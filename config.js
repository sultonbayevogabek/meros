const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "config.env") });

module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    SECRET_WORD: process.env.SECRET_WORD,
    TOKEN: process.env.TOKEN,
    BOT_USERNAME: process.env.BOT_USERNAME,
    PAYMENT_TOKEN: process.env.PAYMENT_TOKEN,
};
