import React from 'react';
import Sidebar from '../components/shared/Sidebar';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';
import './layout.css'

const Layout = ({ children }) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="content">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
