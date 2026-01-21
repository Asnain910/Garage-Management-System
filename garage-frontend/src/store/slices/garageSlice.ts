import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Customer, Vehicle, ServiceRequest } from '../../types';
import { 
  getCustomers as getCustomersService, 
  getCustomerById as getCustomerByIdService,
  createCustomer as createCustomerService,
  updateCustomer as updateCustomerService,
  deleteCustomer as deleteCustomerService,
  getVehicles as getVehiclesService,
  getVehicleById as getVehicleByIdService,
  createVehicle as createVehicleService,
  updateVehicle as updateVehicleService,
  deleteVehicle as deleteVehicleService,
  getServiceRequests as getServiceRequestsService,
  getServiceRequestById as getServiceRequestByIdService,
  createServiceRequest as createServiceRequestService,
  updateServiceRequest as updateServiceRequestService,
  deleteServiceRequest as deleteServiceRequestService
} from '../../services/api';

// Define the initial state
interface GarageState {
  customers: Customer[];
  vehicles: Vehicle[];
  serviceRequests: ServiceRequest[];
  selectedCustomer: Customer | null;
  selectedVehicle: Vehicle | null;
  selectedServiceRequest: ServiceRequest | null;
  loading: boolean;
  error: string | null;
  customersCount: number;
  vehiclesCount: number;
  serviceRequestsCount: number;
}

const initialState: GarageState = {
  customers: [],
  vehicles: [],
  serviceRequests: [],
  selectedCustomer: null,
  selectedVehicle: null,
  selectedServiceRequest: null,
  loading: false,
  error: null,
  customersCount: 0,
  vehiclesCount: 0,
  serviceRequestsCount: 0,
};

// Async thunks for customers
export const fetchCustomers = createAsyncThunk(
  'garage/fetchCustomers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCustomersService();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch customers');
    }
  }
);

export const fetchCustomerById = createAsyncThunk(
  'garage/fetchCustomerById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getCustomerByIdService(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch customer');
    }
  }
);

export const addCustomer = createAsyncThunk(
  'garage/addCustomer',
  async (customerData: Omit<Customer, '_id'>, { rejectWithValue }) => {
    try {
      const response = await createCustomerService(customerData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create customer');
    }
  }
);

export const updateCustomer = createAsyncThunk(
  'garage/updateCustomer',
  async ({ id, data }: { id: string; data: Partial<Customer> }, { rejectWithValue }) => {
    try {
      const response = await updateCustomerService(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update customer');
    }
  }
);

export const removeCustomer = createAsyncThunk(
  'garage/removeCustomer',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteCustomerService(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete customer');
    }
  }
);

// Async thunks for vehicles
export const fetchVehicles = createAsyncThunk(
  'garage/fetchVehicles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getVehiclesService();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch vehicles');
    }
  }
);

export const fetchVehicleById = createAsyncThunk(
  'garage/fetchVehicleById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getVehicleByIdService(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch vehicle');
    }
  }
);

export const addVehicle = createAsyncThunk(
  'garage/addVehicle',
  async (vehicleData: Omit<Vehicle, '_id'>, { rejectWithValue }) => {
    try {
      const response = await createVehicleService(vehicleData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create vehicle');
    }
  }
);

export const updateVehicle = createAsyncThunk(
  'garage/updateVehicle',
  async ({ id, data }: { id: string; data: Partial<Vehicle> }, { rejectWithValue }) => {
    try {
      const response = await updateVehicleService(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update vehicle');
    }
  }
);

export const removeVehicle = createAsyncThunk(
  'garage/removeVehicle',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteVehicleService(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete vehicle');
    }
  }
);

// Async thunks for service requests
export const fetchServiceRequests = createAsyncThunk(
  'garage/fetchServiceRequests',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getServiceRequestsService();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch service requests');
    }
  }
);

export const fetchServiceRequestById = createAsyncThunk(
  'garage/fetchServiceRequestById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getServiceRequestByIdService(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch service request');
    }
  }
);

