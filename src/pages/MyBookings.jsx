import { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import {
  FaTrash,
  FaEdit,
  FaCalendarAlt,
  FaDollarSign,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { AuthContext } from '../providers/AuthProvider';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import Loading from './Loading';

/* ----------------- Helpers ----------------- */
const getCSSVariable = (name) =>
  getComputedStyle(document.documentElement).getPropertyValue(name)?.trim() || '';

const calcDays = (start, end) =>
  Math.max(1, Math.ceil((new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24)));

export default function MyBookings() {
  const { user } = useContext(AuthContext);

  /* ----------------- State ----------------- */
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState({});
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [colors, setColors] = useState({
    text: '#000',
    background: '#fff',
    primary: '#000',
    secondary: '#000',
    accent: '#000',
    neutral: '#000',
  });

  /* ----------------- Theme Sync ----------------- */
  useEffect(() => {
    const updateColors = () =>
      setColors({
        text: getCSSVariable('--text') || '#000',
        background: getCSSVariable('--background') || '#fff',
        primary: getCSSVariable('--primary') || '#000',
        secondary: getCSSVariable('--secondary') || '#000',
        accent: getCSSVariable('--accent') || '#000',
        neutral: getCSSVariable('--neutral') || '#000',
      });

    updateColors();
    const observer = new MutationObserver(updateColors);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  /* ----------------- Data Fetch ----------------- */
  useEffect(() => {
    if (!user?.email) return;

    const fetchBookings = async () => {
      try {
        const token =
          user?.getIdToken ? await user.getIdToken() : localStorage.getItem('carvia-access-token');

        // Fetch bookings
        const res = await fetch(
          `https://carvia-public-server.vercel.app/bookings?email=${user.email}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error('Failed to fetch bookings');
        const data = await res.json();
        setBookings(data);

        // Fetch cars for unique booking carIds
        const uniqueIds = [...new Set(data.map((b) => b.carId))];
        const carData = await Promise.all(
          uniqueIds.map((id) =>
            fetch(`https://carvia-public-server.vercel.app/cars/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            }).then((r) => r.json())
          )
        );
        setCars(Object.fromEntries(carData.map((car) => [car._id, car])));
      } catch (err) {
        console.error('Error loading bookings:', err);
        toast.error('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) return <Loading />;

  /* ----------------- Handlers ----------------- */
  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: 'Cancel this booking?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
    });
    if (!confirm.isConfirmed) return;

    try {
      const token =
        user?.getIdToken ? await user.getIdToken() : localStorage.getItem('carvia-access-token');

      const res = await fetch(
        `https://carvia-public-server.vercel.app/bookings/${id}?email=${user.email}`,
        { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.ok) throw new Error();

      setBookings((prev) => prev.filter((b) => b._id !== id));
      toast.success('Booking cancelled successfully!');
    } catch {
      toast.error('Error cancelling booking.');
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setStartDate(booking.startDate?.split('T')[0] || '');
    setEndDate(booking.endDate?.split('T')[0] || '');
    document.getElementById('edit_modal').showModal();
  };

  const handleUpdate = async () => {
    try {
      const token =
        user?.getIdToken ? await user.getIdToken() : localStorage.getItem('carvia-access-token');

      const res = await fetch(
        `https://carvia-public-server.vercel.app/bookings/${selectedBooking._id}?email=${user.email}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({ startDate, endDate }),
        }
      );
      if (!res.ok) throw new Error();

      setBookings((prev) =>
        prev.map((b) => (b._id === selectedBooking._id ? { ...b, startDate, endDate } : b))
      );
      toast.success('Booking updated!');
      document.getElementById('edit_modal').close();
    } catch {
      toast.error('Failed to update booking.');
    }
  };

  /* ----------------- Chart Data ----------------- */
  const chartData = Array.from(
    bookings.reduce((map, b) => {
      const model = cars[b.carId]?.carModel || b.carModel || b.model;
      const days = calcDays(b.startDate, b.endDate);
      const price = (parseFloat(cars[b.carId]?.pricePerDay || 0) * days) || 0;
      map.set(model, (map.get(model) || 0) + price);
      return map;
    }, new Map()),
    ([model, price]) => ({ model, price: Number(price.toFixed(2)) })
  );

  /* ----------------- JSX ----------------- */
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ backgroundColor: colors.neutral, color: colors.text }}
    >
      <div className="lg:w-11/12 mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-6 text-center" style={{ color: colors.primary }}>
          My Bookings
        </h2>

        {/* Chart */}
        {bookings.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-4 text-center" style={{ color: colors.accent }}>
              Total Rental Price by Car Model
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.secondary} />
                <XAxis dataKey="model" stroke={colors.text} />
                <YAxis stroke={colors.text} />
                <Tooltip
                  contentStyle={{ backgroundColor: colors.background, borderColor: colors.secondary }}
                  itemStyle={{ color: colors.text }}
                />
                <Bar dataKey="price" fill={colors.primary} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto mt-8">
          {bookings.length === 0 ? (
            <p className="text-center" style={{ color: colors.secondary }}>
              You have no bookings yet.
            </p>
          ) : (
            <table className="table-auto w-full min-w-[720px] text-left" style={{ color: colors.text }}>
              <thead
                className="text-sm uppercase tracking-wider"
                style={{ backgroundColor: colors.primary + '33', color: colors.primary }}
              >
                <tr>
                  <th className="p-4">Model</th>
                  <th className="p-4">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt /> <span>Booking Date</span>
                    </div>
                  </th>
                  <th className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <FaDollarSign /> <span>Total Price</span>
                    </div>
                  </th>
                  <th className="p-4">Status</th>
                  <th className="p-4">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt /> <span>Location</span>
                    </div>
                  </th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, idx) => {
                  const car = cars[b.carId];
                  const days = calcDays(b.startDate, b.endDate);
                  const pricePerDay = parseFloat(car?.pricePerDay || 0);
                  const total = (pricePerDay * days).toFixed(2);

                  return (
                    <motion.tr
                      key={b._id}
                      className="transition-colors cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      style={{
                        backgroundColor: idx % 2 === 0 ? colors.background + 'ee' : colors.background,
                        color: colors.text,
                      }}
                    >
                      <td className="p-4 font-semibold truncate">
                        {car?.carModel || b.carModel || b.model}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt style={{ color: colors.primary }} />
                          <span>{new Date(b.bookingDate).toLocaleString('en-GB')}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <FaDollarSign style={{ color: colors.accent }} />
                          <span>${total} ({days} day{days > 1 ? 's' : ''})</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span
                          className="px-3 py-1 rounded-full font-semibold text-sm"
                          style={{
                            backgroundColor:
                              b.status === 'Canceled'
                                ? '#fee2e2'
                                : b.status === 'Pending'
                                ? '#fef3c7'
                                : '#d1fae5',
                            color:
                              b.status === 'Canceled'
                                ? '#991b1b'
                                : b.status === 'Pending'
                                ? '#92400e'
                                : '#065f46',
                          }}
                        >
                          {b.status || 'Confirmed'}
                        </span>
                      </td>
                      <td className="p-4 truncate">{b.location}</td>
                      <td className="p-4 flex justify-center gap-3">
                        <motion.button
                          onClick={() => handleEdit(b)}
                          className="btn btn-sm flex items-center gap-1 rounded shadow-md"
                          style={{ backgroundColor: colors.primary, color: colors.background }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaEdit /> Modify
                        </motion.button>
                        <motion.button
                          onClick={() => handleCancel(b._id)}
                          className="btn btn-sm flex items-center gap-1 rounded shadow-md"
                          style={{ backgroundColor: colors.accent, color: colors.background }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaTrash /> Cancel
                        </motion.button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal */}
        <dialog id="edit_modal" className="modal" style={{ color: colors.text }}>
          <div className="modal-box" style={{ backgroundColor: colors.background }}>
            <h3 className="font-bold text-lg mb-4" style={{ color: colors.primary }}>
              Modify Booking Dates
            </h3>

            <label className="label">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input input-bordered w-full mb-2"
              style={{ backgroundColor: colors.background + 'cc', borderColor: colors.secondary }}
            />

            <label className="label">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input input-bordered w-full"
              style={{ backgroundColor: colors.background + 'cc', borderColor: colors.secondary }}
            />

            {startDate && endDate && selectedBooking?.pricePerDay && (
              <div className="mt-4 p-3 rounded text-sm"
                   style={{ backgroundColor: colors.secondary + '33' }}>
                {(() => {
                  const days = calcDays(startDate, endDate);
                  const pricePerDay = parseFloat(selectedBooking.pricePerDay || 0);
                  const total = (pricePerDay * days).toFixed(2);
                  return (
                    <p>
                      <strong>Total Days:</strong> {days} <br />
                      <strong>Price per Day:</strong> ${pricePerDay} <br />
                      <strong>Total Price:</strong> ${total}
                    </p>
                  );
                })()}
              </div>
            )}

            <div className="modal-action">
              <button
                onClick={handleUpdate}
                className="btn btn-primary"
                style={{ backgroundColor: colors.primary, color: colors.background }}
              >
                Save
              </button>
              <form method="dialog">
                <button className="btn">Cancel</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </motion.div>
  );
}

