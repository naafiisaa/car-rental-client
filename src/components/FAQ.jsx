// // FAQ.jsx
// import { motion } from "framer-motion";

// const faqs = [
//   {
//     question: "How do I rent a car from Carvia?",
//     answer:
//       "Simply browse our available cars, choose your preferred vehicle, select the rental period, and complete the booking form. You’ll receive a confirmation email once your booking is approved.",
//   },
//   {
//     question: "What documents are required for renting a car?",
//     answer:
//       "You’ll need a valid driving license, a national ID or passport, and a payment method. Some vehicles may have additional requirements.",
//   },
//   {
//     question: "Do you offer delivery and pickup services?",
//     answer:
//       "Yes! We provide delivery and pickup for most locations in Bangladesh. Additional charges may apply based on the distance.",
//   },
//   {
//     question: "Can I cancel my booking?",
//     answer:
//       "Yes, you can cancel your booking up to 24 hours before the rental period starts for a full refund. Late cancellations may incur fees.",
//   },
//   {
//     question: "Do you offer insurance for the cars?",
//     answer:
//       "All our vehicles come with basic insurance. You can opt for additional coverage during the booking process for extra peace of mind.",
//   },
// ];

// const FAQ = () => {
//   return (
//     <div className="bg-base-100 text-base-content min-h-screen">
//       {/* Header */}
//       <section className="bg-[#1a3070] text-white py-10">
//         <div className="max-w-6xl mx-auto px-4 text-center">
//           <motion.h1
//             initial={{ opacity: 0, y: -15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="text-4xl font-bold"
//           >
//             Frequently Asked Questions
//           </motion.h1>
//           <p className="mt-3 text-lg opacity-90">
//             Find answers to common questions about Carvia’s services.
//           </p>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="py-12 max-w-4xl mx-auto px-4">
//         {faqs.map((faq, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.1 }}
//             className="collapse collapse-arrow bg-base-200 rounded-lg mb-4 shadow"
//           >
//             <input type="checkbox" />
//             <div className="collapse-title text-lg font-semibold">
//               {faq.question}
//             </div>
//             <div className="collapse-content">
//               <p className="opacity-80">{faq.answer}</p>
//             </div>
//           </motion.div>
//         ))}
//       </section>
//     </div>
//   );
// };

// export default FAQ;
import { color, motion } from "framer-motion";
import { useEffect, useState } from "react";

const faqs = [
  {
    question: "How do I rent a car from Carvia?",
    answer:
      "Simply browse our available cars, choose your preferred vehicle, select the rental period, and complete the booking form. You’ll receive a confirmation email once your booking is approved.",
  },
  {
    question: "What documents are required for renting a car?",
    answer:
      "You’ll need a valid driving license, a national ID or passport, and a payment method. Some vehicles may have additional requirements.",
  },
  {
    question: "Do you offer delivery and pickup services?",
    answer:
      "Yes! We provide delivery and pickup for most locations in Bangladesh. Additional charges may apply based on the distance.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Yes, you can cancel your booking up to 24 hours before the rental period starts for a full refund. Late cancellations may incur fees.",
  },
  {
    question: "Do you offer insurance for the cars?",
    answer:
      "All our vehicles come with basic insurance. You can opt for additional coverage during the booking process for extra peace of mind.",
  },
];

// Helper to read CSS variables dynamically
function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const FAQ = () => {
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
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      {/* Header */}
      <section
        className="py-10 px-4 lg:w-11/12 mx-auto "
        style={{ color: colors.primary }}
      >

        <div className=" mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            Frequently Asked Questions
          </motion.h1>
          <p className="mt-3 text-lg opacity-90">
            Find answers to common questions about Carvia’s services.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:w-11/12 mx-auto px-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="collapse collapse-arrow rounded-lg mb-4 shadow"
            style={{ backgroundColor: colors.neutral, color: colors.text }}
          >
            <input type="checkbox" />
            <div
              className="collapse-title text-lg font-semibold"
              style={{ color: colors.primary }}
            >
              {faq.question}
            </div>
            <div className="collapse-content">
              <p style={{ color: colors.accent,  }}>
                {faq.answer}
              </p>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default FAQ;
