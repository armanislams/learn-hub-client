import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import useTitle from '../hooks/useTitle';

const AboutUs = () => {
  useTitle('About Us');

  const values = [
    {
      icon: '🎯',
      title: 'Student-Centric',
      description: 'We prioritize student success and create learning experiences that inspire growth.'
    },
    {
      icon: '✨',
      title: 'Quality Education',
      description: 'Our courses are crafted by industry experts with proven track records.'
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'We foster a supportive learning community where students help each other grow.'
    },
    {
      icon: '🚀',
      title: 'Innovation',
      description: 'We constantly innovate to provide cutting-edge learning technologies and methods.'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'LearnHub Founded',
      description: 'Started with a vision to make quality education accessible to everyone worldwide.'
    },
    {
      year: '2021',
      title: 'First 1000 Students',
      description: 'Reached milestone of 1000 active learners across multiple countries.'
    },
    {
      year: '2022',
      title: 'Expanded Course Library',
      description: 'Launched 100+ new courses and brought on 50+ expert instructors.'
    },
    {
      year: '2023',
      title: '10,000+ Students',
      description: 'Reached 10,000 students and expanded to 15 countries.'
    },
    {
      year: '2024',
      title: '50,000+ Students',
      description: 'Celebrating 50,000+ learners and growing community worldwide.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      bio: 'Educational technologist with 15+ years of experience in online learning.',
      image: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-founder',
      bio: 'Full-stack developer passionate about creating scalable learning platforms.',
      image: 'https://i.pravatar.cc/150?img=2'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Instructors',
      bio: 'Curriculum expert with expertise in course design and instructor training.',
      image: 'https://i.pravatar.cc/150?img=3'
    },
    {
      name: 'David Kim',
      role: 'Head of Community',
      bio: 'Community builder focused on creating engagement and student success.',
      image: 'https://i.pravatar.cc/150?img=4'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Students' },
    { number: '500+', label: 'Expert Courses' },
    { number: '100+', label: 'Instructors' },
    { number: '15', label: 'Countries' }
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
    <div className="min-h-screen bg-white mb-10">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-20 px-4"
      >
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            About LearnHub
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Empowering learners worldwide with quality education, expert instructors, and innovative learning experiences.
          </p>
        </div>
      </motion.div>

      {/* Mission & Vision */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="py-16 px-4 bg-gray-50"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                LearnHub is committed to making world-class education accessible, affordable, and engaging for everyone. We believe that learning is a lifelong journey, and we're here to support you at every step.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is to transform education by connecting passionate learners with expert instructors and creating a community where knowledge flourishes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                We envision a world where quality education is not a privilege but a right for everyone. Where geographical boundaries don't limit opportunities, and anyone with determination can learn and succeed.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By leveraging technology and innovation, we're building the future of learning—one student at a time.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Core Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at LearnHub.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
                whileHover={{ y: -5 }}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 px-4"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-5xl md:text-6xl font-bold mb-3">{stat.number}</p>
                <p className="text-indigo-100 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Leadership Team */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the passionate individuals leading LearnHub's mission.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
                  <p className="text-indigo-600 font-semibold mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to a global learning platform.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-600 to-blue-600 transform -translate-x-1/2" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="space-y-8"
            >
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={`flex gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="flex-1 hidden md:block" />
                  <div className="w-8 h-8 rounded-full bg-indigo-600 border-4 border-white flex-shrink-0 mt-1" />
                  <div className="flex-1 bg-white rounded-lg shadow-md p-6 border border-gray-100">
                    <p className="text-indigo-600 font-bold text-lg mb-2">{item.year}</p>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-16 px-4"
      >
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl opacity-90 mb-8">
            Start your learning journey with LearnHub today and transform your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/all-course"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-600 font-semibold py-3 px-10 rounded-full hover:bg-gray-100 transition shadow-lg"
            >
              Explore Courses
            </motion.a>
            <motion.a
              href="/contact-us"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent text-white font-semibold py-3 px-10 rounded-full border-2 border-white hover:bg-white hover:text-indigo-600 transition"
            >
              Get in Touch
            </motion.a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs;