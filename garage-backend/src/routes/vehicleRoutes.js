const express = require('express');
const { 
  getAllVehicles, 
  getVehicleById, 
  createVehicle, 
  updateVehicle, 
  deleteVehicle 
} = require('../controllers/vehicleController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected
router.route('/')
  .get(protect, getAllVehicles)
  .post(protect, authorize('admin', 'manager'), createVehicle);

router.route('/:id')
  .get(protect, getVehicleById)
  .put(protect, authorize('admin', 'manager'), updateVehicle)
  .delete(protect, authorize('admin', 'manager'), deleteVehicle);

module.exports = router;