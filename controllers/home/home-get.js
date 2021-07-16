module.exports = async (req, res) => {
   res.render('index', {
      title: 'Meros | Online Shop',
      path: '/',
      user: req.user,
      categories: req.categories
   })
}