import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { label: 'Browse Courses', href: '/all-course' },
        { label: 'Become an Instructor', href: '/add-course' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about-us' },
        { label: 'Contact Us', href: '/contact-us' },
      ]
    },
  ];

  const socialLinks = [
    {
      icon: FaFacebook,
      href: 'https://facebook.com/learnhub',
      label: 'Facebook'
    },
    {
      icon: FaXTwitter,
      href: 'https://twitter.com/learnhub',
      label: 'Twitter'
    },
    {
      icon: FaInstagram,
      href: 'https://instagram.com/learnhub',
      label: 'Instagram'
    },
    {
      icon: FaLinkedin,
      href: 'https://linkedin.com/company/learnhub',
      label: 'LinkedIn'
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-10">
          {/* Brand Section */}
          <div className="col-span-1">
            <Link
              to="/"
              className="text-2xl font-bold text-indigo-600 hover:text-indigo-500 transition mb-4 block"
            >
              LearnHub
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Empowering learners worldwide with quality education and expert
              instructors.
            </p>
            <div className="flex gap-4 items-center">
              {socialLinks.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-gray-400 hover:text-indigo-600 transition duration-200"
                    title={social.label}
                  >
                    <Icon className="text-xl" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, idx) => (
            <div key={idx} className="col-span-1">
              <h3 className="text-white font-semibold mb-4 text-lg">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-indigo-600 transition duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">📞 Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-indigo-600">📧</span>
                <div>
                  <p className="text-gray-400 mb-1">Email</p>
                  <a
                    href="mailto:support@learnhub.com"
                    className="text-gray-300 hover:text-indigo-600 transition"
                  >
                    support@learnhub.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-indigo-600">📱</span>
                <div>
                  <p className="text-gray-400 mb-1">Phone</p>
                  <a
                    href="tel:+1-555-123-4567"
                    className="text-gray-300 hover:text-indigo-600 transition"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-4">
              📍 Office Location
            </h4>
            <div className="text-sm">
              <p className="text-gray-300 mb-1">LearnHub Inc.</p>
              <p className="text-gray-400 mb-1">123 Education Street</p>
              <p className="text-gray-400 mb-1">Tech City, TC 12345</p>
              <p className="text-gray-400">United States</p>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-4 flex justify-center flex-col md:flex-row  items-center gap-4">
          <p className="text-sm text-gray-400">
            © {currentYear}{" "}
            <span className="text-indigo-600 font-semibold">LearnHub</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
