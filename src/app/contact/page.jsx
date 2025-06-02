"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaWhatsapp, FaInstagram } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", 
        },
        body: JSON.stringify({
          access_key: "YOUR_WEB3FORMS_ACCESS_KEY", 
          subject: formData.subject || "Contact Form Submission",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Your message has been sent! We'll get back to you soon.",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          success: false,
          message: result.message || "There was an error sending your message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus({
        success: false,
        message: "Network error or server issue. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };


  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center py-16 px-4 bg-black text-white overflow-hidden">
      <section id="contact" className="relative z-10 flex flex-col items-center w-full max-w-7xl px-4 py-8 md:py-16">
        <motion.h1
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 md:mb-10 text-center tracking-wide bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Contact Us
        </motion.h1>

        <motion.p
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="text-base sm:text-lg max-w-2xl text-gray-400 mb-12 text-center"
        >
          Have questions about Project Nebula or want to join SAST? Reach out to
          us through any of these channels or use the form below.
        </motion.p>

        <div className="flex flex-col w-full max-w-5xl gap-10">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10 mx-auto"
          >
            <a
              href="mailto:contact@sast.org"
              className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white w-48 sm:w-56 md:w-60 transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-blue-500/30"
            >
              <FaEnvelope size={36} className="text-blue-400 mb-4" />
              <span className="text-xl sm:text-2xl font-semibold mb-2">Email</span>
              <span className="text-sm text-gray-400 text-center">contact@sast.org</span>
            </a>

            <a
              href="https://github.com/SASTxNST"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white w-48 sm:w-56 md:w-60 transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-blue-500/30"
            >
              <FaGithub size={36} className="text-blue-400 mb-4" />
              <span className="text-xl sm:text-2xl font-semibold mb-2">GitHub</span>
              <span className="text-sm text-gray-400 text-center">SASTxNST</span>
            </a>

            <a
              href="https://chat.whatsapp.com/CxIYJykKovVB1jfHnxuIuR"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white w-48 sm:w-56 md:w-60 transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-blue-500/30"
            >
              <FaWhatsapp size={36} className="text-blue-400 mb-4" />
              <span className="text-xl sm:text-2xl font-semibold mb-2">WhatsApp</span>
              <span className="text-sm text-gray-400 text-center">Join our community</span>
            </a>

            <a
              href="https://www.instagram.com/sast.rishihood/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 sm:p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white w-48 sm:w-56 md:w-60 transition-all duration-300 shadow-lg hover:scale-105 hover:shadow-blue-500/30"
            >
              <FaInstagram size={36} className="text-blue-400 mb-4" />
              <span className="text-xl sm:text-2xl font-semibold mb-2">Instagram</span>
              <span className="text-sm text-gray-400 text-center">@sast.rishihood</span>
            </a>
          </motion.div>

          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-3xl mx-auto bg-white/5 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md border border-white/10"
          >
            <form onSubmit={handleSubmit} noValidate>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 bg-black/60 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-sm sm:text-base"
                disabled={isSubmitting}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 bg-black/60 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-sm sm:text-base"
                disabled={isSubmitting}
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 bg-black/60 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-sm sm:text-base"
                disabled={isSubmitting}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                required
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 sm:p-4 bg-black/60 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 min-h-[120px] sm:min-h-[140px] resize-y text-sm sm:text-base"
                disabled={isSubmitting}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 sm:py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-md ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 cursor-pointer shadow-blue-500/40 hover:shadow-blue-500/60"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>

            {submitStatus && (
              <p
                className={`mt-4 text-center font-semibold text-sm sm:text-base ${
                  submitStatus.success ? "text-green-500" : "text-red-500"
                }`}
              >
                {submitStatus.message}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Background circles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute top-[-10rem] left-[-10rem] w-[500px] h-[500px] rounded-full bg-radial-gradient-blue-transparent filter blur-[120px] z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #00aaff 0%, transparent 70%)",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.07 }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute bottom-[-15rem] right-[-15rem] w-[700px] h-[700px] rounded-full bg-radial-gradient-light-blue-transparent filter blur-[140px] z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #66ccff 0%, transparent 80%)",
        }}
      />
    </div>
  );
};

export default Contact;