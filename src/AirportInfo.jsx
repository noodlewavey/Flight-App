import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageSearch from './ImageSearch';

const AirportInfo = ({ iataCode, setLatitude, setLongitude }) => {
  const [airportName, setAirportName] = useState('');
  const [fadeIn, setFadeIn] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_key = '09874e9b-0b9e-4d90-9820-350b19eebda5';
        const api_base = 'https://airlabs.co/api/v9/';
        const endpoint = `${api_base}airports`;
        const params = {
          iata_code: iataCode, 
          api_key: api_key,
        };

        axios
        .get(endpoint, {params})
        .then((response) => {
          if (response.data.error) {
            setAirportName('No airport found');
          } else {
            setAirportName(response.data.response[0].name);
            console.log(response.data.response[0]);
            setLatitude(response.data.response[0].lat);
            setLongitude(response.data.response[0].lng);
            setFadeIn(true); // Trigger the fade-in effect
          }
        });
      } catch (error) {
        console.error('Error:', error);
        setAirportName('Error occurred');
      }
    };

    fetchData();
  }, [iataCode]);

  return (
    <div>
      <p className="lightcenter">{airportName}</p>
      <div className={`airport-image ${fadeIn ? 'fade-in' : ''}`}>
        <ImageSearch random={airportName} />
      </div>
    </div>
  );
};

export default AirportInfo;