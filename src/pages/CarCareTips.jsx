// CarCareTips.jsx
import { FaTools, FaOilCan, FaTachometerAlt, FaBatteryFull, FaTire } from "react-icons/fa";
import { motion } from "framer-motion";

const tips = [
  {
    icon: <FaOilCan size={28} className="text-primary" />,
    title: "Check Your Oil Regularly",
    description:
      "Maintain engine health by checking and changing your oil every 3,000 to 5,000 miles.",
  },
  {
    icon: <FaBatteryFull size={28} className="text-primary" />,
    title: "Test Your Battery",
    description:
      "Avoid unexpected breakdowns by testing your battery and cleaning terminals periodically.",
  },
  {
    icon: <FaTire size={28} className="text-primary" />,
    title: "Maintain Tire Pressure",
    description:
      "Proper tire pressure improves fuel efficiency and safety. Check it monthly.",
  },
  {
    icon: <FaTachometerAlt size={28} className="text-primary" />,
    title: "Monitor Dashboard Alerts",
    description:
      "Don’t ignore warning lights. Address dashboard alerts promptly to prevent costly repairs.",
  },
  {
    icon: <FaTools size={28} className="text-primary" />,
    title: "Schedule Regular Tune-Ups",
    description:
      "Keep your car running smoothly with tune-ups as recommended by your manufacturer.",
  },
];

export default function CarCareTips() {
  return (
    <section className="bg-base-200 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-8"
        >
          Car Care Tips
        </motion.h2>
        <div className="grid md:grid-cols-5 gap-8">
          {tips.map(({ icon, title, description }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="flex flex-col items-center p-6 bg-base-100 rounded-xl shadow hover:shadow-lg"
            >
              <div className="mb-4">{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="opacity-80 text-sm">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
