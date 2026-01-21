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
import { fetchServiceRequests } from '../store/slices/garageSlice';

const ServiceRequests: React.FC = () => {
  const dispatch = useAppDispatch();
  const { serviceRequests, loading } = useAppSelector((state) => state.garage);

  useEffect(() => {
    dispatch(fetchServiceRequests());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Service Requests</Typography>
        <Button variant="contained" color="primary">
          Add Service Request
        </Button>
      </Box>
      
      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Typography>Loading service requests...</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Service Type</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Customer</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {serviceRequests.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell>{request.serviceType}</TableCell>
                    <TableCell>{request.description}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>{request.priority}</TableCell>
                    <TableCell>{request.customerId}</TableCell>
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

export default ServiceRequests;