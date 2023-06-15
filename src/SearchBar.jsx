import React, { useState } from 'react';

export const SearchBar = ({onSearch, className, emailRenderCount}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);


  const handleInputChange = (e) => {
    setQuery(e.target.value);
    //setQuery is a function provided by useState
  };
  //captures user input, updates query
  //e is event object
  //e.element = element that triggered event...,input field
  //e.target.value = user's input

  const handleSubmit = (e) => {
    e.preventDefault();
    //prevents default action from occuring...no refresh
    onSearch(query);

    //callback function invoked when form in search bar is submitted
    //onsearch is defined in translucent, parent component
    //i think i need to use a callback function here to activate be notified as well 
  };


  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter flight number!"
        value={query}
        onChange={handleInputChange}
        className = "custom-input"
      />
      <button type="submit" className={className}>Search</button>
      </form>

    {searchResults && (
        <div>
        <h2>Flight Details</h2>
        <p> Airline: {searchResults.airline}</p>
        <p> Departure: {searchResults.departure}</p>
        <p>Arrival: {searchResults.arrival}</p>
        </div>
  )}
  </div>
  );
};

export default SearchBar;


