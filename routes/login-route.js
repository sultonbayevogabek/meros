const router = require('express').Router()
const loginGet = require('../controllers/login/login-get')
const loginPost = require('../controllers/login/login-post')
const dontEnterAuthorized = require('../middlewares/dont-enter-authorized')

router.get('/', dontEnterAuthorized, loginGet)

router.post('/', loginPost)

module.exports = {
   path: '/login',
   router
}