const Joi = require('joi');

module.exports = Joi.object({
   name: Joi.string()
      .required()
      .min(3)
      .max(32)
      .pattern(new RegExp('^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$'))
      .error(Error('Invalid name')),
   email: Joi.string()
      .required()
      .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'ru', 'uz']}})
      .error(Error('Invalid email')),
   password: Joi.string()
      .required()
      .min(6)
      .error(Error('Invalid password')),
   agreement: Joi.string()
      .required()
      .equal('on')
      .error(Error('Invalid agreement'))
})