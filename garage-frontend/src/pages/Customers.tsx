import React, { useEffect } from 'react';
import { 
  Container, 
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCustomers } from '../store/slices/garageSlice';

const Customers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { customers, loading } = useAppSelector((state) => state.garage);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Customers</Typography>
        <Button variant="contained" color="primary">
          Add Customer
        </Button>
      </Box>
      
      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Typography>Loading customers...</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Active</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer._id}>
                    <TableCell>{customer.firstName} {customer.lastName}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.phone}</TableCell>
                    <TableCell>{customer.isActive ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Container>
  );
};

export default Customers;