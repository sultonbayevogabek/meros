module.exports = async (req, res) => {
   res.render('login', {
      title: 'Meros | Login',
      path: '/login',
      user: req.user,
      categories: req.categories
   })
}