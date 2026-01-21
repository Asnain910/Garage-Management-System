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
import { fetchVehicles } from '../store/slices/garageSlice';

const Vehicles: React.FC = () => {
  const dispatch = useAppDispatch();
  const { vehicles, loading } = useAppSelector((state) => state.garage);

  useEffect(() => {
    dispatch(fetchVehicles());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Vehicles</Typography>
        <Button variant="contained" color="primary">
          Add Vehicle
        </Button>
      </Box>
      
      <Paper sx={{ p: 2 }}>
        {loading ? (
          <Typography>Loading vehicles...</Typography>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Make</TableCell>
                  <TableCell>Model</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>License Plate</TableCell>
                  <TableCell>VIN</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle._id}>
                    <TableCell>{vehicle.make}</TableCell>
                    <TableCell>{vehicle.model}</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>{vehicle.licensePlate}</TableCell>
                    <TableCell>{vehicle.vin}</TableCell>
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

export default Vehicles;