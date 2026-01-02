import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import useTitle from '../../hooks/useTitle';

const Features = () => {
  useTitle('Features');

  const features = [
    {
      id: 1,
      icon: '🎓',
      title: 'Expert Instructors',
      description: 'Learn from industry experts with years of experience in their fields.',
      color: 'from-indigo-500 to-indigo-600',
      delay: 0.1
    },
    {
      id: 2,
      icon: '📱',
      title: 'Learn Anywhere',
      description: 'Access courses on any device - desktop, tablet, or mobile phone.',
      color: 'from-blue-500 to-blue-600',
      delay: 0.2
    },
    {
      id: 3,
      icon: '⏰',
      title: 'Learn at Your Pace',
      description: 'Study according to your schedule with lifetime course access.',
      color: 'from-cyan-500 to-cyan-600',
      delay: 0.3
    },
    {
      id: 4,
      icon: '🏆',
      title: 'Certifications',
      description: 'Earn recognized certificates upon successful course completion.',
      color: 'from-green-500 to-green-600',
      delay: 0.4
    },
    {
      id: 5,
      icon: '👥',
      title: 'Community Support',
      description: 'Join a vibrant community of learners and get peer support.',
      color: 'from-purple-500 to-purple-600',
      delay: 0.5
    },
    {
      id: 6,
      icon: '💡',
      title: 'Hands-on Projects',
      description: 'Build real-world projects to enhance your practical skills.',
      color: 'from-pink-500 to-pink-600',
      delay: 0.6
    },
    {
      id: 7,
      icon: '📊',
      title: 'Progress Tracking',
      description: 'Monitor your learning progress with detailed analytics dashboard.',
      color: 'from-orange-500 to-orange-600',
      delay: 0.7
    },
    {
      id: 8,
      icon: '🔄',
      title: 'Lifetime Updates',
      description: 'Get updated course content as new techniques and trends emerge.',
      color: 'from-red-500 to-red-600',
      delay: 0.8
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose LearnHub?
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Discover the powerful features that make LearnHub the best platform for online learning.
          </p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className="group"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
                {/* Icon Background */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-lg bg-gradient-to-r ${feature.color} mb-4 text-4xl`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Indicator */}
                <div className="mt-4 flex items-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 10l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 my-16"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl md:text-5xl font-bold mb-2">50K+</p>
              <p className="text-indigo-100">Students</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl md:text-5xl font-bold mb-2">500+</p>
              <p className="text-indigo-100">Courses</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl md:text-5xl font-bold mb-2">100+</p>
              <p className="text-indigo-100">Instructors</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p className="text-4xl md:text-5xl font-bold mb-2">95%</p>
              <p className="text-indigo-100">Satisfaction</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get started with LearnHub in just a few simple steps.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: '1', title: 'Sign Up', description: 'Create your free account in seconds' },
            { step: '2', title: 'Browse', description: 'Explore thousands of courses' },
            { step: '3', title: 'Enroll', description: 'Choose your favorite course' },
            { step: '4', title: 'Learn', description: 'Start your learning journey' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-indigo-600 text-white text-2xl font-bold mb-4">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
              {index < 3 && (
                <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-indigo-50 py-16 my-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of students already learning on LearnHub. Start your free trial today!
          </p>
          <motion.a
            href="/all-course"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-indigo-600 text-white font-semibold py-4 px-12 rounded-full hover:bg-indigo-700 transition shadow-lg"
          >
            Explore All Courses
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default Features;