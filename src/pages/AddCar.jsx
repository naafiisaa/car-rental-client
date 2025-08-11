import { useContext, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

function getCSSVariable(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name) || '';
}

export default function AddCar() {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [colors, setColors] = useState({
    text: '#000',
    background: '#fff',
    primary: '#000',
    secondary: '#000',
    accent: '#000',
   neutral: '#000',
  });

  useEffect(() => {
    const updateColors = () => {
      setColors({
        text: getCSSVariable('--text').trim() || '#000',
        background: getCSSVariable('--background').trim() || '#fff',
        primary: getCSSVariable('--primary').trim() || '#000',
        secondary: getCSSVariable('--secondary').trim() || '#000',
        accent: getCSSVariable('--accent').trim() || '#000',
        neutral: getCSSVariable("--neutral").trim() || "#000",
      });
    };

    updateColors();

    const observer = new MutationObserver(() => updateColors());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  const [formData, setFormData] = useState({
    carModel: '',
    pricePerDay: '',
    availability: 'available',
    registrationNumber: '',
    features: '',
    description: '',
    imageUrl: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const carData = {
      ...formData,
      features: formData.features
        ? formData.features.split(',').map((f) => f.trim())
        : [],
      ownerEmail: user?.email,
      status: 'available',
    };

    try {
      await axiosSecure.post('/add-car', carData);
      toast.success('Car added successfully!');
      setTimeout(() => navigate('/my-cars'), 1500);
    } catch (error) {
      console.error('❌ Add car error:', error.message || error);
      toast.error('Failed to add car. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className=""
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      
        <div className="lg:w-11/12 mx-auto px-4 py-10 min-h-screen">
      {/* 🔁 Marquee title */}
      <Marquee speed={60} gradient={false} className="mb-4">
        <h2
          className="text-2xl font-bold uppercase tracking-widest"
          style={{ color: colors.primary }}
        >
          🚗 Add Your Car to Carvia &nbsp; 🚘 Car Rental Platform &nbsp; 🚙 Make Money Renting Cars &nbsp;
        </h2>
      </Marquee>

      {/* Form container */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-8 rounded-3xl shadow-xl border hover:shadow-2xl transition duration-300"
        style={{
          backgroundColor: colors.neutral + 'dd', // translucent
          borderColor: colors.secondary + '66',
          color: colors.text,
          backdropFilter: 'blur(8px)',
        }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <input
            name="carModel"
            required
            type="text"
            placeholder="Car Model"
            value={formData.carModel}
            onChange={handleChange}
            className="input input-bordered w-full"
            style={{
              backgroundColor: colors.background + 'cc',
              color: colors.text,
              borderColor: colors.secondary,
            }}
          />
          <input
            name="pricePerDay"
            required
            type="number"
            placeholder="Daily Rental Price ($)"
            value={formData.pricePerDay}
            onChange={handleChange}
            className="input input-bordered w-full"
            style={{
              backgroundColor: colors.background + 'cc',
              color: colors.text,
              borderColor: colors.secondary,
            }}
          />
          <input
            name="availability"
            required
            type="text"
            placeholder="Availability"
            value={formData.availability}
            onChange={handleChange}
            className="input input-bordered w-full"
            style={{
              backgroundColor: colors.background + 'cc',
              color: colors.text,
              borderColor: colors.secondary,
            }}
            disabled
          />
          <input
            name="registrationNumber"
            required
            type="text"
            placeholder="Registration Number"
            value={formData.registrationNumber}
            onChange={handleChange}
            className="input input-bordered w-full"
            style={{
              backgroundColor: colors.background + 'cc',
              color: colors.text,
              borderColor: colors.secondary,
            }}
          />
          <input
            name="features"
            type="text"
            placeholder="Features (comma-separated)"
            value={formData.features}
            onChange={handleChange}
            className="input input-bordered w-full"
            style={{
              backgroundColor: colors.background + 'cc',
              color: colors.text,
              borderColor: colors.secondary,
            }}
          />
          <input
            name="imageUrl"
            required
            type="url"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
            className="input input-bordered w-full"
            style={{
              backgroundColor: colors.background + 'cc',
              color: colors.text,
              borderColor: colors.secondary,
            }}
          />
          <input
            name="location"
            required
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered w-full"
            style={{
              backgroundColor: colors.background + 'cc',
              color: colors.text,
              borderColor: colors.secondary,
            }}
          />
          <input
            type="number"
            value={0}
            readOnly
            className="input input-bordered w-full"
            placeholder="Booking Count (Default 0)"
            style={{
              backgroundColor: colors.background + 'cc',
              color: colors.secondary,
              cursor: 'not-allowed',
            }}
          />
        </div>

        <textarea
          name="description"
          required
          rows="4"
          placeholder="Car Description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          style={{
            backgroundColor: colors.background + 'cc',
            color: colors.text,
            borderColor: colors.secondary,
          }}
        ></textarea>

        <button
          type="submit"
          disabled={loading}
          className="btn w-full font-semibold tracking-wide text-lg"
          style={{
            backgroundColor: colors.primary,
            color: colors.background,
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Adding Car...' : 'Add Car'}
        </button>
      </form>
      </div>
    </motion.div>
  );
}


