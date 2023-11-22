const Joi = require('joi');

module.exports.joiProductSchema = Joi.object({
    product: Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(),
        size: Joi.string().required(),
        price: Joi.number().required().min(0),
    }).required()
})