import React, { useState, useEffect } from "react";
import clear from "../../../src/img/clear.png";
import wind from "../../../src/img/wind.png";

/**
 * A functional component render the user interface of the weather component
 * @constructor Weather
 * @param {string} city A state varaible
 * @param {object} data A state variable store the weather data such as temperature, humidity
 * @param {object} error A state variable rendered on the screen if the data fetching is failed
 * @param {function} handleInputChange A function which update the city state variable
 * @returns JSX Elements
 */

const Weather = () => {
  const [city, setCity] = useState("ilmenau");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  /**
   * @return void
   * @param {Event} event 
   * This function is fired when submit button is clicked 
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    console.log(data);
  };

  /**
   * @return void
   * An asyn function which fetching the weather data of the city state variable 
   * and upodate the data state variable
   */
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f5148bbbae20b2d05175b1616e2acdd5`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const jsonData = await response.json();

      setData(jsonData);
    } catch (error) {
      setError("You reach the max Api requests");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#454f5f",
        textAlign: "center",
        width: "300px",
        position: "absolute",
        top: "32%",
        left: "30%",
        zIndex: "1",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          style={{
            fontWeight: "900",
            marginTop: "20px",
            marginLeft: "20px",
            padding: "5px",
            border: "none",
            backgroundColor: "orange",
            color: "black",
          }}
        >
          Get Weather
        </button>
      </form>
      {data ? (
        <>
          <h4 style={{ marginBottom: "0px" }}>{data.name}</h4>
          <div>
            {data.main.temp}°C {<img src={clear} width="40px" height="40px" alt="celsius"/>}
          </div>
          <p>{data.weather[0].main}</p>
          <div>
            {data.wind.speed}m/s <img src={wind} width="30px" height="30px" alt="wind"/>
          </div>
        </>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};
export default Weather;
