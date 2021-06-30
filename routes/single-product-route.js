const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('single-product', {
        title: 'Meros | Single Product',
    })
})

module.exports = {
    path: '/single-product',
    router
}