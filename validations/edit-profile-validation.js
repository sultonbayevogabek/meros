const Joi = require('joi');

module.exports = Joi.object({
   full_name: Joi.string()
            .max(64)
            .min(3)
            .required()
            .error(Error("Name is invalid")),
   email: Joi.string()
            .pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            .error(Error("Email is invalid")),
})