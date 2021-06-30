const { verifyToken } = require('../modules/jwt')

module.exports = async (req, res, next) => {
   const adminToken = req.cookies['admin-token']

   if (!adminToken) {
      return res.redirect('/admin/login')
   }

   try {
      const { admin } = req.db

      const { login, password, user_agent } = verifyToken(adminToken)

      const candidate = await admin.findOne({
         login, password
      })

      if (!candidate || user_agent !== req.headers['user-agent']) {
         throw new Error('admin not found')
      }

      req.admin = {
         name: candidate.name
      }
   } catch (err) {
      return res.clearCookie('admin-token').redirect('/admin/login')
   }

   next()
}