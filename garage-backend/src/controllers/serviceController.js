const ServiceRequest = require('../models/ServiceRequest');
const Customer = require('../models/Customer');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

// Get all service requests
const getAllServiceRequests = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '', 
      status = '', 
      customerId = '',
      vehicleId = '',
      priority = ''
    } = req.query;
    
    const query = {};
    
    // Add search filter
    if (search) {
      query.$or = [
        { serviceType: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Add filters
    if (status) query.status = status;
    if (customerId) query.customerId = customerId;
    if (vehicleId) query.vehicleId = vehicleId;
    if (priority) query.priority = priority;
    
    const serviceRequests = await ServiceRequest.find(query)
      .populate('customerId', 'firstName lastName email phone')
      .populate('vehicleId', 'make model year licensePlate')
      .populate('assignedMechanic', 'username email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await ServiceRequest.countDocuments(query);

    res.status(200).json({
      success: true,
      data: serviceRequests,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get service request by ID
const getServiceRequestById = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findById(req.params.id)
      .populate('customerId', 'firstName lastName email phone')
      .populate('vehicleId', 'make model year licensePlate')
      .populate('assignedMechanic', 'username email');
    
    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }

    res.status(200).json({
      success: true,
      data: serviceRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Create a new service request
const createServiceRequest = async (req, res) => {
  try {
    // Check if customer and vehicle exist
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found'
      });
    }

    const vehicle = await Vehicle.findById(req.body.vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: 'Vehicle not found'
      });
    }

    // Check if assigned mechanic exists
    if (req.body.assignedMechanic) {
      const mechanic = await User.findById(req.body.assignedMechanic);
      if (!mechanic) {
        return res.status(404).json({
          success: false,
          message: 'Mechanic not found'
        });
      }
    }

    const serviceRequest = new ServiceRequest(req.body);
    await serviceRequest.save();

    res.status(201).json({
      success: true,
      message: 'Service request created successfully',
      data: serviceRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update service request
const updateServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('customerId', 'firstName lastName email phone')
      .populate('vehicleId', 'make model year licensePlate')
      .populate('assignedMechanic', 'username email');

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service request updated successfully',
      data: serviceRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete service request
const deleteServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findByIdAndDelete(req.params.id);

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service request deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update service request status
const updateServiceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['pending', 'in-progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    // Update dates based on status
    const updateData = { status };
    if (status === 'in-progress' && !req.body.startDate) {
      updateData.startDate = new Date();
    }
    if (status === 'completed' && !req.body.completedDate) {
      updateData.completedDate = new Date();
    }

    const serviceRequest = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    )
      .populate('customerId', 'firstName lastName email phone')
      .populate('vehicleId', 'make model year licensePlate')
      .populate('assignedMechanic', 'username email');

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Service request status updated successfully',
      data: serviceRequest
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getAllServiceRequests,
  getServiceRequestById,
  createServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
  updateServiceStatus
};