const phoneValidation = require('../../validations/phone-validation')
const generateCode = require('../../modules/generate-code')
const sendSMS = require('../../modules/send-sms')

module.exports = async (req, res) => {
   try {
      const { phone } = await phoneValidation.validateAsync(req.body)

      const { sessions, users } = req.db

      const user = await users.findOne({
         where: { phone }
      })

      if (user) {
         throw new Error('number already exists')
      }

      const candidate = await sessions.findOne({
         where: {
            phone
         }
      })

      if (!candidate) {
         const code = generateCode()

         await sessions.create({
            phone,
            code,
            user_agent: req.headers['user-agent'],
            ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress
         })

         await sendSMS(phone, 'Meros platformasi uchun tasdiqlash kodi: ', code)

         return res.send({
            ok: true,
            message: 'code sent',
            phone
         })
      }

      if (candidate) {
         const code = generateCode()

         await sessions.update({
            code,
            user_agent: req.headers['user-agent'],
            ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress
         }, {
            where: {
               phone: phone
            }
         })

         await sendSMS(phone, 'Meros platformasi uchun tasdiqlash kodi: ', code)

         return res.send({
            ok: true,
            message: 'code sent',
            phone: phone
         })
      }
   } catch (e) {
      res.status(400).send({
         ok: false,
         message: e + ''
      })
   }
}