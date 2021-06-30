const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('categories', {
        title: 'Meros | Categories',
        path: '/categories',
        user: req.user
    })
})

module.exports = {
    path: '/categories',
    router
}