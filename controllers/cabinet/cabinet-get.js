module.exports = async (req, res) => {
   res.render('cabinet', {
      title: 'Meros | Personal Cabinet',
      path: '/cabinet',
      user: req.user
   })
}