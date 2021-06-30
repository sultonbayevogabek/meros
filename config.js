const path = require('path')
require('dotenv').config({ path: path.join(__dirname, 'config.env') })

module.exports = {
   PORT: process.env.PORT,
   DB_URL: process.env.DB_URL,
   SECRET_WORD: process.env.SECRET_WORD
}