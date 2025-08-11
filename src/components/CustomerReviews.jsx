import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaUserCircle } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Sarah A.",
    rating: 5,
    comment:
      "Booking a car through Carvia was so easy and smooth. Loved the customer support and car condition!",
  },
  {
    id: 2,
    name: "John D.",
    rating: 4,
    comment:
      "Affordable prices and great vehicle choices. Will definitely use Carvia again for my weekend trips!",
  },
  {
    id: 3,
    name: "Maya R.",
    rating: 5,
    comment:
      "The booking experience was top-notch. Clean cars, friendly service, and quick check-in process.",
  },
];

// Helper to read CSS variables dynamically
function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const CustomerReviews = () => {
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
    <div className="py-10 " style={{ backgroundColor: colors.background }}>
      <div className="text-center mb-10">
        <h2
          className="text-4xl font-bold"
          style={{ color: colors.text }}
        >
          🌟 What Our Customers Say
        </h2>
        <p style={{ color: colors.accent, marginTop: "0.5rem" }}>
          Real feedback from happy Carvia users
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto px-4 lg:w-11/12">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="p-6 rounded-2xl shadow hover:shadow-lg transition"
            style={{ backgroundColor: colors.neutral, color: colors.text }}
          >
            <div className="flex items-center mb-4">
              <FaUserCircle
                className="text-4xl mr-3"
                style={{ color: colors.primary }}
              />
              <div>
                <h4
                  className="text-lg font-semibold"
                  style={{ color: colors.text }}
                >
                  {review.name}
                </h4>
                <div style={{ color: "#facc15" /* Tailwind yellow-400 */ }} className="flex">
                  {Array(review.rating)
                    .fill()
                    .map((_, i) => (
                      <FaStar key={i} />
                    ))}
                </div>
              </div>
            </div>
            <p style={{ color: colors.accent, fontStyle: "italic" }}>
              "{review.comment}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;

