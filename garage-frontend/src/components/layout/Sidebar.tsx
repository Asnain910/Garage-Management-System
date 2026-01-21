import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  IconButton,
  Box
} from '@mui/material';
import { 
  Dashboard as DashboardIcon, 
  People as CustomersIcon, 
  DirectionsCar as VehiclesIcon, 
  Build as ServicesIcon, 
  Settings as SettingsIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  const drawerWidth = 240;

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Customers', icon: <CustomersIcon />, path: '/customers' },
    { text: 'Vehicles', icon: <VehiclesIcon />, path: '/vehicles' },
    { text: 'Services', icon: <ServicesIcon />, path: '/services' },
  ];

  // Only add settings if user is admin
  if (user?.role === 'admin') {
    menuItems.push({ text: 'Settings', icon: <SettingsIcon />, path: '/settings' });
  }

  const drawer = (
    <div>
      <Box sx={{ padding: '16px 16px 8px 16px' }}>
        <h2>Garage System</h2>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item, index) => (
          <ListItem 
            button 
            key={item.text}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              backgroundColor: location.pathname === item.path ? 'primary.main' : 'inherit',
              color: location.pathname === item.path ? 'white' : 'inherit',
              '&:hover': {
                backgroundColor: location.pathname === item.path ? 'primary.dark' : 'action.hover',
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname === item.path ? 'white' : 'inherit',
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {/* Temporary drawer for mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Permanent drawer for desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;