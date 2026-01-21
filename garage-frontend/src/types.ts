// User type
export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Customer type
export interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  notes?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Vehicle type
export interface Vehicle {
  _id: string;
  customerId: string;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  color?: string;
  engineType?: string;
  transmission?: string;
  fuelType?: string;
  mileage?: number;
  lastServiceDate?: string;
  nextServiceDate?: string;
  notes?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Service Request type
export interface ServiceRequest {
  _id: string;
  customerId: string;
  vehicleId: string;
  serviceType: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  estimatedCost?: number;
  actualCost?: number;
  assignedMechanic?: string;
  scheduledDate?: string;
  startDate?: string;
  completedDate?: string;
  partsUsed?: Array<{
    partName: string;
    quantity: number;
    cost: number;
  }>;
  laborHours?: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// API Response type
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  error?: string;
}

// Login credentials type
export interface LoginCredentials {
  email: string;
  password: string;
}

// Register credentials type
export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  role?: string;
}