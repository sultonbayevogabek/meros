const router = require('express').Router()
const signUpGet = require('../controllers/signup/signup-get')
const signUpFillingGet = require('../controllers/signup/signup-filling-get')
const signUpFillingPost = require('../controllers/signup/signup-filling-post')
const signUpPostPhone = require('../controllers/signup/signup-post-phone')
const signUpPostCode = require('../controllers/signup/signup-post-code')
const dontEnterAuthorized = require('../middlewares/dont-enter-authorized')
const dontEnterWithoutCode = require('../middlewares/dont-enter-without-code')

router.get('/', dontEnterAuthorized, signUpGet)

router.get('/filling', dontEnterAuthorized, dontEnterWithoutCode, signUpFillingGet)

router.post('/filling', dontEnterAuthorized, signUpFillingPost)

router.post('/register_phone', dontEnterAuthorized, signUpPostPhone)

router.post('/register_code', dontEnterAuthorized, signUpPostCode)

module.exports = {
   path: '/signup',
   router
}