import { useState } from "react";
import "./App.css";
import Hardkey from "./components/UI/hardkeys/Hardkey";
import Screen from "./components/mainscreen/Screen";
import speakerIcon from "./img/speaker.png";
import phoneIconWhite from "./img/phonewhite.png";
import emergencyIcon from "../src/img/emergencyIcon.png";
import Message from "./components/message/Message";
import EmergencyMessage from "./components/subComponents/EmergencyMessage";
import Loader from "./components/subComponents/Loader";

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [response, setResponse] = useState("");
  const [responseColor, setResponseColor] = useState("");

  const handleEmergency = () => {
    setShowMessage(true);
  };

  const dontshowComm = () => {
    setShowMessage(false);
  };

  const receiveResponseFromServer = (data) => {
    setResponse(data);
    if (data === "OK") {
      setResponseColor("green");
    } else {
      setResponseColor("red");
    }
  };

  const HardKeysHorizontal = [1,2,3,4,5,6,7,8,9,0]

  return (
    <div className="App">
      <header className="App-header">
        {showMessage && (
          <>
            <Message
              lastDigit="3"
              sendResponseToScreen={receiveResponseFromServer}
            />
            <p
              style={{
                position: "absolute",
                fontSize: "20px",
                left: "61%",
                top: "40%",
                color: `${responseColor}`,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {response}
            </p>
            <EmergencyMessage />
            <Loader />
          </>
        )}

        <Screen dontshowComm={dontshowComm} />
        <div className="flex-container-v">
          <Hardkey
            imgurl={emergencyIcon}
            width="30px"
            height="30px"
            onClick={handleEmergency}
            alt="emergecny"
          />
          <Hardkey num="11" alt=""/>
          <Hardkey num="12" imgurl="" alt=""/>
          <Hardkey num="13" alt=""/>
          <Hardkey num="14" alt=""/>
        </div>

        <div className="flex-containervv">
          <Hardkey imgurl={phoneIconWhite} width="20px" height="20px" num="2" alt="phone"/>
          <Hardkey imgurl={phoneIconWhite} width="20px" height="20px" num="3" alt="phone"/>
          <Hardkey imgurl={speakerIcon} width="20px" height="20px" alt="speaker"/>
        </div>

        <div className="flex-container">
          {HardKeysHorizontal.map((hk) => <Hardkey num={`${hk}`} alt="" key={`${hk}`}/> )} 
          
        </div>
      </header>
    </div>
  );
}

export default App;
