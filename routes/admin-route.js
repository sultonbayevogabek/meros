const router = require('express').Router()

const {
   adminGet,
   adminLoginGet,
   adminExit,
   adminOrdersGet,
   adminProductsGet,
   adminCustomersGet,
   adminCategoriesGet,
   adminBrandsGet
} = require('../controllers/admin/admin-get')
const { adminLoginPost } = require('../controllers/admin/admin-post')

const adminMiddleware = require('../middlewares/admin-middleware')
const dontEnterAuthorized = require('../middlewares/dont-enter-authorized')

router.get('/', dontEnterAuthorized, adminMiddleware, adminGet)

router.get('/login', dontEnterAuthorized, adminLoginGet)

router.post('/login', dontEnterAuthorized, adminLoginPost)

router.get('/exit', dontEnterAuthorized, adminExit)

router.get('/orders', dontEnterAuthorized, adminOrdersGet)

router.get('/products', dontEnterAuthorized, adminProductsGet)

router.get('/customers', dontEnterAuthorized, adminCustomersGet)

router.get('/categories', dontEnterAuthorized, adminCategoriesGet)

router.get('/brands', dontEnterAuthorized, adminBrandsGet)

module.exports = {
   path: '/admin',
   router
}