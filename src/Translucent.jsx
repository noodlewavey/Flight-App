import SearchBar from "./SearchBar";
import axios from 'axios';
import { useState, useEffect } from "react";
import AirportInfo from "./AirportInfo";
import Email from "./Email";

const convertMinutesToHoursAndMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return { hours, remainingMinutes };
};

const Translucent = ({setAirportInfoOutput}) => {
  const [showHello, setShowHello] = useState(false);
  const [flightNotFound, setFlightNotFound] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [remainingMinutes, setRemainingMinutes] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = "dc2906a52f341de2a3d7623ebe2839e1";

  const handleSearch = (query) => {
    const api_key = '09874e9b-0b9e-4d90-9820-350b19eebda5';
    const api_base = 'https://airlabs.co/api/v9/';
    const endpoint = `${api_base}flight`;
    const params = {
      flight_iata: query,
      api_key: api_key,
    };

    axios
      .get(endpoint, { params })
      .then((response) => {
        if (response.data.error) {
          setFlightNotFound(true);
        } else {
          setFlightNotFound(false);
          setResponseData(response.data);
          setShowHello(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  useEffect(() => {
    if (responseData) {
      if (responseData.response && responseData.response.duration) {
        const minutes = parseInt(responseData.response.duration, 10);
        const { hours, remainingMinutes } = convertMinutesToHoursAndMinutes(minutes);
        setMinutes(minutes);
        setHours(hours);
        setRemainingMinutes(remainingMinutes);
      }
      setAirportInfoOutput(responseData && <AirportInfo iataCode={responseData.response.arr_iata} />);
      setTimeout(() => {
        setFadeIn(true);
      }, 350);
    } else {
      setFadeIn(false);
    }
  }, [responseData, setAirportInfoOutput]);


  const fetchData = async () => {
    try {
      const response2 = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      setWeatherData(response2.data);
      console.log(response2.data);
    } catch (error) {
      console.log(error);
      console.log(latitude);
      console.log(longitude);
    }
  };

  if (latitude != 0){
    fetchData();
  }

  return (

    <div>
    <Email className="box" showHello={showHello} latitude={latitude} longitude={longitude}/>
    <div className="translucent-box rounded">
      <h2 className="light">SEARCH YOUR FLIGHT</h2>
      <SearchBar onSearch={handleSearch} className="search"/>

      {flightNotFound ? (
        <h4>Flight not found</h4>
      ) : (
        responseData && (
          <div className={fadeIn ? "fade-in" : "hidden"}>
            <AirportInfo iataCode={responseData.response.arr_iata}  setLatitude={setLatitude} setLongitude={setLongitude} />
            <h4 className="body">{responseData.response.dep_iata}  → {responseData.response.arr_iata} </h4>
            <h5 className="light"><strong>Duration</strong> {hours} hours & {remainingMinutes} minutes</h5>
            <h5 className="light"><strong>Flight Status:</strong> {responseData.response.status}</h5>
            <h5 className="light"><strong>Local Arrival Time:</strong> {responseData.response.arr_estimated}</h5>
            <h5 className="light"><strong>Arrival terminal: </strong> {responseData.response.arr_terminal}</h5>
            <h5 className="light"><strong>Baggage claim #:</strong>{responseData.response.arr_baggage}</h5>
            <h5 className="light"><strong>Est Delay:</strong>{responseData.response.delayed} minutes</h5>
            </div>
        )
      )}
    </div>
    </div>
  );
};

//wrapping airportInfoOutput inside ImageSearch inside translucent return menas airportinfooutput will be rendered as 
//child component within imagesearch
//


export default Translucent;
