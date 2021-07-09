const cabinetGet = async (req, res) => {
   res.render('cabinet/cabinet', {
      title: 'Meros | Personal Cabinet',
      path: '/cabinet',
      user: req.user
   })
}

const cabinetEditGet = async (req, res) => {
   res.render('cabinet/edit', {
      title: 'Meros | Personal Cabinet Edit',
      path: '/cabinet/edit',
      user: req.user
   })
}
const savedCardsGet = async (req, res) => {
   res.render('cabinet/saved-cards', {
      title: 'Meros | Saved Cards',
      path: '/cabinet/saved-cards',
      user: req.user
   })
}

module.exports = { cabinetGet, cabinetEditGet, savedCardsGet }