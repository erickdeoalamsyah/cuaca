import React from 'react';
import { motion } from 'framer-motion';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiDust } from 'react-icons/wi';

function HourlyForecast({ data }) {
  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case '01d':
      case '01n':
        return <WiDaySunny className="text-5xl text-yellow-400" />;
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <WiCloudy className="text-5xl text-gray-200" />;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return <WiRain className="text-5xl text-blue-400" />;
      case '11d':
      case '11n':
        return <WiThunderstorm className="text-5xl text-purple-400" />;
      case '13d':
      case '13n':
        return <WiSnow className="text-5xl text-blue-200" />;
      default:
        return <WiDust className="text-5xl text-gray-500" />;
    }
  };

  if (!data || !data.list || data.list.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="bg-black bg-opacity-80 rounded-2xl shadow-xl shadow-black p-6 mb-5 lg:px-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-xl mb-6 text-gray-200">
        HOURLY FORECAST
      </h3>
      <div className="flex overflow-x-auto pb-4 scrollbar-hide justify-between">
        {data.list.slice(0, 8).map((item, index) => (
          <motion.div
          key={index}
          className="flex-shrink-0 text-center mr-6 flex flex-col items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <p className="text-sm text-gray-200 mb-2">
            {new Date(item.dt * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
          <div className="flex items-center justify-center">
            {getWeatherIcon(item.weather[0].icon)}
          </div>
          <p className="text-lg font-semibold text-gray-200 mt-2">
            {Math.round(item.main.temp)}°C
          </p>
          <p className="text-sm text-gray-200 mt-2">
            {data.list[0].weather[0].description}
          </p>
        </motion.div>
        
        ))}
      </div>
    </motion.div>
  );
}

export default HourlyForecast;

