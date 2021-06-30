const router = require('express').Router()
const homeGet = require('../controllers/home/home-get')

router.get('/', homeGet)

module.exports = {
   path: '/',
   router
}