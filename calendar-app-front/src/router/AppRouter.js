import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from "react-router-dom";
import { startChecking } from '../actions/auth';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { AuthRoutes } from './AuthRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

  const { checking, uid } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch( startChecking() )
  }, [dispatch])

  if( checking ) {
    return (<h5>Espere...</h5>)
  }

  return (
    <Routes>

      <Route
        path="/auth/*" 
        element={
          <PublicRoute isAuthenticated={ !!uid }>
            <AuthRoutes /> 
          </PublicRoute>
        } 
      />
      
      <Route
        path="/"
        element={
          <PrivateRoute isAuthenticated={ !!uid }>
            <CalendarScreen />
          </PrivateRoute>
        } 
      />

      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  )
}
