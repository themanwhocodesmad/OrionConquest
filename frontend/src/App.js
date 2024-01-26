// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './v1/presentation_layer/layouts/Layout';
import SignIn from './v1/presentation_layer/pages/authentication/SignIn';
import Home from './v1/presentation_layer/pages/main/Home';
import About from './v1/presentation_layer/pages/main/About';
import Logout from './v1/presentation_layer/pages/main/Logout';
import Welcome from './v1/presentation_layer/pages/main/Welcome';
import { AuthProvider } from './v1/business_layer/context/AuthContext';
import { PlanetProvider } from './v1/business_layer/context/PlanetContext';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <PlanetProvider>
          <Routes>
            <Route path="/logout" element={<Layout><Logout /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/" element={<SignIn />} />
            <Route path="/welcome" element={<Layout><Welcome /></Layout>} />
            <Route
              path="/home/:planetId"  // Define the route parameter
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
          </Routes>
        </PlanetProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
