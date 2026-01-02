import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const FaqCta = () => {
    return (
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className=" mb-10 max-w-7xl mx-auto bg-gradient-to-r from-indigo-600 to-blue-600 py-20 px-4"
      >
        <div className="container mx-auto max-w-5xl text-center text-white">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl mb-6"
          >
            ❓
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Have Questions?
          </h2>
          <p className="text-indigo-100 text-base md:text-lg mb-10 max-w-3xl mx-auto leading-relaxed">
            Find quick answers to common questions about courses, accounts,
            payments, and more. Check our comprehensive FAQ section.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="#faq"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-600 font-semibold py-3 px-10 rounded-full hover:bg-gray-100 transition shadow-lg w-full sm:w-auto"
            >
              Explore FAQs
            </motion.a>
            <motion.a
              href="/contact-us"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-white font-semibold py-3 px-10 rounded-full border-2 border-white hover:bg-white hover:text-indigo-600 transition w-full sm:w-auto"
            >
              Contact Us
            </motion.a>
          </div>
        </div>
      </motion.section>
    );
};

export default FaqCta;