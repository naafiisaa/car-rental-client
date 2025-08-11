import { useEffect, useState } from "react";
import { FaTools, FaOilCan, FaTachometerAlt, FaBatteryFull } from "react-icons/fa";
import { motion } from "framer-motion";

function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name) || "";
}

export default function CarCareTips() {
  const [colors, setColors] = useState({
    text: "#000",
    background: "#fff",
    primary: "#000",
    secondary: "#000",
    accent: "#000",
  });

  useEffect(() => {
    const updateColors = () => {
      setColors({
        text: getCSSVariable("--text").trim() || "#000",
        background: getCSSVariable("--background").trim() || "#fff",
        primary: getCSSVariable("--primary").trim() || "#000",
        secondary: getCSSVariable("--secondary").trim() || "#000",
        accent: getCSSVariable("--accent").trim() || "#000",
       neutral: getCSSVariable("--neutral").trim() || "#000",
      });
    };

    updateColors();

    // Watch for theme changes by observing 'class' attribute changes on <html>
    const observer = new MutationObserver(() => updateColors());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const tips = [
    {
      icon: <FaOilCan size={28} style={{ color: colors.primary }} />,
      title: "Check Your Oil Regularly",
      description: "Maintain engine health by checking and changing your oil every 3,000 to 5,000 miles.",
    },
    {
      icon: <FaBatteryFull size={28} style={{ color: colors.primary }} />,
      title: "Test Your Battery",
      description: "Avoid unexpected breakdowns by testing your battery and cleaning terminals periodically.",
    },
    {
      icon: <FaTachometerAlt size={28} style={{ color: colors.primary }} />,
      title: "Monitor Dashboard Alerts",
      description: "Don’t ignore warning lights. Address dashboard alerts promptly to prevent costly repairs.",
    },
    {
      icon: <FaTools size={28} style={{ color: colors.primary }} />,
      title: "Schedule Regular Tune-Ups",
      description: "Keep your car running smoothly with tune-ups as recommended by your manufacturer.",
    },
  ];

  return (
    <section style={{ backgroundColor: colors.background, color: colors.text }} className="py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ color: colors.primary }}
          className="text-3xl font-bold mb-12"
        >
          Car Care Tips
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {tips.map(({ icon, title, description }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              style={{
                backgroundColor: colors.neutral,
                borderColor: colors.secondary,
                boxShadow: `0 2px 10px ${colors.secondary}44`,
              }}
              className="flex flex-col items-center p-6 rounded-xl border hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="mb-4">{icon}</div>
              <h3 style={{ color: colors.primary }} className="text-xl font-semibold mb-2">
                {title}
              </h3>
              <p style={{ color: colors.text }} className="text-sm opacity-80">
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
