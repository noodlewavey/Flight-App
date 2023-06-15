import logo from './logo.svg';
import './App.css';
import Header from './Header.jsx'
import Translucent from './Translucent.jsx';
import SearchBar from './SearchBar';
import ImageSearch from './ImageSearch';
import { useState } from 'react';

function App() {
  
  
  const [airportInfoOutput, setAirportInfoOutput] = useState("");

  return (
    <div className="App">
      <div className="container">
        <div className="background-image round">
        <Header className="header" />
        <Translucent setAirportInfoOutput={setAirportInfoOutput}/>
        </div>
    </div>
    </div>
  );
}

//<ImageSearch className="airport-image" airportName={airportInfoOutput} />
//put this after transclucent to debug 

export default App;