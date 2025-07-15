import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import Admin from './Admin';

export default function AdminRedirect() {
  // Check if user is already authenticated
  if (isAuthenticated()) {
    return <Navigate to='/admin/dashboard' replace />;
  }

  // If not authenticated, show the login form
  return <Admin />;
}