export const addServiceRequest = createAsyncThunk(
  'garage/addServiceRequest',
  async (serviceRequestData: Omit<ServiceRequest, '_id'>, { rejectWithValue }) => {
    try {
      const response = await createServiceRequestService(serviceRequestData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create service request');
    }
  }
);

export const updateServiceRequest = createAsyncThunk(
  'garage/updateServiceRequest',
  async ({ id, data }: { id: string; data: Partial<ServiceRequest> }, { rejectWithValue }) => {
    try {
      const response = await updateServiceRequestService(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update service request');
    }
  }
);

export const removeServiceRequest = createAsyncThunk(
  'garage/removeServiceRequest',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteServiceRequestService(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete service request');
    }
  }
);

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
    clearSelectedVehicle: (state) => {
      state.selectedVehicle = null;
    },
    clearSelectedServiceRequest: (state) => {
      state.selectedServiceRequest = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Customers
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomers.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.customers = action.payload.data;
        state.customersCount = action.payload.pagination?.totalItems || 0;
      })
      .addCase(fetchCustomers.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCustomerById.fulfilled, (state, action: PayloadAction<any>) => {
        state.selectedCustomer = action.payload.data;
      })
      .addCase(addCustomer.fulfilled, (state, action: PayloadAction<any>) => {
        state.customers.push(action.payload.data);
      })
      .addCase(updateCustomer.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.customers.findIndex(customer => customer._id === action.payload.data._id);
        if (index !== -1) {
          state.customers[index] = action.payload.data;
        }
        if (state.selectedCustomer?._id === action.payload.data._id) {
          state.selectedCustomer = action.payload.data;
        }
      })
      .addCase(removeCustomer.fulfilled, (state, action: PayloadAction<string>) => {
        state.customers = state.customers.filter(customer => customer._id !== action.payload);
        if (state.selectedCustomer?._id === action.payload) {
          state.selectedCustomer = null;
        }
      })
      
      // Vehicles
      .addCase(fetchVehicles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicles.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.vehicles = action.payload.data;
        state.vehiclesCount = action.payload.pagination?.totalItems || 0;
      })
      .addCase(fetchVehicles.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchVehicleById.fulfilled, (state, action: PayloadAction<any>) => {
        state.selectedVehicle = action.payload.data;
      })
      .addCase(addVehicle.fulfilled, (state, action: PayloadAction<any>) => {
        state.vehicles.push(action.payload.data);
      })
      .addCase(updateVehicle.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.vehicles.findIndex(vehicle => vehicle._id === action.payload.data._id);
        if (index !== -1) {
          state.vehicles[index] = action.payload.data;
        }
        if (state.selectedVehicle?._id === action.payload.data._id) {
          state.selectedVehicle = action.payload.data;
        }
      })
      .addCase(removeVehicle.fulfilled, (state, action: PayloadAction<string>) => {
        state.vehicles = state.vehicles.filter(vehicle => vehicle._id !== action.payload);
        if (state.selectedVehicle?._id === action.payload) {
          state.selectedVehicle = null;
        }
      })
      
      // Service Requests
      .addCase(fetchServiceRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceRequests.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.serviceRequests = action.payload.data;
        state.serviceRequestsCount = action.payload.pagination?.totalItems || 0;
      })
      .addCase(fetchServiceRequests.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchServiceRequestById.fulfilled, (state, action: PayloadAction<any>) => {
        state.selectedServiceRequest = action.payload.data;
      })
      .addCase(addServiceRequest.fulfilled, (state, action: PayloadAction<any>) => {
        state.serviceRequests.push(action.payload.data);
      })
      .addCase(updateServiceRequest.fulfilled, (state, action: PayloadAction<any>) => {
        const index = state.serviceRequests.findIndex(sr => sr._id === action.payload.data._id);
        if (index !== -1) {
          state.serviceRequests[index] = action.payload.data;
        }
        if (state.selectedServiceRequest?._id === action.payload.data._id) {
          state.selectedServiceRequest = action.payload.data;
        }
      })
      .addCase(removeServiceRequest.fulfilled, (state, action: PayloadAction<string>) => {
        state.serviceRequests = state.serviceRequests.filter(sr => sr._id !== action.payload);
        if (state.selectedServiceRequest?._id === action.payload) {
          state.selectedServiceRequest = null;
        }
      });
  },
});

export const { 
  clearSelectedCustomer, 
  clearSelectedVehicle, 
  clearSelectedServiceRequest, 
  setError 
} = garageSlice.actions;

export default garageSlice.reducer;