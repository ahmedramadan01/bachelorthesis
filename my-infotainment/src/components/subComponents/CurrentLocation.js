import React, { useState, useEffect } from "react";

/**
 * @constructor CurrentLocation
 * @param {object} position A state variable store the latitude and longtitude opf the current position
 * @param {function} useEffect A reactHook which is responsible for getting the current position and then update the position state
 * @returns JSX Element the user interface of the currentlocation
 */
const CurrentLocation = () => {
  const [position, setPosition] = useState({ latitude: null, longitude: null });
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        fontSize: "10px",
        left: "61%",
        top: "33%",
        backgroundColor: "#454f5f",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "5px" }}>
        <span role="img" aria-label="location" style={{ marginRight: "5px" }}>
          📍
        </span>
        Latitude: {position.latitude}
      </div>
      <div>
        <span
          role="img"
          aria-label="location"
          style={{ marginRight: "5px" }}
        ></span>
        Longitude: {position.longitude}
      </div>
    </div>
  );
};
export default CurrentLocation;
