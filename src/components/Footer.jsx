import React from 'react';

const Footer = () => (
  <footer className="bg-gray-900 text-base-content-300 text-base-contentcenter py-6 mt-16">
    <p>© {new Date().getFullYear()} LearnHub. All rights reserved.</p>
    <div className="flex justify-center gap-4 mt-2 text-base-contentlg">
      <a href="#" className="hover:text-base-content">
        🌐
      </a>
      <a href="#" className="hover:text-base-content">
        📘
      </a>
      <a href="#" className="hover:text-base-content">
        🐦
      </a>
    </div>
  </footer>
);

export default Footer;
