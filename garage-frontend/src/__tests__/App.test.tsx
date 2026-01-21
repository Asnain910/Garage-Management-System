import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import App from '../App';

describe('App Component', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    // Since the App component renders different content based on route,
    // we can check for common elements or just ensure it renders
    expect(screen.getByText(/Garage Management System/i)).toBeInTheDocument();
  });
});