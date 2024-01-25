import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './v1/presentation_layer/layouts/Layout'
import SignIn from './v1/presentation_layer/pages/authentication/SignIn';
import Home from './v1/presentation_layer/pages/main/Home';
import About from './v1/presentation_layer/pages/main/About';
import Logout from './v1/presentation_layer/pages/main/Logout';
import {AuthProvider} from './v1/business_layer/context/AuthContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/logout" element={<Layout><Logout /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/home" element={<Layout><Home /></Layout>} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
