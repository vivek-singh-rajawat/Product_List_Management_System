const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().positive().required(),
  isRecommended: Joi.boolean(),
  isBestseller: Joi.boolean(),
  status: Joi.boolean().valid(true, false),
  filePath: Joi.string().optional()
});

exports.validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
