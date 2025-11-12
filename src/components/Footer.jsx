import React from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => (
  <footer className="bg-gray-900 text-white text-center py-6 mt-16">
    <Link to="/" className="text-2xl font-bold  text-indigo-600">
      LearnHub
    </Link>
    <p>© {new Date().getFullYear()} LearnHub. All rights reserved.</p>
    <div className="flex justify-center gap-4 mt-2 text-lg">
      <Link to={'https://facebook.com'} target='_blank' className="text-white">
        <FaFacebook></FaFacebook>
      </Link>
      <Link to={'https://x.com'} target='_blank' className="text-white">
        <FaXTwitter />
      </Link>
      <Link to={'https://instagram.com'} target='_blank' className="text-white">
        <FaInstagram/>
      </Link>
    </div>
  </footer>
);

export default Footer;
