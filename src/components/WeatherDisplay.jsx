import React from "react";
import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiDust,
} from "react-icons/wi";

function WeatherDisplay({ data }) {
  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        return <WiDaySunny className="text-8xl text-yellow-400" />;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
      case "04d":
      case "04n":
        return <WiCloudy className="text-8xl text-gray-200" />;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        return <WiRain className="text-8xl text-blue-400" />;
      case "11d":
      case "11n":
        return <WiThunderstorm className="text-8xl text-purple-400" />;
      case "13d":
      case "13n":
        return <WiSnow className="text-8xl text-blue-200" />;
      default:
        return <WiDust className="text-8xl text-gray-500" />;
    }
  };

  if (!data || !data.city || !data.list || data.list.length === 0) {
    return (
      <motion.div
        className="rounded-full p-8 mb-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-2xl text-gray-800 dark:text-white">
          No weather data available
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-black bg-opacity-80 rounded-3xl shadow-xl shadow-black p-6 mb-8 lg:px-16"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl text-gray-200">
        {data.city.name}, {data.city.country}
      </h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-6xl text-gray-200">
            {Math.round(data.list[0].main.temp)}°C
            
          </p>
        </div>
        {getWeatherIcon(data.list[0].weather[0].icon)}
      </div>
      <p className="text-xl text-gray-200">
        {data.list[0].weather[0].description}
      </p>
      <div className="mt-6 text-center grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
        <div className="bg-blur p-4 rounded-2xl border border-gray-200">
          <p className="text-md text-gray-200">HUMIDITY</p>
          <p className="text-xl text-gray-400">{data.list[0].main.humidity}%</p>
        </div>
        <div className="bg-blur p-4 rounded-2xl border border-gray-200">
          <p className="text-md text-gray-200">WIND</p>
          <p className="text-xl text-gray-400">{data.list[0].wind.speed} M/S</p>
        </div>
        <div className="bg-blur p-4 rounded-2xl border border-gray-200">
          <p className="text-md text-gray-200">VISIBILITY</p>
          <p className="text-xl text-gray-400">{data.list[0].visibility} M/S</p>
        </div>
        <div className="bg-blur p-4 rounded-2xl border border-gray-200">
          <p className="text-md text-gray-200">FEELS LIKE</p>
          <p className="text-xl text-gray-400">
            {data.list[0].main.feels_like}%
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default WeatherDisplay;
