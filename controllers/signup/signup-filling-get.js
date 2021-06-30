module.exports = async (req, res) => {
   res.render('signup-filling', {
      title: 'Meros | Register',
      path: '/signup/filling',
      user: req.user
   })
}