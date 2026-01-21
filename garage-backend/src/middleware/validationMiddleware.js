const { body, validationResult } = require('express-validator');

// Validation for user registration
const validateUserRegistration = [
  body('username')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .trim()
    .isAlphanumeric()
    .withMessage('Username must contain only letters and numbers'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('role')
    .optional()
    .isIn(['admin', 'mechanic', 'manager'])
    .withMessage('Role must be either admin, mechanic, or manager'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

// Validation for user login
const validateUserLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .exists()
    .withMessage('Password is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

// Validation for customer creation/update
const validateCustomer = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required and must be less than 50 characters'),
  
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required and must be less than 50 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('phone')
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

// Validation for vehicle creation/update
const validateVehicle = [
  body('customerId')
    .isMongoId()
    .withMessage('Valid customer ID is required'),
  
  body('make')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Make is required and must be less than 50 characters'),
  
  body('model')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Model is required and must be less than 50 characters'),
  
  body('year')
    .isInt({ min: 1900, max: new Date().getFullYear() + 1 })
    .withMessage('Year must be a valid year'),
  
  body('vin')
    .isLength({ min: 17, max: 17 })
    .withMessage('VIN must be exactly 17 characters')
    .isAlphanumeric()
    .withMessage('VIN must contain only alphanumeric characters'),
  
  body('licensePlate')
    .trim()
    .isLength({ max: 10 })
    .withMessage('License plate must be less than 10 characters'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

// Validation for service request creation/update
const validateServiceRequest = [
  body('customerId')
    .isMongoId()
    .withMessage('Valid customer ID is required'),
  
  body('vehicleId')
    .isMongoId()
    .withMessage('Valid vehicle ID is required'),
  
  body('serviceType')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Service type is required and must be less than 100 characters'),
  
  body('description')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Description is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validateUserRegistration,
  validateUserLogin,
  validateCustomer,
  validateVehicle,
  validateServiceRequest
};