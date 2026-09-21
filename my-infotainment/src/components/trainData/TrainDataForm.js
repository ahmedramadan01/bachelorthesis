import React, { useState } from "react";

/**
 * 
 * @constructor TrainDataForm
 * @param {object} trainData
 * A functional component returns the ui form of 3 input field for changing train data
 */
const TrainDataForm = ({ sendDataToScreen }) => {
  const [trainData, setTrainData] = useState({
    num: "244567",
    typ: "Fuehr FZ",
    EVA: "RCA",
  });

  /**
   * 
   * @return void
   * @param {int} trainDataNumber
   * A method changing train data number
   */
  const handleChangeNumData = (value) => {
    setTrainData((prevData) => ({ ...prevData, num: value }));
  };

  /**
   * 
   * @return void
   * @param {string} trainDataType
   * A method changing train data type
   */

  const handleChangeTrainType = (value) => {
    setTrainData((prevData) => ({ ...prevData, typ: value }));
  };

  /**
   * 
   * @return void
   * @param {string} trainDataType
   * A method changing train data EVA
   */
  const handleChangeTrainEVA = (value) => {
    setTrainData((prevData) => ({ ...prevData, EVA: value }));
  };


  /**
   * @return void
   * @param {Event} event 
   * submit the train data values to the screen component
   */

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted data:", trainData);
    const data = trainData;
    sendDataToScreen(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        position: "absolute",
        zIndex: "5",
        left: "40%",
        top: "35%",
        backgroundColor: "#454f5f",
        height: "200px",
        width: "300px",
        textAlign: "center",
      }}
    >
      <input
        type="number"
        value={trainData.num}
        placeholder="Enter train number"
        onChange={(e) => handleChangeNumData(e.target.value)}
      />
      <input
        type="text"
        value={trainData.typ}
        placeholder="Enter train type"
        onChange={(e) => handleChangeTrainType(e.target.value)}
      />
      <input
        type="text"
        value={trainData.EVA}
        placeholder="Enter train EVA"
        onChange={(e) => handleChangeTrainEVA(e.target.value)}
      />
      <button
        type="submit"
        style={{
          marginLeft: "59px",
          marginTop: "20px",
          fontWeight: "900",
          border: "none",
          backgroundColor: "orange",
          color: "black",
          padding: "5px 10px",
          cursor: "pointer",
          display: "block",
        }}
      >
        Submit
      </button>
    </form>
  );
};
export default TrainDataForm;
