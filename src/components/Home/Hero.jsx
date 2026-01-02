import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Learn Without Limits 🚀",
      subtitle: "Explore courses, gain skills, and achieve your dreams — all in one platform.",
      gradient: "from-indigo-600 to-blue-600",
      cta: "Explore Courses",
      ctaLink: "/all-course",
      emoji: "🎓"
    },
    {
      id: 2,
      title: "Master New Skills 💡",
      subtitle: "Learn from industry experts and advance your career with hands-on projects.",
      gradient: "from-blue-600 to-cyan-600",
      cta: "Browse Courses",
      ctaLink: "/all-course",
      emoji: "👨‍🏫"
    },
    {
      id: 3,
      title: "Transform Your Future 🌟",
      subtitle: "Join thousands of students who have already achieved their learning goals.",
      gradient: "from-purple-600 to-pink-600",
      cta: "Get Started",
      ctaLink: "/all-course",
      emoji: "🏆"
    },
    {
      id: 4,
      title: "Flexible Learning 📱",
      subtitle: "Learn at your own pace, anytime, anywhere with lifetime access.",
      gradient: "from-green-600 to-emerald-600",
      cta: "View Courses",
      ctaLink: "/all-course",
      emoji: "⏰"
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [autoPlay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoPlay(false);
  };

  const slide = slides[currentSlide];

  const slideVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="relative w-full overflow-hidden md:h-[70vh]">
      <AnimatePresence mode="wait">
        <motion.section
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8 }}
          className={`w-full bg-gradient-to-r ${slide.gradient} py-10 text-center relative`}
        >
          <div className="max-w-4xl mx-auto px-4">
            {/* Large emoji animation */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl mb-6"
            >
              {slide.emoji}
            </motion.div>

            {/* Title animation */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-6xl font-extrabold mb-4 text-white"
            >
              {slide.title}
            </motion.h1>

            {/* Subtitle animation */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl mb-8 opacity-90 text-white max-w-2xl mx-auto"
            >
              {slide.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to={slide.ctaLink}
                className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition transform"
              >
                {slide.cta}
              </Link>
              <Link
                to="/contact-us"
                className="bg-transparent text-white font-semibold py-3 px-8 rounded-full border-2 border-white hover:bg-white hover:text-indigo-600 hover:scale-105 transition transform"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </motion.section>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-3 transition z-20"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 text-white rounded-full p-3 transition z-20"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition ${
              index === currentSlide
                ? "bg-white w-8 h-3"
                : "bg-white/50 w-3 h-3 hover:bg-white/70"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <button
        onClick={() => setAutoPlay(!autoPlay)}
        className="absolute top-6 right-6 bg-white/30 hover:bg-white/50 text-white rounded-full p-2 transition z-20"
        title={autoPlay ? "Pause auto-play" : "Resume auto-play"}
      >
        {autoPlay ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.5 2a1.5 1.5 0 011.5 1.5v13a1.5 1.5 0 01-3 0V3.5A1.5 1.5 0 015.5 2zm8 0a1.5 1.5 0 011.5 1.5v13a1.5 1.5 0 01-3 0V3.5A1.5 1.5 0 0113.5 2z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Hero;