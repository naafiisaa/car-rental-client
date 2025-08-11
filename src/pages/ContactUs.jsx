import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";


// Helper to read CSS variables dynamically
function getCSSVariable(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

const ContactUs = () => {
  const [colors, setColors] = useState({
    text: getCSSVariable("--text"),
    background: getCSSVariable("--background"),
    primary: getCSSVariable("--primary"),
    secondary: getCSSVariable("--secondary"),
    accent: getCSSVariable("--accent"),
    neutral: getCSSVariable("--neutral"),
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColors({
        text: getCSSVariable("--text"),
        background: getCSSVariable("--background"),
        primary: getCSSVariable("--primary"),
        secondary: getCSSVariable("--secondary"),
        accent: getCSSVariable("--accent"),
        neutral: getCSSVariable("--neutral"),
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

   const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload

    // SweetAlert success popup
    Swal.fire({
      title: "Message Sent!",
      text: "We will get back to you soon.",
      icon: "success",
      confirmButtonColor: colors.primary,
    });

    // Optionally, clear form fields
    e.target.reset();
  };
  return (
    <div
      className="py-10"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          className="text-3xl font-bold"
          style={{ color: colors.text }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          CONTACT US
        </motion.h1>
        <motion.p
          className="mt-2 max-w-2xl"
          style={{ color: colors.accent, fontWeight: "500" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          If you have any questions, please feel free to get in touch with us
          via phone, text, email, the form below, or even on social media!
        </motion.p>
      </div>

      {/* Main Contact Section */}
      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Form */}
        <motion.div
          className="p-6 rounded-lg shadow-sm border"
          style={{
            backgroundColor: colors.neutral,
            borderColor: colors.secondary,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: colors.primary }}
          >
            GET IN TOUCH
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Enter your name*"
                className="border rounded p-3 w-full"
                style={{
                  borderColor: colors.secondary,
                  backgroundColor: colors.background,
                  color: colors.text,
                }}
                required
              />
              <input
                type="tel"
                placeholder="Enter your phone number*"
                className="border rounded p-3 w-full"
                style={{
                  borderColor: colors.secondary,
                  backgroundColor: colors.background,
                  color: colors.text,
                }}
                required
              />
            </div>
            <input
              type="email"
              placeholder="Enter your email*"
              className="border rounded p-3 w-full"
              style={{
                borderColor: colors.secondary,
                backgroundColor: colors.background,
                color: colors.text,
              }}
              required
            />
            <textarea
              placeholder="Your message"
              className="border rounded p-3 w-full h-28"
              style={{
                borderColor: colors.secondary,
                backgroundColor: colors.background,
                color: colors.text,
              }}
              required
            ></textarea>
          <button
              type="submit"
              className="btn-filled w-full"
              style={{
                backgroundColor: colors.primary,
                color: colors.background,
              }}
            >
              SEND MESSAGE
            </button>
            {/* <Button variant="filled" type="submit" className="w-full">
  SEND MESSAGE
</Button> */}
          </form>
        </motion.div>

        {/* Right: Contact Info + Business Hours */}
        <div className="space-y-6">
          {/* Contact Info */}
          <motion.div
            className="p-6 rounded-lg shadow-sm border"
            style={{
              backgroundColor: colors.neutral,
              borderColor: colors.secondary,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: colors.primary }}
            >
              CONTACT INFORMATION
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaPhoneAlt style={{ color: colors.primary }} />
                <span style={{ color: colors.text }}>773-385-1240</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope style={{ color: colors.primary }} />
                <span style={{ color: colors.text }}>
                  office@carvia.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt style={{ color: colors.primary }} />
                <span style={{ color: colors.text }}>
                  1425 N McLean Blvd, Elgin, IL
                </span>
              </div>
            </div>
          </motion.div>

          {/* Business Hours */}
          <motion.div
            className="p-6 rounded-lg shadow-sm border"
            style={{
              backgroundColor: colors.neutral,
              borderColor: colors.secondary,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: colors.primary }}
            >
              BUSINESS HOURS
            </h3>
            <div className="space-y-1" style={{ color: colors.text }}>
              <p>Monday – Friday: 9:00 am – 8:00 pm</p>
              <p>Saturday: 9:00 am – 6:00 pm</p>
              <p>Sunday: 9:00 am – 5:00 pm</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map */}
      <motion.div
        className="max-w-6xl mx-auto px-4 mt-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18..."
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </motion.div>
    </div>
  );
};

export default ContactUs;

