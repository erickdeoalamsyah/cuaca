import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

function WeatherForm({ location, setLocation, handleSubmit }) {
  const onSubmit = (e) => {
    e.preventDefault();
    if (location.trim() !== '') {
      handleSubmit(location); 
      setLocation(''); 
    }
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      className="mb-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center bg-black bg-opacity-80 rounded-2xl shadow-xl shadow-black overflow-hidden">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter a city or country..."
          className="appearance-none bg-transparent border-none w-full text-gray-200 py-3 px-8 focus:outline-none"
        />
        <button
          type="submit"
          className="text-gray-200 text-lg px-6 transition-colors duration-300"
        >
          <FaSearch />
        </button>
      </div>
    </motion.form>
  );
}

export default WeatherForm;
