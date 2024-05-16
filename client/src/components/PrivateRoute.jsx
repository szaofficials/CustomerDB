import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../api/auth';
import { toast } from 'react-toastify';

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();

  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     toast.error('Pehle Login Karo');
  //   }
  // }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
