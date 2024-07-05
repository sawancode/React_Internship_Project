import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserForm from './components/UserForm';
import SecondPage from './components/SecondPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/second-page" element={<ProtectedRoute><SecondPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userDetails = localStorage.getItem('userDetails');
  return userDetails ? <>{children}</> : <Navigate to="/" />;
};

export default App;
