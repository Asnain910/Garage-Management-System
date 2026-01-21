const express = require('express');
const { 
  getAllCustomers, 
  getCustomerById, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer,
  getCustomerVehicles 
} = require('../controllers/customerController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.route('/')
  .get(protect, getAllCustomers)
  .post(protect, authorize('admin', 'manager'), createCustomer);

router.route('/:id')
  .get(protect, getCustomerById)
  .put(protect, authorize('admin', 'manager'), updateCustomer)
  .delete(protect, authorize('admin', 'manager'), deleteCustomer);

// Get customer's vehicles
router.get('/:customerId/vehicles', protect, getCustomerVehicles);

module.exports = router;