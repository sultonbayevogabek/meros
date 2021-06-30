const Jwt = require('jsonwebtoken')
const { SECRET_WORD } = require('../config')

const generateToken = data => Jwt.sign(data, SECRET_WORD),
   verifyToken = data => Jwt.verify(data, SECRET_WORD)

module.exports = { generateToken, verifyToken }