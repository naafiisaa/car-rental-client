import React, { useEffect, useState } from "react";
import { FaCarSide, FaDollarSign, FaHeadset, FaRegClock } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    iconName: "FaCarSide",
    title: "Wide Variety of Cars",
    description:
      "Choose from economy cars to premium rides tailored for every journey.",
    icon: FaCarSide,
  },
  {
    iconName: "FaDollarSign",
    title: "Affordable Prices",
    description: "Enjoy competitive daily rates with no hidden fees.",
    icon: FaDollarSign,
  },
  {
    iconName: "FaRegClock",
    title: "Easy Booking Process",
    description: "Book your perfect ride in just a few effortless steps.",
    icon: FaRegClock,
  },
  {
    iconName: "FaHeadset",
    title: "24/7 Support",
    description: "We’re here round the clock to help with all your queries.",
    icon: FaHeadset,
  },
];

// Helper to read CSS variables dynamically
function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const WhyChooseUs = () => {
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

  return (
    <section
      className="py-16"
      style={{ backgroundColor: colors.background, color: colors.text }}
      id="why-us"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          style={{ color: colors.text }}
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Why Choose <span style={{ color: colors.primary }}>Carvia</span>?
        </motion.h2>
        <motion.p
          style={{ color: colors.accent, fontWeight:"500" }}
          className="mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Discover the reasons drivers trust Carvia for all their car rental needs.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                className="p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300"
                style={{
                  backgroundColor: colors.neutral,
                  border: `1px solid ${colors.secondary}`,
                  color: colors.text,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <div
                  className="flex justify-center mb-4"
                  style={{ color: colors.primary }}
                >
                  <Icon className="text-4xl" />
                </div>
                <h3
                  style={{ color: colors.primary }}
                  className="text-xl font-semibold mb-2"
                >
                  {item.title}
                </h3>
                <p style={{ color: colors.accent,fontWeight:"500", fontSize: "0.875rem" }}>
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;



