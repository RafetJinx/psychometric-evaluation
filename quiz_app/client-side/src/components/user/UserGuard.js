import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';

const UserGuard = ({ path, element }) => {
  const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path={path} element={element} />
    </Routes>
  );
};

export default UserGuard;
