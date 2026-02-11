import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    customers: [],
    isLoading: false,
    isError: false,
    message: ''
};

const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {}
});

export default customerSlice.reducer;
