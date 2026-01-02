import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';

const Root = () => {
    return (
      <div className="bg-indigo-400 root">
        <Header></Header>
        <Outlet></Outlet>
        <Footer></Footer>
        <ToastContainer></ToastContainer>
      </div>
    );
};

export default Root;