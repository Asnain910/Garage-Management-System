const express = require('express');
const { 
  getAllServiceRequests, 
  getServiceRequestById, 
  createServiceRequest, 
  updateServiceRequest, 
  deleteServiceRequest,
  updateServiceStatus
} = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.route('/')
  .get(protect, getAllServiceRequests)
  .post(protect, authorize('admin', 'manager'), createServiceRequest);

router.route('/:id')
  .get(protect, getServiceRequestById)
  .put(protect, authorize('admin', 'manager'), updateServiceRequest)
  .delete(protect, authorize('admin', 'manager'), deleteServiceRequest);

// Update service status
router.put('/:id/status', protect, authorize('admin', 'manager', 'mechanic'), updateServiceStatus);

module.exports = router;