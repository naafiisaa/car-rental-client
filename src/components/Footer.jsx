// import React, { useEffect, useState } from "react";
// import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaCarSide, FaLongArrowAltUp } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider";

// // Helper to read CSS variables dynamically
// function getCSSVariable(name) {
//   return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
// }

// const Footer = () => {
//   const { user } = useContext(AuthContext);

//   const [colors, setColors] = useState({
//     text: getCSSVariable("--text"),
//     background: getCSSVariable("--background"),
//     primary: getCSSVariable("--primary"),
//     secondary: getCSSVariable("--secondary"),
//     accent: getCSSVariable("--accent"),
//     neutral: getCSSVariable("--neutral"),
//   });

//   useEffect(() => {
//     const observer = new MutationObserver(() => {
//       setColors({
//         text: getCSSVariable("--text"),
//         background: getCSSVariable("--background"),
//         primary: getCSSVariable("--primary"),
//         secondary: getCSSVariable("--secondary"),
//         accent: getCSSVariable("--accent"),
//         neutral: getCSSVariable("--neutral"),
//       });
//     });

//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ["class"], // Detect theme changes
//     });

//     return () => observer.disconnect();
//   }, []);

//   const fadeUp = {
//     hidden: { opacity: 0, y: 30 },
//     visible: (i = 0) => ({
//       opacity: 1,
//       y: 0,
//       transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
//     }),
//   };

//   const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

//   return (
//     <motion.footer
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       style={{ backgroundColor: colors.background, color: colors.text }}
//       className="pt-14 pb-6 border-t"
//     >
//       <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
//         {/* Brand */}
//         <motion.div custom={0} variants={fadeUp} className="space-y-4">
//           <Link to="/" className="inline-flex items-center gap-3 text-3xl font-extrabold" style={{ color: colors.accent }}>
//             <FaCarSide size={36} />
//             <span>CarVia</span>
//           </Link>
//           <p style={{ color: colors.accent, fontWeight: "500" }}>
//             Reliable, stylish, and affordable car rentals tailored for every journey.
//           </p>
//           <motion.button
//             onClick={scrollToTop}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//             style={{
//               backgroundColor: colors.accent,
//               color: colors.background,
//             }}
//             className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md shadow-lg font-semibold"
//           >
//             <FaLongArrowAltUp size={18} />
//             Back to Top
//           </motion.button>
//         </motion.div>

//         {/* Quick Links */}
//         <motion.div custom={1} variants={fadeUp}>
//           <h3 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
//             Quick Links
//           </h3>
//           <ul className="space-y-2">
//             {[
//               { to: "/", text: "Home" },
//               { to: "/available-cars", text: "Available Cars" },
//               { to: "/add-car", text: "Add Car" },
//               { to: "/my-cars", text: "My Cars" },
//               { to: "/my-bookings", text: "Bookings" },
//               ...(!user ? [{ to: "/login", text: "Login" }] : []),
//             ].map(({ to, text }, i) => (
//               <li key={i}>
//                 <Link
//                   to={to}
//                   style={{ color: colors.accent }}
//                   className="hover:underline"
//                 >
//                   {text}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </motion.div>

//         {/* Social */}
//         <motion.div custom={2} variants={fadeUp}>
//           <h3 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
//             Connect With Us
//           </h3>
//           <div className="flex gap-4">
//             {[FaFacebookF, FaTwitter, FaInstagram, FaGithub].map((Icon, i) => (
//               <motion.a
//                 key={i}
//                 href="#"
//                 whileHover={{ scale: 1.2 }}
//                 style={{
//                   color: colors.accent,
//                   backgroundColor: colors.neutral,
//                 }}
//                 className="p-2 rounded-full"
//               >
//                 <Icon />
//               </motion.a>
//             ))}
//           </div>
//         </motion.div>

