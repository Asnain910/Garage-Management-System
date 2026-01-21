import axios from 'axios';
import { 
  Customer, 
  Vehicle, 
  ServiceRequest, 
  ApiResponse 
} from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Customer API functions
export const getCustomers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: string;
}): Promise<ApiResponse<Customer[]>> => {
  const response = await api.get('/customers', { params });
  return response.data;
};

export const getCustomerById = async (id: string): Promise<ApiResponse<Customer>> => {
  const response = await api.get(`/customers/${id}`);
  return response.data;
};

export const createCustomer = async (
  customerData: Omit<Customer, '_id'>
): Promise<ApiResponse<Customer>> => {
  const response = await api.post('/customers', customerData);
  return response.data;
};

export const updateCustomer = async (
  id: string,
  customerData: Partial<Customer>
): Promise<ApiResponse<Customer>> => {
  const response = await api.put(`/customers/${id}`, customerData);
  return response.data;
};

export const deleteCustomer = async (id: string): Promise<ApiResponse<null>> => {
  const response = await api.delete(`/customers/${id}`);
  return response.data;
};

// Vehicle API functions
export const getVehicles = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  customerId?: string;
  isActive?: string;
}): Promise<ApiResponse<Vehicle[]>> => {
  const response = await api.get('/vehicles', { params });
  return response.data;
};

export const getVehicleById = async (id: string): Promise<ApiResponse<Vehicle>> => {
  const response = await api.get(`/vehicles/${id}`);
  return response.data;
};

export const createVehicle = async (
  vehicleData: Omit<Vehicle, '_id'>
): Promise<ApiResponse<Vehicle>> => {
  const response = await api.post('/vehicles', vehicleData);
  return response.data;
};

export const updateVehicle = async (
  id: string,
  vehicleData: Partial<Vehicle>
): Promise<ApiResponse<Vehicle>> => {
  const response = await api.put(`/vehicles/${id}`, vehicleData);
  return response.data;
};

export const deleteVehicle = async (id: string): Promise<ApiResponse<null>> => {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data;
};

// Service Request API functions
export const getServiceRequests = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  customerId?: string;
  vehicleId?: string;
  priority?: string;
}): Promise<ApiResponse<ServiceRequest[]>> => {
  const response = await api.get('/services', { params });
  return response.data;
};

export const getServiceRequestById = async (
  id: string
): Promise<ApiResponse<ServiceRequest>> => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};

export const createServiceRequest = async (
  serviceRequestData: Omit<ServiceRequest, '_id'>
): Promise<ApiResponse<ServiceRequest>> => {
  const response = await api.post('/services', serviceRequestData);
  return response.data;
};

export const updateServiceRequest = async (
  id: string,
  serviceRequestData: Partial<ServiceRequest>
): Promise<ApiResponse<ServiceRequest>> => {
  const response = await api.put(`/services/${id}`, serviceRequestData);
  return response.data;
};

export const deleteServiceRequest = async (
  id: string
): Promise<ApiResponse<null>> => {
  const response = await api.delete(`/services/${id}`);
  return response.data;
};

export default api;