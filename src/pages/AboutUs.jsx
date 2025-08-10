// AboutUs.jsx
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            About Carvia
          </motion.h1>
          <p className="mt-3 text-lg opacity-90">
            Driving Your Dreams – One Car at a Time
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
        <motion.img
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src="https://images.unsplash.com/photo-1605559424843-9e4b5e2e4f9b?w=900&auto=format&fit=crop&q=60"
          alt="Carvia Showroom"
          className="rounded-xl shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
          <p className="opacity-80 mb-4">
            Carvia is more than just a car rental and sales platform – we’re a
            community for car lovers. Founded in 2025, our mission is to make
            finding, renting, and buying cars simple, transparent, and
            enjoyable. From luxury rides to budget-friendly options, we offer a
            wide range to suit every lifestyle.
          </p>
          <p className="opacity-80">
            We believe in honesty, quality, and building trust with our
            customers. Every car in our collection is carefully inspected and
            maintained to ensure your satisfaction and safety.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-base-200 py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-base-100 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3">Our Mission</h3>
            <p className="opacity-80">
              To provide high-quality, affordable, and accessible vehicles to
              our customers, while delivering exceptional service and building
              lasting relationships.
            </p>
          </div>
          <div className="p-6 bg-base-100 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3">Our Vision</h3>
            <p className="opacity-80">
              To be the most trusted and innovative car rental & sales platform
              in Bangladesh, known for our commitment to excellence and
              customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Our Core Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-base-200 rounded-xl shadow text-center">
            <h4 className="text-lg font-semibold mb-2">Integrity</h4>
            <p className="opacity-80">
              We believe in transparency and honesty in every interaction.
            </p>
          </div>
          <div className="p-6 bg-base-200 rounded-xl shadow text-center">
            <h4 className="text-lg font-semibold mb-2">Quality</h4>
            <p className="opacity-80">
              Every vehicle is carefully selected and maintained for reliability.
            </p>
          </div>
          <div className="p-6 bg-base-200 rounded-xl shadow text-center">
            <h4 className="text-lg font-semibold mb-2">Innovation</h4>
            <p className="opacity-80">
              We embrace technology to make car renting and buying easier.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
