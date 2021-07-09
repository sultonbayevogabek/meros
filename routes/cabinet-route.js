const router = require('express').Router()
const {
    cabinetGet,
    cabinetEditGet,
    savedCardsGet
} = require('../controllers/cabinet/cabinet-get')

const dontEnterNotAuthorized = require('../middlewares/dont-enter-not-authorized')

router.get('/', dontEnterNotAuthorized, cabinetGet)

router.get('/edit', dontEnterNotAuthorized, cabinetEditGet)

router.get('/saved-cards', dontEnterNotAuthorized, savedCardsGet)

module.exports = {
    path: '/cabinet',
    router
}