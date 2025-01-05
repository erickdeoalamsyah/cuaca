import React from 'react';
import cerah from '../assets/bg/cerah.jpg';
import mendung from '../assets/bg/mendung.jpg';
import hujan from '../assets/bg/hujan.jpg';
import petir from '../assets/bg/petir.jpg';
import salju from '../assets/bg/salju.jpeg';

const BackgroundAnimation = ({ weatherIcon }) => {
  const getBackgroundImage = () => {
    console.log("Weather Icon:", weatherIcon); 
    switch (weatherIcon) {
      case '01d':
      case '01n':
        return cerah;
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return mendung; 
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return hujan; 
      case '11d':
      case '11n':
        return petir;
      case '13d':
      case '13n':
        return salju; 
      default:
        return hujan; 
    }
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-[-1]"
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
      }}
    />
  );
};

export default BackgroundAnimation;

