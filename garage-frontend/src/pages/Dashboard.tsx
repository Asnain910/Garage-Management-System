import React, { useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography,
  Box
} from '@mui/material';
import { 
  People as CustomersIcon, 
  DirectionsCar as VehiclesIcon, 
  Build as ServicesIcon,
  MonetizationOn as RevenueIcon
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCustomers } from '../store/slices/garageSlice';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { customers, customersCount, vehiclesCount, serviceRequestsCount } = useAppSelector(
    (state) => state.garage
  );

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Customers Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              height: 120,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CustomersIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h5" component="h2" sx={{ mt: 1 }}>
              {customersCount}
            </Typography>
            <Typography color="text.secondary">
              Customers
            </Typography>
          </Paper>
        </Grid>
        
        {/* Vehicles Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              height: 120,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <VehiclesIcon sx={{ fontSize: 40, color: 'secondary.main' }} />
            <Typography variant="h5" component="h2" sx={{ mt: 1 }}>
              {vehiclesCount}
            </Typography>
            <Typography color="text.secondary">
              Vehicles
            </Typography>
          </Paper>
        </Grid>
        
        {/* Service Requests Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              height: 120,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ServicesIcon sx={{ fontSize: 40, color: 'success.main' }} />
            <Typography variant="h5" component="h2" sx={{ mt: 1 }}>
              {serviceRequestsCount}
            </Typography>
            <Typography color="text.secondary">
              Service Requests
            </Typography>
          </Paper>
        </Grid>
        
        {/* Revenue Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            sx={{ 
              p: 2, 
              display: 'flex', 
              flexDirection: 'column', 
              height: 120,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <RevenueIcon sx={{ fontSize: 40, color: 'warning.main' }} />
            <Typography variant="h5" component="h2" sx={{ mt: 1 }}>
              $0
            </Typography>
            <Typography color="text.secondary">
              Revenue
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Recent Customers */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Customers
            </Typography>
            {customers.length > 0 ? (
              <Box>
                {customers.slice(0, 5).map((customer) => (
                  <Typography key={customer._id} variant="body2">
                    {customer.firstName} {customer.lastName}
                  </Typography>
                ))}
              </Box>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No customers found
              </Typography>
            )}
          </Paper>
        </Grid>
        
        {/* Recent Service Requests */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Service Requests
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No service requests found
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;