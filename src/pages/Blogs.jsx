import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiUser, FiArrowRight } from "react-icons/fi";
const blogPosts = [
  {
    id: 1,
    title: "Top 10 Cars for 2025",
    description:
      "Discover the best cars of 2025 with our detailed review, covering performance, style, technology features, fuel efficiency, and overall value. Whether you're looking for speed, comfort, or eco-friendliness, this guide will help you make an informed choice for your next ride.",
    image:
      "https://i.ibb.co/KcDrXScb/sebastiaan-stam-cc-E0s-QMMl5-M-unsplash-1.jpg",
    date: "August 5, 2025",
    author: "Carvia Team",
  },
  {
    id: 2,
    title: "Electric Cars: Are They Worth It?",
    description:
      "We dive deep into the pros and cons of electric vehicles, including cost of ownership, charging infrastructure, environmental impact, and performance. Learn if switching to an electric car fits your lifestyle and budget in this comprehensive analysis.",
    image:
      "https://i.ibb.co/bgGwbJqK/untldshots-4hh-DQLWz-Gsk-unsplash.jpg",
    date: "July 28, 2025",
    author: "Carvia Experts",
  },
  {
    id: 3,
    title: "The Future of Autonomous Cars",
    description:
      "Explore the rapid advancements in self-driving technology, regulatory challenges, and the potential benefits and risks autonomous cars bring to our roads. This article offers insights into how driverless cars could revolutionize transportation in the coming decade.",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&auto=format&fit=crop&q=60",
    date: "June 15, 2025",
    author: "Carvia Research",
  },
  {
    id: 4,
    title: "How to Choose the Right Car Insurance",
    description:
      "Understanding car insurance options can be confusing. This blog breaks down the types of coverage, how to compare quotes, and tips to find the best insurance policy that protects your vehicle without breaking your budget.",
    image:
      "https://images.unsplash.com/photo-1549924231-f129b911e442?w=900&auto=format&fit=crop&q=60",
    date: "May 15, 2025",
    author: "Carvia Insurance Team",
  },
  {
    id: 5,
    title: "Top Safety Features to Look for in New Cars",
    description:
      "Safety is paramount when choosing a vehicle. Learn about the latest advanced safety technologies including automatic emergency braking, blind-spot monitoring, lane-keeping assist, and more, so you can drive with confidence.",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&auto=format&fit=crop&q=60",
    date: "April 10, 2025",
    author: "Carvia Safety Experts",
  },
  {
    id: 6,
    title: "The Rise of Car Subscription Services",
    description:
      "Car subscription services offer flexible alternatives to traditional ownership. Discover how these services work, their benefits, and whether a subscription might be the right fit for your lifestyle.",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900&auto=format&fit=crop&q=60",
    date: "March 30, 2025",
    author: "Carvia Trends",
  },
  {
    id: 7,
    title: "Classic Cars Making a Comeback",
    description:
      "Vintage cars are becoming increasingly popular among collectors and enthusiasts. Dive into the world of classic cars, their timeless appeal, and tips on purchasing and maintaining these beautiful machines.",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=900&auto=format&fit=crop&q=60",
    date: "March 15, 2025",
    author: "Carvia Classics",
  },
  {
    id: 8,
    title: "How to Prepare Your Car for a Road Trip",
    description:
      "Planning a road trip? This blog covers essential car prep tips including maintenance checks, packing smart, and safety measures to ensure a smooth and enjoyable journey wherever the road takes you.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=60",
    date: "February 28, 2025",
    author: "Carvia Travel",
  },
  {
    id: 9,
    title: "Car Financing Options Explained",
    description:
      "Buying a car often means financing it. We explain different financing options like loans, leases, and cash purchases, plus tips on managing payments and interest rates to help you make the best financial decision.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&auto=format&fit=crop&q=60",
    date: "February 10, 2025",
    author: "Carvia Finance Team",
  },
    
]

function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name) || "";
}

const Blogs = () => {
  const [colors, setColors] = React.useState({
    text: "#000",
    background: "#fff",
    primary: "#000",
    secondary: "#000",
    accent: "#000",
    neutral: "#fff",
  });

  React.useEffect(() => {
    const updateColors = () => {
      setColors({
        text: getCSSVariable("--text").trim() || "#000",
        background: getCSSVariable("--background").trim() || "#fff",
        primary: getCSSVariable("--primary").trim() || "#000",
        secondary: getCSSVariable("--secondary").trim() || "#000",
        accent: getCSSVariable("--accent").trim() || "#000",
        neutral: getCSSVariable("--neutral").trim() || "#fff",
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

  const bigCardIndexes = [0, 3, 6]; // indices of big cards

  return (
    <div
      style={{
        backgroundColor: colors.neutral,
        color: colors.text,
        minHeight: "100vh",
        padding: "2rem 1rem",
      }}
    >
      {/* Header */}
      <section
        style={{ backgroundColor: colors.neutral, color: colors.primary }}
        className="py-10"
      >
        <div className="lg:w-11/12 mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            Carvia Blog
          </motion.h1>
          <p
            className="mt-3 text-lg opacity-90"
            style={{ color: colors.primary + "cc" }}
          >
            Stay updated with the latest car news, reviews, and tips.
          </p>
        </div>
      </section>

      {/* Masonry Grid */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gridAutoRows: "auto",
           gridAutoFlow: "dense",
          gap: "1.5rem",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1rem",
        }}
        className="lg:w-11/12 mx-auto px-4"
      >
        {blogPosts.map((post, index) => {
          const isBig = bigCardIndexes.includes(index);

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              style={{
                gridColumn: isBig ? "span 2" : "span 1",
                backgroundColor: colors.background,
                color: colors.text,
                borderRadius: 12,
                boxShadow:
                  "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                transition: "box-shadow 0.3s ease",
                minHeight: isBig ? 380 : 280,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)";
              }}
            >
              <div
                style={{
                  flex: "0 0 auto",
                  overflow: "hidden",
                  aspectRatio: isBig ? "16 / 9" : "4 / 3",
                }}
              >
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </div>

              <div
                style={{
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                {/* Date & Author with Icons */}
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    fontSize: 14,
                    marginBottom: 8,
                    opacity: 0.7,
                    color: colors.text,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <FiCalendar />
                    {post.date}
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <FiUser />
                    {post.author}
                  </span>
                </div>

                <h3
                  style={{
                    fontWeight: 700,
                    fontSize: isBig ? 24 : 18,
                    marginBottom: 12,
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    flexGrow: 1,
                    opacity: 0.8,
                    fontSize: isBig ? 16 : 14,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: isBig ? 5 : 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {post.description}
                </p>

                {/* Read More Link with Arrow Icon */}
                
              </div>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
};

export default Blogs;