//         {/* Newsletter */}
//         <motion.div custom={3} variants={fadeUp}>
//           <h3 className="text-xl font-semibold mb-4" style={{ color: colors.primary }}>
//             Stay Updated
//           </h3>
//           <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
//             <input
//               type="email"
//               placeholder="Your email address"
//               required
//               style={{
//                 backgroundColor: colors.neutral,
//                 color: colors.text,
//                 border: `1px solid ${colors.secondary}`,
//               }}
//               className="px-4 py-2 rounded-md focus:outline-none"
//             />
//             <button
//               type="submit"
//               style={{
//                 backgroundColor: colors.accent,
//                 color: colors.background,
//               }}
//               className="px-4 py-2 rounded-md font-semibold"
//             >
//               Subscribe
//             </button>
//           </form>
//         </motion.div>
//       </div>

//       {/* Bottom */}
//       <div className="mt-10 border-t pt-4 text-center text-sm" style={{ color: colors.accent }}>
//         © {new Date().getFullYear()} CarVia. All Rights Reserved.
//       </div>
//     </motion.footer>
//   );
// };

// export default Footer;


import React, { useEffect, useState, useContext } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaCarSide, FaLongArrowAltUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../providers/AuthProvider";

// Helper to read CSS variables dynamically
function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const Footer = () => {
  const { user } = useContext(AuthContext);

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
      attributeFilter: ["class"], // Detect theme changes
    });

    return () => observer.disconnect();
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      style={{
        backgroundColor: colors.primary,
        color: colors.background, // text will be readable on primary background
      }}
      className="pt-14 pb-6 border-t border-transparent"
    >
      <div className="lg:w-11/12 mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <motion.div custom={0} variants={fadeUp} className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-3xl font-extrabold"
            style={{ color: colors.background }}
          >
            <FaCarSide size={36} />
            <span>CarVia</span>
          </Link>
          <p style={{ color: colors.background, opacity: 0.9 }}>
            Reliable, stylish, and affordable car rentals tailored for every journey.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              backgroundColor: colors.background,
              color: colors.primary,
            }}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md shadow-lg font-semibold"
          >
            <FaLongArrowAltUp size={18} />
            Back to Top
          </motion.button>
        </motion.div>

        {/* Quick Links */}
        <motion.div custom={1} variants={fadeUp}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.background }}>
            Quick Links
          </h3>
          <ul className="space-y-2">
            {[
              { to: "/", text: "Home" },
              { to: "/available-cars", text: "Available Cars" },
              { to: "/about", text: "About Us" },
              { to: "/contact", text: "Contact" },
              { to: "/blogs", text: "Blogs" },
              ...(!user ? [{ to: "/login", text: "Login" }] : []),
            ].map(({ to, text }, i) => (
              <li key={i}>
                <Link
                  to={to}
                  style={{ color: colors.background, opacity: 0.9 }}
                  className="hover:underline"
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Social */}
        <motion.div custom={2} variants={fadeUp}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.background }}>
            Connect With Us
          </h3>
          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaGithub].map((Icon, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.2 }}
                style={{
                  color: colors.primary,
                  backgroundColor: colors.background,
                }}
                className="p-2 rounded-full"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Newsletter */}
        <motion.div custom={3} variants={fadeUp}>
          <h3 className="text-xl font-semibold mb-4" style={{ color: colors.background }}>
            Stay Updated
          </h3>
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email address"
              required
              style={{
                backgroundColor: colors.background,
                color: colors.primary,
                border: `1px solid ${colors.background}`,
              }}
              className="px-4 py-2 rounded-md focus:outline-none"
            />
            <button
              type="submit"
              style={{
                backgroundColor: colors.background,
                color: colors.primary,
              }}
              className="px-4 py-2 rounded-md font-semibold"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-transparent pt-4 text-center text-sm" style={{ color: colors.background, opacity: 0.8 }}>
        © {new Date().getFullYear()} CarVia. All Rights Reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
