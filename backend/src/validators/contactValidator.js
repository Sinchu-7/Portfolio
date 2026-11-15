const { check, validationResult } = require('express-validator');

const contactValidationRules = [
  check('name').trim().notEmpty().withMessage('Name is required.').isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters.'),
  check('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Please enter a valid email address.'),
  check('subject').trim().notEmpty().withMessage('Subject is required.').isLength({ min: 3, max: 200 }).withMessage('Subject must be between 3 and 200 characters.'),
  check('message').trim().notEmpty().withMessage('Message is required.').isLength({ min: 10 }).withMessage('Message must be at least 10 characters long.'),
];

function validateContact(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Please review your contact form details and try again.',
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }

  return next();
}

module.exports = { contactValidationRules, validateContact };
