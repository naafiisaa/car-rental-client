// ContactUs.jsx
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="bg-base-100 text-base-content">
      {/* Header */}
      <section className="bg-primary text-white py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            Contact Us
          </motion.h1>
          <p className="mt-3 text-lg opacity-90">
            Got questions? We’re here to help with your Carvia experience.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 max-w-6xl mx-auto px-4 grid gap-6 md:grid-cols-3">
        <div className="flex flex-col items-center text-center p-6 bg-base-200 rounded-xl shadow">
          <FaPhoneAlt className="text-primary text-3xl mb-3" />
          <h3 className="text-lg font-semibold">Phone</h3>
          <p className="opacity-80">+880 1234 567 890</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-base-200 rounded-xl shadow">
          <FaEnvelope className="text-primary text-3xl mb-3" />
          <h3 className="text-lg font-semibold">Email</h3>
          <p className="opacity-80">support@carvia.com</p>
        </div>
        <div className="flex flex-col items-center text-center p-6 bg-base-200 rounded-xl shadow">
          <FaMapMarkerAlt className="text-primary text-3xl mb-3" />
          <h3 className="text-lg font-semibold">Location</h3>
          <p className="opacity-80">Dhaka, Bangladesh</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 bg-base-200">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-center mb-8"
          >
            Send Us a Message
          </motion.h2>

          <form className="grid gap-6 bg-base-100 p-8 rounded-xl shadow">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="input input-bordered w-full"
              required
            />
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full h-32"
              required
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn btn-primary w-full"
            >
              Send Message
            </motion.button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
