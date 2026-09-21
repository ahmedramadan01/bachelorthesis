import React from "react";
import emergencyIcon from "../../img/emergencyIcon.png";

const EmergencyMessage = () => {
  return (
    <div
      style={{
        position: "absolute",
        fontSize: "10px",
        left: "59%",
        top: "60%",
        backgroundColor: "#a70000",
        textAlign: "center",
      }}
    >
      Not Ruf wird aufgebaut!
      <img src={emergencyIcon} width="50p" height="50px" alt="alertNot"/>
    </div>
  );
};

export default EmergencyMessage;
