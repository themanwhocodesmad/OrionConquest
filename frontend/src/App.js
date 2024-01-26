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
import Chat from './v1/presentation_layer/pages/main/Chat';
import Forge from './v1/presentation_layer/pages/secondary/Forge';
import TroopConstruction from './v1/presentation_layer/pages/secondary/TroopConstruction';

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
            <Route path="/chat" element={<Layout><Chat /></Layout>}
            />
            <Route path="/forge" element={<Layout><Forge /></Layout>} />
            <Route path="/forge/:troopId/:troopName" element={<Layout><TroopConstruction /></Layout>} />
          </Routes>
        </PlanetProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
