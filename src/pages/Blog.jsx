import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// You can import this from a separate file or paste the blogPosts array here again
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
  
   { id: 10,
    title: "DIY Car Mods: Boost Performance on a Budget",
    description:
      "From air filters to exhaust upgrades, learn practical modifications to enhance your car's performance without breaking the bank.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=60",
    date: "July 22, 2025",
    author: "Auto Enthusiast",
  },
  {
    id: 11,
    title: "Solar-Powered Vehicles: The Future is Bright",
    description:
      "Solar energy meets automotive innovation. Discover the cutting-edge solar-powered cars and how they could revolutionize sustainable driving.",
    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=900&auto=format&fit=crop&q=60",
    date: "June 30, 2025",
    author: "GreenDrive Journal",
  },
];

const Blog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Convert id param to number and find matching blog post
  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
        <button
          onClick={() => navigate("/blogs")}
          className="btn btn-primary text-center"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
        loading="lazy"
      />
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-6">
        {post.date} • {post.author}
      </p>
      <p className="text-lg leading-relaxed">{post.description}</p>
      <Link
        to="/blogs"
        className=" mt-8 btn text-center my-auto btn-secondary"
      >
        ← Back to Blogs
      </Link>
    </div>
  );
};

export default Blog; 


