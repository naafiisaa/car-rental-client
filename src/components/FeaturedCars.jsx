import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaStar } from "react-icons/fa";
import moment from "moment";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Loading from "../pages/Loading";

function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

const FeaturedCars = () => {
  const [colors, setColors] = useState({
    text: getCSSVariable("--text"),
    background: getCSSVariable("--background"),
    primary: getCSSVariable("--primary"),
    secondary: getCSSVariable("--secondary"),
    accent: getCSSVariable("--accent"),
    neutral: getCSSVariable("--neutral"),
    success: getCSSVariable("--success"),
    error: getCSSVariable("--error"),
  });

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 8;

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setColors({
        text: getCSSVariable("--text"),
        background: getCSSVariable("--background"),
        primary: getCSSVariable("--primary"),
        secondary: getCSSVariable("--secondary"),
        accent: getCSSVariable("--accent"),
        neutral: getCSSVariable("--neutral"),
        success: getCSSVariable("--success"),
        error: getCSSVariable("--error"),
      });
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch("https://carvia-public-server.vercel.app/featured-cars/")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setCars(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch cars:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  const totalPages = Math.ceil(cars.length / carsPerPage);
  const startIndex = (currentPage - 1) * carsPerPage;
  const visibleCars = cars.slice(startIndex, startIndex + carsPerPage);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 font-poppins text-center" style={{ color: colors.primary }}>
        New Arrival
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:w-11/12 mx-auto px-4 gap-6">
        {visibleCars.map((car, i) => {
          const isAvailable =
            car.status?.toLowerCase() === "available" ||
            car.availability?.toLowerCase() === "available";

          return (
            <motion.div key={car._id || i} custom={i} initial="hidden" animate="visible" variants={cardVariants}>
              <div
                className="flex flex-col h-full rounded-xl shadow-md overflow-hidden border transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl relative"
                style={{ background: colors.neutral, borderColor: colors.background }}
              >
                {/* Rating badge */}
                <div className="absolute top-3 right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                  4.6 <FaStar className="inline-block ml-1 text-white" size={10} />
                </div>

                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={car.imageUrl || car.image || "https://via.placeholder.com/400x300?text=No+Image"}
                    alt={car.carModel}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{car.carModel || "Unnamed Car"}</h3>
                    <p className="font-bold text-lg" style={{ color: colors.primary }}>
                      ${car.pricePerDay}/day
                    </p>

                    <p style={{ color: colors.accent, fontWeight: "600", fontSize: "0.875rem" }}>
                      Bookings: {car.bookingCount || 0}
                    </p>
                    <p style={{ color: colors.accent, fontWeight: "600", fontSize: "0.75rem" }}>
                      Added {moment(car.createdAt).fromNow()}
                    </p>

                    {isAvailable ? (
                      <span className="flex items-center gap-1 text-sm font-medium" style={{ color: colors.success }}>
                        <FaCheckCircle /> Available
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-sm font-medium" style={{ color: colors.error }}>
                        <FaTimesCircle /> Unavailable
                      </span>
                    )}
                  </div>

                  {/* View Details button */}
                  <Link
                    to={`/car-details/${car._id}`}
                    className="block w-full text-center mt-4 py-2 px-4 rounded-lg font-medium transition duration-300"
                    style={{ backgroundColor: colors.primary, color: "#fff" }}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {cars.length > carsPerPage && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex justify-center mt-10">
          <div className="join grid grid-cols-2 gap-2">
            <button
              className="join-item btn btn-outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              Previous
            </button>
            <button
              className="join-item btn btn-outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              Next
            </button>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
};

export default FeaturedCars;


// import { useEffect, useState } from "react";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import moment from "moment";
// import { motion } from "framer-motion";
// import Loading from "../pages/Loading";

// // Helper to read CSS variables dynamically
// function getCSSVariable(name) {
//   return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
// }

// const FeaturedCars = () => {
//   const [colors, setColors] = useState({
//     text: getCSSVariable("--text"),
//     background: getCSSVariable("--background"),
//     primary: getCSSVariable("--primary"),
//     secondary: getCSSVariable("--secondary"),
//     accent: getCSSVariable("--accent"),
//     neutral: getCSSVariable("--neutral"),
//     success: getCSSVariable("--success"),
//     error: getCSSVariable("--error"),
//   });

//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1);
//   const carsPerPage = 8;

//   useEffect(() => {
//     // Update colors when theme class changes on <html>
//     const observer = new MutationObserver(() => {
//       setColors({
//         text: getCSSVariable("--text"),
//         background: getCSSVariable("--background"),
//         primary: getCSSVariable("--primary"),
//         secondary: getCSSVariable("--secondary"),
//         accent: getCSSVariable("--accent"),
//         neutral: getCSSVariable("--neutral"),
//         success: getCSSVariable("--success"),
//         error: getCSSVariable("--error"),
//       });
//     });

//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ["class"],
//     });

//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     fetch("https://carvia-public-server.vercel.app/featured-cars/")
//       .then((res) => res.json())
//       .then((data) => {
//         const sorted = data.sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setCars(sorted);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch cars:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <Loading />;
//   }

//   const totalPages = Math.ceil(cars.length / carsPerPage);
//   const startIndex = (currentPage - 1) * carsPerPage;
//   const visibleCars = cars.slice(startIndex, startIndex + carsPerPage);

//   const cardVariants = {
//     hidden: { opacity: 0, y: 50 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.1,
//         duration: 0.4,
//         ease: "easeOut",
//       },
//     }),
//   };

//   return (
//     <motion.section
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className="py-12"
//       style={{ backgroundColor: colors.background, color: colors.text }}
//     >
//       <h2
//         className="text-4xl md:text-5xl font-bold mb-12 font-poppins text-center"
//         style={{ color: colors.primary }}
//       >
//         New Arrival
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:w-11/12 mx-auto px-4 gap-6">
//         {visibleCars.map((car, i) => {
//           const isAvailable =
//             car.status?.toLowerCase() === "available" ||
//             car.availability?.toLowerCase() === "available";

//           return (
//             <motion.div
//               key={car._id || i}
//               custom={i}
//               initial="hidden"
//               animate="visible"
//               variants={cardVariants}
//             >
//               <div
//                 className="rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition duration-300 border"
//                 style={{
//                   background: colors.neutral,
//                   borderColor: colors.background, // base-100 like border
//                   color: colors.text,
//                 }}
//               >
//                 <img
//                   src={
//                     car.imageUrl ||
//                     car.image ||
//                     "https://via.placeholder.com/400x300?text=No+Image"
//                   }
//                   alt={car.carModel}
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="p-4 space-y-2">
//                   <h3
//                     className="text-xl font-semibold"
//                     style={{ color: colors.text }}
//                   >
//                     {car.carModel || "Unnamed Car"}
//                   </h3>
//                   <p className="font-semibold" style={{ color: colors.primary }}>
//                     ${car.pricePerDay}/day
//                   </p>
//                   <p style={{ color: colors.accent, fontWeight:"600", fontSize: "0.875rem" }}>
//                     Bookings: {car.bookingCount || 0}
//                   </p>
//                   <p style={{ color: colors.accent, fontWeight:"600", fontSize: "0.75rem" }}>
//                     Added {moment(car.createdAt).fromNow()}
//                   </p>

//                   {isAvailable ? (
//                     <span
//                       className="flex items-center gap-1 text-sm font-medium"
//                       style={{ color: colors.success || "green" }}
//                     >
//                       <FaCheckCircle /> Available
//                     </span>
//                   ) : (
//                     <span
//                       className="flex items-center gap-1 text-sm font-medium"
//                       style={{ color: colors.error || "red" }}
//                     >
//                       <FaTimesCircle /> Unavailable
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {cars.length > carsPerPage && (
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="flex justify-center mt-10"
//         >
//           <div className="join grid grid-cols-2 gap-2">
//             <button
//               className="join-item btn btn-outline"
//               disabled={currentPage === 1}
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               style={{
//                 borderColor: colors.primary,
//                 color: colors.primary,
//               }}
//             >
//               Previous
//             </button>
//             <button
//               className="join-item btn btn-outline"
//               disabled={currentPage === totalPages}
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               style={{
//                 borderColor: colors.primary,
//                 color: colors.primary,
//               }}
//             >
//               Next
//             </button>
//           </div>
//         </motion.div>
//       )}
//     </motion.section>
//   );
// };

// export default FeaturedCars;
