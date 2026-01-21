import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Vehicles from './pages/Vehicles';
import ServiceRequests from './pages/ServiceRequests';
import Settings from './pages/Settings';

import './styles/global.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={
              <Layout>
                <Dashboard />
              </Layout>
            } />
            <Route path="/dashboard" element={
              <Layout>
                <Dashboard />
              </Layout>
            } />
            <Route path="/customers" element={
              <Layout>
                <Customers />
              </Layout>
            } />
            <Route path="/vehicles" element={
              <Layout>
                <Vehicles />
              </Layout>
            } />
            <Route path="/services" element={
              <Layout>
                <ServiceRequests />
              </Layout>
            } />
            <Route path="/settings" element={
              <Layout>
                <Settings />
              </Layout>
            } />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;