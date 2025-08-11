import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name) || "";
}

const AboutUs = () => {
  const [colors, setColors] = useState({
    text: "#000",
    background: "#fff",
    primary: "#000",
    secondary: "#000",
    accent: "#000",
    neutral: "#000"
  });

  useEffect(() => {
    const updateColors = () => {
      setColors({
        text: getCSSVariable("--text").trim() || "#000",
        background: getCSSVariable("--background").trim() || "#fff",
        primary: getCSSVariable("--primary").trim() || "#000",
        secondary: getCSSVariable("--secondary").trim() || "#000",
        accent: getCSSVariable("--accent").trim() || "#000",
        neutral: getCSSVariable("--neutral"),
      });
    };

    updateColors();

    const observer = new MutationObserver(() => updateColors());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{ backgroundColor: colors.background, color: colors.text }}
      className="min-h-screen"
    >
      {/* Hero Section */}
      <section
        style={{ backgroundColor: colors.background, color: colors.primary }}
        className="py-10"
      >
        <div className="mx-auto text-center px-4 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            About Carvia
          </motion.h1>
          <p
            style={{ opacity: 0.9 }}
            className="mt-3 text-lg"
          >
            Driving Your Dreams – One Car at a Time
          </p>
        </div>
      </section>

      {/* Story Section */}<section className="py-12 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-stretch">
        {/* Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl border shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out h-full"
          style={{ borderColor: colors.primary }}
        >
          <img
            src="https://i.ibb.co.com/Fqj221yQ/christian-agbede-LMoj-EZW-Dj-U-unsplash.jpg"
            alt="Carvia Showroom"
            className="w-full h-full object-cover "
          />
        </motion.div>

        {/* Text Box */}
        <div
          style={{ background: colors.primary, color: colors.neutral }}
          className="p-6 rounded-xl shadow-lg h-full flex flex-col"
        >
          <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
          <p style={{ opacity: 0.8 }} className="mb-4 flex-grow">
            Carvia is more than just a car rental and sales platform – we’re a
            community for car lovers. Founded in 2025, our mission is to make
            finding, renting, and buying cars simple, transparent, and
            enjoyable. From luxury rides to budget-friendly options, we offer a
            wide range to suit every lifestyle.It offers a user-friendly interface for browsing, booking, and managing vehicle rentals.
            With a focus on reliability and convenience, Carvia connects customers to quality cars.
            The platform integrates modern technology to ensure smooth and secure rental experiences.
          </p>
          <p style={{ opacity: 0.8 }}>
            We believe in honesty, quality, and building trust with our
            myers. Every car in our collection is carefully inspected and
            maintained to ensure your satisfaction and safety.
          </p>
        </div>
      </section>


      {/* Mission & Vision */}
      <section
        style={{ backgroundColor: colors.background }}
        className="py-12"
      >
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div
            style={{ backgroundColor: colors.primary, color: colors.neutral, fontWeight: "600" }}
            className="p-6 rounded-xl shadow"
          >
            <h3
              className="text-xl font-bold mb-3"
              style={{ color: colors.neutral }}
            >
              Our Mission
            </h3>
            <p style={{ opacity: 0.8 }}>
              To provide high-quality, affordable, and accessible vehicles to
              our myers, while delivering exceptional service and building
              lasting relationships.
            </p>
          </div>
          <div
            style={{ backgroundColor: colors.neutral, color: colors.text }}
            className="p-6 rounded-xl shadow"
          >
            <h3
              className="text-xl font-bold mb-3"
              style={{ color: colors.primary }}
            >
              Our Vision
            </h3>
            <p style={{ opacity: 0.8 }}>
              To be the most trusted and innovative car rental & sales platform
              in Bangladesh, known for our commitment to excellence and
              myer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        <h2
          className="text-2xl font-bold text-center mb-8"
          style={{ color: colors.primary }}
        >
          Our Core Values
        </h2>
        <div
          style={{ color: colors.text }}
          className="grid md:grid-cols-3 gap-6"
        >
          <div
            style={{ backgroundColor: colors.neutral }}
            className="p-6 rounded-xl shadow text-center"
          >
            <h4
              style={{ color: colors.primary }}
              className="text-lg font-bold mb-2">Integrity</h4>
            <p style={{ opacity: 0.8 }}>
              We believe in transparency and honesty in every interaction.
            </p>
          </div>
          <div
            style={{ backgroundColor: colors.secondary }}
            className="p-6 rounded-xl shadow text-center"
          >
            <h4 className="text-lg font-bold mb-2">Innovation</h4>
            <p >
              We embrace technology to make car renting and buying easier.
            </p>
          </div>
          <div
            style={{ backgroundColor: colors.primary, color: colors.neutral }}
            className="p-6 rounded-xl shadow text-center"
          >
            <h4 className="text-lg font-bold mb-2">Quality</h4>
            <p style={{ opacity: 0.8 }}>
              Every vehicle is carefully selected and maintained for reliability.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default AboutUs;

