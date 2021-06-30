const signUpValidation = require('../../validations/signup-validation')
const {verifyToken, generateToken} = require('../../modules/jwt')
const {generateHash} = require('../../modules/bcrypt')

module.exports = async (req, res) => {
   try {
      const { sessions, users } = req.db

      const { name, email, password } = await signUpValidation.validateAsync(req.body)

      const candidate = await users.findOne({
         where: {
            email
         }
      })

      if (candidate) {
         throw new Error('Этот адрес электронной почты предварительно зарегистрирован. Пожалуйста, войдите')
      }

      const codeToken = req.cookies['code-token']

      const { phone } = verifyToken(codeToken)

      const session = await sessions.findOne({
         where: {
            phone
         }
      })

      if (!session) {
         res.clearCookie('code-token')
         res.clearCookie('token')
         return res.redirect('/signup')
      }

      let user = await users.create({
         name,
         phone,
         email,
         password: await generateHash(password)
      })

      const token = generateToken({
         user_agent: req.headers['user-agent'],
         phone
      })

      await sessions.update({
         user_id: user.user_id
      }, {
         where: {
            phone
         }
      })

      res.clearCookie('code-token').cookie('token', token).redirect('/')
   } catch (e) {
      res.render('signup-filling', {
         error: e + '',
         title: 'Meros | Sign Up'
      })
   }
}