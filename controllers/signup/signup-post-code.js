const codeValidation = require('../../validations/code-validation')
const { generateToken } = require('../../modules/jwt')

module.exports = async (req, res) => {
   try {
      const { sessions } = req.db

      const { phone, code } = await codeValidation.validateAsync(req.body)

      const candidate = await sessions.findOne({
         where: {
            phone
         }
      })

      if (!candidate) {
         throw new Error('session not found')
      }

      if (candidate.code !== code) {
         await sessions.update({
            attempts: candidate.attempts + 1
         }, {
            where: {
               phone: phone
            }
         })
         throw new Error('code is invalid')
      }

      if (candidate.code === code ) {
         await sessions.update({
            attempts: 0
         }, {
            where: {
               phone: phone
            }
         })

         res.cookie('code-token', generateToken({
            user_agent: req.headers['user-agent'],
            phone,
            code
         }))

         res.send({
            ok: true,
            message: 'code is valid'
         })
      }
   } catch (e) {
      res.status(400).send({
         ok: false,
         message: e + ''
      })
   }
}