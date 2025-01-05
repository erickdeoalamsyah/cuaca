
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherForm from './components/WeatherForm';
import HourlyForecast from './components/HourlyForecast';
import BackgroundAnimation from './components/BackgroundAnimation';
import { fetchWeatherData, fetchWeatherByCoords } from './services/weatherService';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordsHandler(latitude, longitude);
        },
        () => fetchWeatherHandler('Indonesia')
      );
    } else {
      fetchWeatherHandler('Indonesia');
    }
  }, []);

  const fetchWeatherHandler = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoordsHandler = async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCoords(lat, lon);
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundAnimation
        weatherIcon={weatherData?.list[0]?.weather[0]?.icon}
      />
      <div className="container mx-auto px-6 py-5 lg:py-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <WeatherForm
            location={location}
            setLocation={setLocation}
            handleSubmit={fetchWeatherHandler}
          />
          <AnimatePresence>
            {loading ? (
              <div className="text-gray-200 text-center">Loading...</div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : weatherData ? (
              <>
                <WeatherDisplay data={weatherData} />
                <HourlyForecast data={weatherData} />
              </>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default App;
