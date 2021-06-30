const router = require('express').Router()
const cabinetGet = require('../controllers/cabinet/cabinet-get')
const dontEnterNotAuthorized = require('../middlewares/dont-enter-not-authorized')

router.get('/', dontEnterNotAuthorized, cabinetGet)

module.exports = {
    path: '/cabinet',
    router
}