// Offers.jsx
import { motion } from "framer-motion";

const offers = [
  {
    id: 1,
    title: "Weekend Special – 20% Off",
    description:
      "Enjoy 20% off on all rentals booked for the weekend. Perfect for road trips!",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=900&auto=format&fit=crop&q=60",
    valid: "Valid till Aug 31, 2025",
  },
  {
    id: 2,
    title: "Luxury Ride Deal",
    description:
      "Rent any luxury car for 2 days and get the 3rd day free. Drive in style!",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4b5e2e4f9b?w=900&auto=format&fit=crop&q=60",
    valid: "Valid till Sep 15, 2025",
  },
  {
    id: 3,
    title: "Electric Car Discount",
    description:
      "Save 25% when you choose an eco-friendly electric vehicle from our fleet.",
    image:
      "https://images.unsplash.com/photo-1606220838313-9577d28c85a7?w=900&auto=format&fit=crop&q=60",
    valid: "Valid till Sep 30, 2025",
  },
  {
    id: 4,
    title: "First-Time myer Offer",
    description:
      "First rental with Carvia? Get an instant 15% discount on your booking.",
    image:
      "https://images.unsplash.com/photo-1622550676689-1c2e6c9df1d1?w=900&auto=format&fit=crop&q=60",
    valid: "Valid till Dec 31, 2025",
  },
  {
    id: 5,
    title: "Long-Term Rental Bonus",
    description:
      "Book a car for 7 days or more and enjoy 1 extra day absolutely free.",
    image:
      "https://images.unsplash.com/photo-1616789887087-4a3bb0d3a6fe?w=900&auto=format&fit=crop&q=60",
    valid: "Valid till Nov 30, 2025",
  },
];

const Offers = () => {
  return (
    <div className="bg-base-100 text-base-content py-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold"
        >
          Special Offers & Discounts
        </motion.h2>
        <p className="opacity-80 mt-2">
          Grab our latest deals and enjoy your drive for less.
        </p>
      </div>

      {/* Offer Cards */}
      <div className="max-w-6xl mx-auto px-4 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-base-200 rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={offer.image}
              alt={offer.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
              <p className="opacity-80 flex-1">{offer.description}</p>
              <span className="text-sm mt-3 font-medium text-primary">
                {offer.valid}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-sm mt-4"
              >
                Book Now
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Offers;
