import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { FaUsers, FaCar, FaCity, FaSmile } from "react-icons/fa";

const stats = [
  {
    icon: <FaUsers className="text-4xl" />,
    label: "Happy Customers",
    end: 25000,
    suffix: "+",
  },
  {
    icon: <FaCar className="text-4xl" />,
    label: "Cars Rented",
    end: 50000,
    suffix: "+",
  },
  {
    icon: <FaCity className="text-4xl" />,
    label: "Cities Served",
    end: 120,
    suffix: "+",
  },
  {
    icon: <FaSmile className="text-4xl" />,
    label: "Customer Satisfaction",
    end: 98,
    suffix: "%",
  },
];

// Helper to read CSS variables
function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const CarviaStats = () => {
  const [colors, setColors] = useState({
    text: getCSSVariable("--text"),
    background: getCSSVariable("--background"),
    primary: getCSSVariable("--primary"),
    secondary: getCSSVariable("--secondary"),
    accent: getCSSVariable("--accent"),
   neutral: getCSSVariable("--neutral"),
  });

  useEffect(() => {
    // Watch for class changes on <html> to detect theme toggle
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

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="py-16"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <div className="text-center mb-12">
        <h2
          className="text-4xl font-bold"
          style={{ color: colors.primary }}
        >
          📈 Carvia in Numbers
        </h2>
        <p style={{ color: colors.accent, marginTop: "0.5rem" }}>
          Trusted and loved across the country
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="text-center rounded-2xl shadow p-6 hover:shadow-lg transition"
            style={{
              backgroundColor: colors.neutral,
              border: `1px solid ${colors.secondary}`,
              color: colors.text,
            }}
          >
            <div className="flex justify-center mb-4" style={{ color: colors.primary }}>
              {React.cloneElement(stat.icon, { style: { color: colors.primary, fontSize: "2.5rem" } })}
            </div>
            <h3 className="text-3xl font-bold">
              <CountUp end={stat.end} duration={2.5} suffix={stat.suffix} />
            </h3>
            <p style={{ color: colors.accent, marginTop: "0.25rem" }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CarviaStats;


