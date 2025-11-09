import React from 'react';

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-16">
    <p>© {new Date().getFullYear()} LearnSphere. All rights reserved.</p>
    <div className="flex justify-center gap-4 mt-2 text-lg">
      <a href="#" className="hover:text-white">
        🌐
      </a>
      <a href="#" className="hover:text-white">
        📘
      </a>
      <a href="#" className="hover:text-white">
        🐦
      </a>
    </div>
  </footer>
);

export default Footer;
