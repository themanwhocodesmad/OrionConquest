// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/context/auth-context';
import SignIn from '../src/pages/authentication/sign-in-page';
import Welcome from '../src/pages/welcome';
import AuthCallbackComponent from '../src/components/authentication/auth-callback-component';
import ProtectedRoute from '../src/components/authentication/protected-routes-component';
import Home from './pages/main/home';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/auth-callback" element={<AuthCallbackComponent />} />
          <Route path="/welcome" element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          {/* other routes */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;