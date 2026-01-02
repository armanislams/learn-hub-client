import React from 'react';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';

const HomeLayout = () => {
    return (
      <div className="max-w-7xl mx-auto">
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
        <ToastContainer></ToastContainer>
      </div>
    );
};

export default HomeLayout;