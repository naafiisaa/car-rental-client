import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiMapPin, FiList, FiGrid } from "react-icons/fi";
import useScrollToTop from "../Utils/UseScrollToTop";

function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name) || "";
}

const AvailableCars = () => {
  useScrollToTop();

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

    const observer = new MutationObserver(() => updateColors());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  const [allCars, setAllCars] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);
  const [view, setView] = useState("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [sortAsc, setSortAsc] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSortAsc(!(sortBy === "newest" || sortBy === "high-price"));
  }, [sortBy]);

  useEffect(() => {
    fetch("https://carvia-public-server.vercel.app/available-cars")
      .then((res) => res.json())
      .then((data) => {
        const available = data.filter((car) => car.status === "available");
        setAllCars(data);
        setAvailableCars(available);
      })
      .catch((err) => console.error("Fetch cars error:", err));
  }, []);

  const sortCars = (cars) => {
    const sorted = [...cars];
    switch (sortBy) {
      case "newest":
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "oldest":
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "low-price":
        return sorted.sort((a, b) => parseFloat(a.pricePerDay) - parseFloat(b.pricePerDay));
      case "high-price":
        return sorted.sort((a, b) => parseFloat(b.pricePerDay) - parseFloat(a.pricePerDay));
      default:
        return sorted;
    }
  };

  const filteredCars = availableCars.filter((car) => {
    const search = searchTerm.toLowerCase();
    return (
      car.carModel.toLowerCase().includes(search) ||
      (car.location && car.location.toLowerCase().includes(search))
    );
  });

  const sortedCars = sortCars(filteredCars);

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.25 } },
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className=" "
      style={{  backgroundColor:colors.background, // 20% opacity
              }}
    >
        <div className="lg:w-11/12 mx-auto px-4 py-10 min-h-screen">
      {/* Header */}
      {/* <div className="lg:w-11/12 mx-auto px-4 min-h-screen"> */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold" style={{ color: colors.primary }}>
            Available Cars
          </h1>
          <div
            className="mt-2 inline-flex items-center gap-2 font-semibold px-3 py-1 rounded-full"
            style={{
              backgroundColor: `${colors.primary}33`, // 20% opacity
              color: colors.primary,
            }}
          >
            <span
              className="w-3 h-3 rounded-full animate-ping inline-block"
              style={{ backgroundColor: colors.primary }}
            ></span>
            {availableCars.length} / {allCars.length} Cars Available
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <FiSearch
              className="absolute top-3 left-3"
              style={{ color: colors.secondary }}
            />
            <input
              type="text"
              placeholder="Search by model or location"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-10 rounded"
              style={{
                backgroundColor: colors.background,
                color: colors.text,
                borderColor: colors.accent,
              }}
            />
          </div>

          <select
            className="select select-bordered w-full md:w-auto rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              backgroundColor: colors.background,
              color: colors.text,
              borderColor: colors.accent,
            }}
          >
            <option value="newest">Date Added (Newest)</option>
            <option value="oldest">Date Added (Oldest)</option>
            <option value="low-price">Price (Lowest)</option>
            <option value="high-price">Price (Highest)</option>
          </select>

          <div
            className="flex items-center gap-3 p-2 rounded-md select-none border"
            style={{ backgroundColor: colors.background, borderColor: colors.accent }}
          >
            <FiList
              className="cursor-pointer w-6 h-6"
              style={{ color: view === "list" ? colors.accent : colors.primary }}
              onClick={() => setView("list")}
            />
            <FiGrid
              className="cursor-pointer w-6 h-6"
              style={{ color: view === "grid" ? colors.accent : colors.primary }}
              onClick={() => setView("grid")}
            />
          </div>
        </div>
      </div>

      {/* Car Cards */}
      {view === "grid" ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {sortedCars.map((car) => (
              <motion.div
                key={car._id}
                layout
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl shadow-md overflow-hidden flex flex-col border"
                style={{
                  backgroundColor: colors.neutral,
                  borderColor: colors.secondary,
                  color: colors.text,
                }}
              >
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={car.imageUrl || car.image}
                    alt={car.carModel}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute top-2 left-2 text-xs px-2 py-1 rounded flex items-center shadow"
                    style={{backgroundColor: colors.background, fontWeight:"600", color: colors.primary }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 mr-1 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.178 3.63a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.085 2.24a1 1 0 00-.364 1.118l1.178 3.63c.3.921-.755 1.688-1.54 1.118l-3.085-2.24a1 1 0 00-1.175 0l-3.085 2.24c-.784.57-1.838-.197-1.539-1.118l1.178-3.63a1 1 0 00-.364-1.118L2.37 9.057c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.178-3.63z" />
                    </svg>
                    4.6
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h2 style={{ color: colors.text }} className="text-lg font-semibold">
                    {car.carModel}
                  </h2>
                  <p
                    className="flex items-center mt-1 text-sm"
                    style={{ color: colors.accent, fontWeight:"600" }}
                  >
                    <FiMapPin className="mr-1" /> {car.location || "Unknown"}
                  </p>
                </div>

                {/* Bottom Price + Button */}
                <div
                  className="mt-auto flex items-center justify-between px-4 py-3 rounded-b-xl"
                  style={{ backgroundColor: `${colors.secondary}22` }}
                >
                  <span
                    className="font-bold text-lg"
                    style={{ color: colors.primary }}
                  >
                    ${parseFloat(car.pricePerDay).toFixed(2)}/day
                  </span>
                  <Link
                    to={`/car-details/${car._id}`}
                    className="px-3 py-1 rounded-md text-sm"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.background,
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = colors.accent)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = colors.primary)
                    }
                  >
                   Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="space-y-5">
          {sortedCars.map((car) => (
            <div
              key={car._id}
              className="flex p-4 rounded-lg shadow-md border"
              style={{
                backgroundColor: colors.neutral,
                borderColor: colors.secondary,
                color: colors.text,
              }}
            >
              <div className="relative">
                <img
                  src={car.imageUrl || car.image}
                  alt={car.carModel}
                  className="w-36 h-24 object-cover rounded-lg"
                />
                {/* Review badge */}
                <div
                  className="absolute top-1 left-1 text-xs px-2 py-0.5 rounded flex items-center shadow"
                  style={{ backgroundColor: colors.background, fontWeight:"600", color: colors.primary }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3 mr-1 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.178 3.63a1 1 0 00.95.69h3.813c.969 0 1.371 1.24.588 1.81l-3.085 2.24a1 1 0 00-.364 1.118l1.178 3.63c.3.921-.755 1.688-1.54 1.118l-3.085-2.24a1 1 0 00-1.175 0l-3.085 2.24c-.784.57-1.838-.197-1.539-1.118l1.178-3.63a1 1 0 00-.364-1.118L2.37 9.057c-.783-.57-.38-1.81.588-1.81h3.813a1 1 0 00.95-.69l1.178-3.63z" />
                  </svg>
                  4.6
                </div>
              </div>

              <div className="ml-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 style={{ color: colors.text }} className="text-xl font-semibold">
                    {car.carModel}
                  </h3>
                  <p
                    className="flex items-center text-sm"
                    style={{ color: colors.accent, fontWeight:"600" }}
                  >
                    <FiMapPin className="mr-1" /> {car.location || "Unknown"}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span
                    style={{ color: colors.primary, fontWeight: "bold" }}
                  >
                    ${parseFloat(car.pricePerDay).toFixed(2)}/day
                  </span>
                  <Link
                    to={`/car-details/${car._id}`}
                    className="px-3 py-1 rounded-md text-sm"
                    style={{
                      backgroundColor: colors.primary,
                      color: colors.background,
                      transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = colors.accent)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = colors.primary)
                    }
                  >
                   Details
                  </Link>
                </div>
              </div>
            </div>
         
          ))}
        </div>
       
      )}
      </div>
    </motion.div>
  );
};

export default AvailableCars;



