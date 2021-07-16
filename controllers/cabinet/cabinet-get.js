const cabinetGet = async (req, res) => {
   res.render('cabinet/cabinet', {
      title: 'Meros | Personal Cabinet',
      path: '/cabinet',
      user: req.user,
      categories: req.categories
   })
}

const cabinetEditGet = async (req, res) => {
   res.render('cabinet/edit', {
      title: 'Meros | Personal Cabinet Edit',
      path: '/cabinet/edit',
      user: req.user,
      categories: req.categories
   })
}
const savedCardsGet = async (req, res) => {
   res.render('cabinet/saved-cards', {
      title: 'Meros | Saved Cards',
      path: '/cabinet/saved-cards',
      user: req.user,
      categories: req.categories
   })
}

module.exports = { cabinetGet, cabinetEditGet, savedCardsGet }