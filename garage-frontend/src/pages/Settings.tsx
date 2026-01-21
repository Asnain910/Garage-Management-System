import React from 'react';
import { 
  Container, 
  Typography,
  Box,
  Paper
} from '@mui/material';

const Settings: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" mb={3}>Settings</Typography>
      
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" mb={2}>User Settings</Typography>
        <Typography variant="body1">Manage your account settings and preferences here.</Typography>
      </Paper>
    </Container>
  );
};

export default Settings;