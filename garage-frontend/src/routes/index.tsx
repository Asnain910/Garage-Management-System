import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Customers from '../pages/Customers';
import Vehicles from '../pages/Vehicles';
import ServiceRequests from '../pages/ServiceRequests';
import ProtectedRoute from '../components/auth/ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <Layout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: 'customers',
                element: <Customers />
            },
            {
                path: 'vehicles',
                element: <Vehicles />
            },
            {
                path: 'service-requests',
                element: <ServiceRequests />
            }
        ]
    }
]);
