// Blogs.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Cars for 2025",
    description:
      "Discover the best cars of 2025 with our detailed review, covering performance, style, and value.",
    image:
      "https://images.unsplash.com/photo-1606220838313-9577d28c85a7?w=900&auto=format&fit=crop&q=60",
    date: "August 5, 2025",
    author: "Carvia Team",
  },
  {
    id: 2,
    title: "Electric Cars: Are They Worth It?",
    description:
      "We dive deep into the pros and cons of electric vehicles, helping you decide if it's time to switch.",
    image:
      "https://images.unsplash.com/photo-1616789887087-4a3bb0d3a6fe?w=900&auto=format&fit=crop&q=60",
    date: "July 28, 2025",
    author: "Carvia Experts",
  },
  {
    id: 3,
    title: "Car Maintenance Tips for Longevity",
    description:
      "Simple yet effective tips to keep your car running smoothly for years to come.",
    image:
      "https://images.unsplash.com/photo-1619334158681-86dfb7d1c9f2?w=900&auto=format&fit=crop&q=60",
    date: "July 20, 2025",
    author: "Carvia Mechanics",
  },
  {
    id: 4,
    title: "The Future of Autonomous Cars",
    description:
      "A look into how self-driving cars are evolving and what they mean for the future of transportation.",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&auto=format&fit=crop&q=60",
    date: "June 15, 2025",
    author: "Carvia Research",
  },
  {
    id: 5,
    title: "Best Budget Cars for First-Time Buyers",
    description:
      "Affordable yet reliable cars that are perfect for those making their first purchase.",
    image:
      "https://images.unsplash.com/photo-1601924928379-3ec9d302d7e4?w=900&auto=format&fit=crop&q=60",
    date: "May 30, 2025",
    author: "Carvia Advisors",
  },
];

const Blogs = () => {
  return (
    <div className="bg-base-100 text-base-content min-h-screen">
      {/* Header */}
      <section className="bg-primary text-white py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold"
          >
            Carvia Blog
          </motion.h1>
          <p className="mt-3 text-lg opacity-90">
            Stay updated with the latest car news, reviews, and tips.
          </p>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="py-12 max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-3">
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: post.id * 0.1 }}
            className="bg-base-200 rounded-xl shadow hover:shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={post.image}
              alt={post.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-5 flex flex-col flex-1">
              <span className="text-sm opacity-70 mb-2">
                {post.date} • {post.author}
              </span>
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="opacity-80 flex-1">{post.description}</p>
              <Link
                to={`/blogs/${post.id}`}
                className="mt-4 btn btn-primary btn-sm self-start"
              >
                Read More
              </Link>
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Blogs;
