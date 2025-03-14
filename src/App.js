import './App.css';
import React, { useState, useEffect, useRef } from 'react';
import ImageCard from './components/ImageCard.js'

import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.

function App() {

  const [rover, setRover] = useState("Curiosity");
  const [date, setDate] = useState(getDate());
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dateInputRef = useRef(null);

  function getDate() {
    const today = new Date();
    today.setDate(today.getDate() - 3000);
    return today.toISOString().split("T")[0];
  }

  async function fetchData() {

    console.log(date);

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.toLowerCase()}/photos?earth_date=${date}&api_key=QvKHEflswydb3vcLUBy9e9pp3V4drGrxHrPmtjqz`);
      const json = await response.json();
      setPhotos(json.photos.slice(0, 10));
    } catch (err) {
      setError("Failed to fetch data. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  function isValidDate(dateInput) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
  
    if (regex.test(dateInput)) {
      const date = new Date(dateInput);
      return date.getFullYear() === parseInt(dateInput.substring(0, 4), 10) &&
             date.getMonth() + 1 === parseInt(dateInput.substring(5, 7), 10) &&
             date.getDate() === parseInt(dateInput.substring(8, 10), 10);
    }
    return false;
  }

  function submitDate() {
    if (dateInputRef.current && dateInputRef.current.value && isValidDate(dateInputRef.current.value)) {
      const newDate = dateInputRef.current.value;
      setDate(newDate);
    } else {
      alert("Please enter a valid date of the format YYYY-MM-DD.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [rover, date]);

  return (
    <div>
      <div className="h1">NASA Mars Rover Photos</div>
      <div className="button-container">
        <div className="row button-row">
          <div className="col">
            <button className="button" onClick={() => setRover("Perseverance")}> Perseverance </button>
          </div>
          <div className="col">
            <button className="button" onClick={() => setRover("Curiosity")}> Curiosity </button>
          </div>
          <div className="col">
            <button className="button" onClick={() => setRover("Spirit")}> Spirit </button>
          </div>
          <div className="col">
            <button className="button" onClick={() => setRover("Opportunity")}> Opportunity </button>
          </div>
        </div>
      </div>
      <div className="date-container">
        <div className="row date-row">
          <div className="col-9">
            <input type="text" className="date" placeholder="YYYY-MM-DD" ref={dateInputRef} />
          </div>
          <div className="col">
            <button className="search-button" onClick={() => submitDate()}>Search</button>
          </div>
        </div>
      </div>
      <div className="row" style={{margin: '20px'}}>
          {photos.length > 0 ? (
            photos.map((photo) => (
              <div style={{gap: '10px'}} className="col-4 mb-4 mr-4" key={photo.id}>
              <ImageCard key={photo.id} image={photo.img_src} rover={photo.rover.name} number={photo.id} sol={photo.sol} camera={photo.camera.full_name} date={date} status={photo.rover.status} launch_date={photo.rover.launch_date}>
              </ImageCard>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center">No photos found for this date.</p>
          )}
        </div>
    </div>
  );
}

export default App;
