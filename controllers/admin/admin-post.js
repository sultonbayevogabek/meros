const { generateToken } = require('../../modules/jwt')
const { compareHash } = require('../../modules/bcrypt')

const adminLoginPost = async (req, res) => {
   try {
      const { login, password } = req.body

      const { admin } = req.db

      const candidate = await admin.findOne({
         login
      })

      if (!candidate) {
         throw new Error('Login yoki parol xato')
      }

      const isPasswordCorrect = await compareHash(password, candidate.password)

      if (!isPasswordCorrect) {
         throw new Error('Login yoki parol xato')
      }

      await admin.update({
         user_agent: req.headers['user-agent']
      }, {
         where: {
            login, password
         }
      })

      const adminToken = generateToken({ login, password, user_agent: req.headers['user-agent'] })

      res.cookie('admin-token', adminToken).redirect('/admin')
   } catch (err) {
      res.render('admin/login', {
         title: 'Admin Login',
         error: err + ''
      })
   }
}

module.exports = { adminLoginPost }