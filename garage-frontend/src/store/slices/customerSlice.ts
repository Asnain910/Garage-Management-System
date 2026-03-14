import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customerService, { Customer } from '../../services/customerService';

interface CustomerState {
  customers: Customer[];
  currentCustomer: Customer | null;
  totalPages: number;
  currentPage: number;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: CustomerState = {
  customers: [],
  currentCustomer: null,
  totalPages: 0,
  currentPage: 1,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Get customers
export const getCustomers = createAsyncThunk(
  'customers/getAll',
  async ({ page, search }: { page: number; search: string }, thunkAPI) => {
    try {
      return await customerService.getCustomers(page, search);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single customer
export const getCustomer = createAsyncThunk(
  'customers/getOne',
  async (id: string, thunkAPI) => {
    try {
      return await customerService.getCustomer(id);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create customer
export const createCustomer = createAsyncThunk(
  'customers/create',
  async (customerData: Partial<Customer>, thunkAPI) => {
    try {
      return await customerService.createCustomer(customerData);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload.customers;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers.unshift(action.payload);
      });
  }
});

export const { reset } = customerSlice.actions;
export default customerSlice.reducer;
