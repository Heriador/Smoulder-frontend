/* eslint-disable space-before-function-paren */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable react/prop-types */

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function ProtectedRoute({ children }) {
  const isLoggedin = useSelector((state) => state.AuthReducer.isLoggedIn);

  return isLoggedin ? children : <Navigate to="/login" />;
}
