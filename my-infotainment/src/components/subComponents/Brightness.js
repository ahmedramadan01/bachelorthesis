import React, { useState } from "react";
import styles from "./brightness.module.css";

/**
 * @constructor Brightness
 * @param {int} rangeValue A state variable store the user input.
 * @returns JSX Elements the user interface resposnible for changing the brightness of the screen.
 */
const Brightness = ({ sendDataToScreen }) => {
  const [rangeValue, setRangeValue] = useState(100);

  /**
   * @return vodi
   * @param {Event} event
   * update the range value state variable based on the user input
   * and then this value will be sended to the screen so the brighness take the effect on the screen 
   */
  const handleRangeChange = (event) => {
    setRangeValue(event.target.value);
    sendDataToScreen(rangeValue);
  };

  return (
    <div className={styles.brightness}>
      <input
        type="range"
        id="range"
        min="10"
        max="100"
        value={rangeValue}
        onChange={handleRangeChange}
      />
    </div>
  );
};

export default Brightness;
