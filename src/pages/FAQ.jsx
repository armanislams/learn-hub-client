import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      id: 1,
      category: 'Getting Started',
      question: 'How do I create an account on LearnHub?',
      answer: 'Creating an account is simple! Click the "Sign Up" button on the homepage, enter your email, create a password, and follow the verification steps. You can also sign up using your Google or Facebook account for faster registration.'
    },
    {
      id: 2,
      category: 'Getting Started',
      question: 'Is there a free trial available?',
      answer: 'Yes! We offer a 7-day free trial for all new users. You can explore courses, watch sample videos, and access learning materials during the trial period. No credit card required to start your trial.'
    },
    {
      id: 3,
      category: 'Courses',
      question: 'Can I download courses for offline learning?',
      answer: 'Absolutely! All course videos and materials can be downloaded to your device. You can access them offline anytime, anywhere, making learning flexible and convenient.'
    },
    {
      id: 4,
      category: 'Courses',
      question: 'What if I don\'t like a course?',
      answer: 'We offer a 30-day money-back guarantee on all purchases. If you\'re not satisfied with a course, you can request a refund within 30 days of enrollment, no questions asked.'
    },
    {
      id: 5,
      category: 'Courses',
      question: 'How long does it take to complete a course?',
      answer: 'Course duration varies depending on the course content and your learning pace. Most courses range from 2 to 10 hours of video content. You can complete them at your own pace, and the course access is lifetime.'
    },
    {
      id: 6,
      category: 'Certificates',
      question: 'Will I get a certificate after completing a course?',
      answer: 'Yes! Upon successful completion of a course, you\'ll receive a professional certificate that you can add to your resume, LinkedIn profile, or portfolio. These certificates are recognized by many employers.'
    },
    {
      id: 7,
      category: 'Certificates',
      question: 'Are the certificates recognized by employers?',
      answer: 'Our certificates are recognized by many companies and institutions worldwide. However, the value depends on the course, instructor, and your industry. We recommend checking with your target employers.'
    },
    {
      id: 8,
      category: 'Technical Support',
      question: 'What devices can I use to access courses?',
      answer: 'LearnHub is accessible on all devices: computers, tablets, and smartphones. Our platform is fully responsive and works on iOS, Android, Windows, and Mac operating systems.'
    },
    {
      id: 9,
      category: 'Technical Support',
      question: 'What should I do if I face technical issues?',
      answer: 'If you experience any technical problems, please contact our support team through the "Contact Us" page or email support@learnhub.com. Our team typically responds within 24 hours.'
    },
    {
      id: 10,
      category: 'Payments',
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit/debit cards (Visa, MasterCard, American Express), PayPal, and various digital payment methods. All transactions are secure and encrypted.'
    },
  ];

  const filteredFAQ = faqData.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['All', ...new Set(faqData.map(item => item.category))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const displayedFAQ = selectedCategory === 'All'
    ? filteredFAQ
    : filteredFAQ.filter(item => item.category === selectedCategory);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const expandVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { height: 'auto', opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-12 mb-12"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Find answers to common questions about LearnHub courses, payments, certificates, and more.
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md"
            />
            <svg
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <AnimatePresence mode="wait">
            {displayedFAQ.length > 0 ? (
              <div className="space-y-4">
                {displayedFAQ.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <div className="flex items-start gap-4 text-left flex-1">
                        <div className="flex-shrink-0 mt-1">
                          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 font-semibold text-sm">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wide">
                            {item.category}
                          </span>
                          <p className="text-lg font-semibold text-gray-800 mt-1">
                            {item.question}
                          </p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: activeIndex === item.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 ml-4"
                      >
                        <svg
                          className="w-6 h-6 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {activeIndex === item.id && (
                        <motion.div
                          initial="collapsed"
                          animate="expanded"
                          exit="collapsed"
                          variants={expandVariants}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                            <p className="text-gray-700 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-500 text-lg">
                  No FAQs found. Try adjusting your search or filters.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-indigo-50 rounded-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Didn't find your answer?
          </h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to help. Contact us for personalized assistance.
          </p>
          <motion.a
            href="/contact-us"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-indigo-700 transition shadow-md"
          >
            Contact Support
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;