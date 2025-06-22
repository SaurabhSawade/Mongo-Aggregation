import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({ name: '', category: '', price: '' });
  const [aggregatedData, setAggregatedData] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:4000/api/data', {
      ...form,
      price: Number(form.price)
    });
    setForm({ name: '', category: '', price: '' });
    fetchData();
  };

  const fetchData = async () => {
    const res = await axios.get('http://localhost:4000/api/aggregate');
    setAggregatedData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center">
      <div className="bg-white/80 shadow-xl rounded-xl p-8 w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-700">Add Item</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            required
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            placeholder="Price"
            required
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-2 rounded-lg shadow-md hover:scale-105 hover:from-blue-500 hover:to-purple-500 transition-all duration-200"
          >
            Add
          </button>
        </form>
      </div>

      <div className="mt-10 w-full max-w-xl bg-white/80 rounded-xl shadow-lg p-8 animate-fade-in-up">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Aggregated Data</h2>
        <ul className="space-y-4">
          {aggregatedData.map((item) => (
            <li
              key={item._id}
              className="flex items-center justify-between bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg px-6 py-3 shadow hover:scale-105 transition-transform duration-200"
            >
              <span className="font-semibold text-purple-700">Category: {item._id}</span>
              <span className="text-blue-700">Count: {item.count}</span>
              <span className="text-green-700">Avg Price: ₹{item.avgPrice.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* Animations */}
      <style>
        {`
          .animate-fade-in {
            animation: fadeIn 1s ease;
          }
          .animate-fade-in-up {
            animation: fadeInUp 1s ease;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px);}
            to { opacity: 1; transform: translateY(0);}
          }
        `}
      </style>
    </div>
  );
}

export default App;

