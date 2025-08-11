import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCarSide, FaTags, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

// Helper to read CSS variables dynamically
function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const offers = [
  {
    id: 1,
    Icon: FaTags,
    title: "Get 15% Off!",
    description: "Enjoy a 15% discount on all weekend rentals. Limited time only!",
    buttonText: "Book Now",
  },
  {
    id: 2,
    Icon: FaCarSide,
    title: "Luxury at $99/day!",
    description: "Drive premium vehicles this holiday season for just $99/day!",
    buttonText: "Learn More",
  },
  {
    id: 3,
    Icon: FaCalendarAlt,
    title: "Extended Rentals Deal!",
    description: "Book 5 days, get 1 day free on all sedan rentals.",
    buttonText: "Book Now",
  },
];

const SpecialOffers = () => {
  const [colors, setColors] = useState({
    accent: getCSSVariable("--accent"),
    background: getCSSVariable("--background"),
    text: getCSSVariable("--text"),
    neutral: getCSSVariable("--neutral"),
    primary: getCSSVariable("--primary"),
    secondary: getCSSVariable("--secondary"),
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColors({
        accent: getCSSVariable("--accent"),
        background: getCSSVariable("--background"),
        text: getCSSVariable("--text"),
        neutral: getCSSVariable("--neutral"),
        primary: getCSSVariable("--primary"),
        secondary: getCSSVariable("--secondary"),
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="py-10  "
      style={{ backgroundColor: colors.background, color: colors.text }}
    >  <div
      className="py-10   lg:w-11/12 mx-auto "
      
    >
      <div className="text-center mb-12 px-4 mx-auto">
        <h2 className="text-4xl font-bold" style={{ color: colors.text }}>
          Special Offers at Carvia
        </h2>
        <p className="text-lg mt-2" style={{ color: colors.accent }}>
          Don’t miss out on these exclusive deals!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  mx-auto px-4">
        {offers.map(({ id, Icon, title, description, buttonText }, index) => {
          const linkTo =
            buttonText === "Learn More" ? "/holiday-deal" : "/available-cars";

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl shadow-lg p-6 relative overflow-hidden cursor-pointer"
              style={{ backgroundColor: colors.primary, color: colors.neutral }}
            >
              <motion.div
                className="mb-4 flex justify-center"
                whileHover={{ color: colors.accent }}
                transition={{ duration: 0.3 }}
                style={{ color: colors.neutral }}
              >
                <Icon className="text-5xl" />
              </motion.div>

              <h3
                className="text-2xl font-semibold mb-2 text-center"
                style={{ color: colors.neutral }}
              >
                {title}
              </h3>
              <p
                className="mb-6 text-center font-medium"
                style={{ color: colors.neutral + "cc" }}
              >
                {description}
              </p>

              <div className="flex justify-center">
                <Link
                  to={linkTo}
                  className="inline-block px-5 py-2 rounded-lg font-semibold transition"
                  style={{
                    backgroundColor: colors.neutral,
                    color: colors.primary,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.primary;
                    e.currentTarget.style.color = colors.neutral;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = colors.neutral;
                    e.currentTarget.style.color = colors.primary;
                  }}
                >
                  {buttonText}
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div></div>
  );
};

export default SpecialOffers;






