const Joi = require('joi');

module.exports = Joi.object({
   code: Joi.string()
      .required()
      .pattern(new RegExp('^[0-9]{5}$'))
      .error(Error('invalid code'))
})