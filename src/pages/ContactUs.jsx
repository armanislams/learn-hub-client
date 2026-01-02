import React, { useState } from "react";
import useTitle from "../hooks/useTitle";

const ContactUs = () => {
  useTitle("Contact Us");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-indigo-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-indigo-100">
            We'd love to hear from you. Send us a message!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Contact Info Cards */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-indigo-600 text-4xl mb-4">📍</div>
            <h3 className="text-xl font-semibold mb-2">Address</h3>
            <p className="text-gray-600">
              LearnHub Inc.
              <br />
              123 Education Street
              <br />
              Tech City, TC 12345
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-indigo-600 text-4xl mb-4">📧</div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-gray-600">
              <a
                href="mailto:support@learnhub.com"
                className="text-indigo-600 hover:underline"
              >
                support@learnhub.com
              </a>
              <br />
              <a
                href="mailto:info@learnhub.com"
                className="text-indigo-600 hover:underline"
              >
                info@learnhub.com
              </a>
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-indigo-600 text-4xl mb-4">📞</div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-gray-600">
              +1 (555) 123-4567
              <br />
              Monday - Friday: 9AM - 6PM
              <br />
              Saturday - Sunday: 10AM - 4PM
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Send us a Message</h2>

          {submitted && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-4 rounded-lg mb-6">
              ✓ Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="your@email.com"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Message subject"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                placeholder="Your message here..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Social Media Section */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold mb-6 text-gray-800">Follow Us</h3>
          <div className="flex justify-center gap-6">
            <a
              href="#"
              className="bg-indigo-600 text-white p-4 rounded-full hover:bg-indigo-700 transition duration-200"
            >
              🔗 LinkedIn
            </a>
            <a
              href="#"
              className="bg-indigo-600 text-white p-4 rounded-full hover:bg-indigo-700 transition duration-200"
            >
              🐦 Twitter
            </a>
            <a
              href="#"
              className="bg-indigo-600 text-white p-4 rounded-full hover:bg-indigo-700 transition duration-200"
            >
              📘 Facebook
            </a>
            <a
              href="#"
              className="bg-indigo-600 text-white p-4 rounded-full hover:bg-indigo-700 transition duration-200"
            >
              📷 Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
