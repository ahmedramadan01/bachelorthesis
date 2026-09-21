import styles from "./screen.module.css";
import Softkey from "../UI/softkeys/Softkey";
import React, { useState, lazy, Suspense } from "react";
import brightnessIcon from "../../img/brightness.png";
import contrastIcon from "../../img/contrast.png";
import train2trainCall from "../../img/train2trainCall.png";
import trainsCall from "../../img/trainsCall.png";
import train2controlCenterCall from "../../img/train2controlCenterCall.png";
import Brightness from "../subComponents/Brightness";
import Message from "../message/Message";
import Weather from "../weather/Weather"
import CurrentLocation from "../subComponents/CurrentLocation";
import cloud from "../../img/cloud.png";
import Loader from "../subComponents/Loader";

 let clock = new Date().toLocaleTimeString();
/**
 * A functional component which is responsible for displaying our screen user interface with its sub components childrens such as Message, trainDataForm
 * , softkey and Weather
  * @constructor Screen
  * @param {object} props properties of Screen functional component
  * @param {string} screenBrightness A state variable storage the brightness of the screen
  * @param {boolean} showMessage A state variable responsible for conditional rendering of the message component
  * @param {boolean} showBrightnessSlider A state variable responsible for conditional rendering of Brighness slider
  * @param {boolean} showSysMenu A state variable responsible for conditional renering the system menu
  * @param {string} network A state variable storage the current network mode
  * @param {object} trainData A state variable storage the train data num,Eva, typ
  * @param {boolean} loading A state variable responisble for conditional rendering of loading component the animation
  * @param {int} lastDigitOfServer A state variable storage the last digit of the flask web servers it could be 0,1,2,3
  * @param {string} response A state variable storage the response status text of the flask webserver
  * @param {string} responseColor A state variable color the response of the flask web server green if server recieved message successfully or red if fails
  * @param {function} lazy A built-in function responsible for lazy importing of some of react components. good for performance optimizing
 *  @returns jsx elements user interface of the screen
 */
const Screen = (props) => {

  const [screenBrightness, setScreenBrightness] = useState("100");
  const [showMessage, setShowMessage] = useState(false);
  const [showBrightnessSlider, setShowBrightnessSlider] = useState(false);
  const [showSysMenu, setShowSysMenu] = useState(false);
  const [network, setNetwork] = useState("GSMR-D");
  const [loading, setLoading] = useState(false);
  const [showTrainDataForm, setShowTrainDataForm] = useState(false);
  const [trainData, setTrainData] = useState({
    num: "244567",
    typ: "Fuehr FZ",
    EVA: "RCA",
  });
  const [colorNetworkBar, setColorNetworkBar] = useState("");
  const [showWeather, setShowWeather] = useState(false);
  const [lastDigitOfServer, setLastDigitOfServer] = useState(0);
  const [time, setTime] = useState(clock);
  const [response, setResponse] = useState("");
  const [responseColor, setResponseColor] = useState("");

  const SysMenu = lazy(() => import('./SysMenu'));
  const TrainDataForm = lazy(()=>import('../trainData/TrainDataForm'))


  const updateTime = () => {
    clock = new Date().toLocaleTimeString();
    setTime(clock);
  };

  setInterval(updateTime);

  /**
   * @return receiveDataFromBrightness
   * @param {string} data
   * recieving brightness value from brightness components and then apply it to screen.
   * update the screenBrightness state variable
   * @returns void
   *  
   */
  const receiveDataFromBrightness = (data) => {
    setScreenBrightness(data);
  };

  /**
   * @return void
   * Shows the brightness slider
   */
  const showBrightness = () => {
    setShowBrightnessSlider(true);
  };

  /**
   * @return void
   * @param {int} lastDigit
   * This function is fired when softkey componnet is clicked to Show the message form
   * last digit of the flask webserver will be passed to this function 
   */
  const showComm = (lastDigit) => {
    setShowMessage(true);
    setLastDigitOfServer(lastDigit);
  };

  /**
   * @return void
   * This function is fired when screen is clicked to hide any opened form such as message form, trainDate form 
   */
  const dontshowComm = () => {
    if (showMessage === true) {
      setShowMessage(false);
    }
    if (showBrightnessSlider === true) {
      setShowBrightnessSlider(false);
    }

    if (showWeather === true) {
      setShowWeather(false);
    }

    if (showSysMenu === true) {
      setShowSysMenu(false);
    }
    if (showTrainDataForm === true) {
      setShowTrainDataForm(false);
    }

    if (response !== "") {
      setResponse("");
      setResponseColor("");
    }
  };


/**
 * @return void
 * @param {string} network
 * change the current network and simulate delay before changing network mode 
 */
  const changeNetwork = (network) => {
    setLoading(true);
    setTimeout(() => {
      setNetwork(network);

      setLoading(false);
    }, 1000);
    setShowSysMenu(false);
  };

  const showZD = () => {
    setShowTrainDataForm(true);
    setColorNetworkBar("green");
  };

  const handleSysMenu = () => {
    setShowSysMenu(true);
  };

  /**
   * @return void
   * @param {object} tdata 
   * changing train data
   * @example tdata is {num:"123564","Typ":"Fuehr FZ","EVA":"RCA"}
   * 
   */
  const handleDataFromTrainDataForm = (tdata) => {
    console.log("Data from TrainData:", tdata);
    setTrainData(tdata);
    setShowTrainDataForm(false);
    setColorNetworkBar("");
  };

  const handleWeather = () => {
    setShowWeather(true);
  };

  /**
   * @return void
   * @param {string} data 
   * display a feedback to a user whether the data sent successfully or not.
   */
  const receiveResponseFromServer = (data) => {
    setResponse(data);
    if (data === "OK") {
      setResponseColor("green");
    } else {
      setResponseColor("red");
    }
  };

  return (
    <div className={styles.screenflexcontainer} onClick={props.dontshowComm}>
      {showMessage && (
        <Message
          lastDigit={lastDigitOfServer}
          sendResponseToScreen={receiveResponseFromServer}
        />
      )}
      {showBrightnessSlider && (
        <Brightness sendDataToScreen={receiveDataFromBrightness} />
      )}
      {showSysMenu && <Suspense fallback={<Loader/>}><SysMenu changeNetwork={changeNetwork}/> </Suspense>}
      {showTrainDataForm && (
        <Suspense fallback={<Loader/>}><TrainDataForm sendDataToScreen={handleDataFromTrainDataForm} /></Suspense>
      )}
      <CurrentLocation />
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
      {showWeather && <Weather/>}
      <div className={styles.screenadjust}>
        <Softkey name="vol" alt=""/>
        <Softkey imgurl={contrastIcon} width="30px" height="30px" alt="contrast" />
        <Softkey
          imgurl={brightnessIcon}
          width="30px"
          height="30px"
          onClick={showBrightness}
          alt="brightness"
        />
        <Softkey
          imgurl={cloud}
          width="30px"
          height="30px"
          onClick={handleWeather}
          alt="cloud"
        />
      </div>
      <div
        className={styles.subscreen}
        style={{ opacity: `${screenBrightness * 0.01}` }}
        onClick={dontshowComm}
      >
        {loading && <Loader />}
        <div style={{ display: "flex", width: "100%" }}>
          <p className={styles.time}>{time}</p>
          <p className={styles.network}>{network}</p>
        </div>
        <div className={styles.softkeycomm}>
          <Softkey
            imgurl={train2trainCall}
            width="47px"
            height="47px"
            onClick={() => showComm(0)}
            alt="t2tCall"
            id="soft_key_t2t"
          />
          <Softkey
            imgurl={trainsCall}
            width="47px"
            height="47px"
            onClick={() => showComm(2)}
            alt="groupCall"
            id="soft_key_tc"
          />
          <Softkey
            imgurl={train2controlCenterCall}
            width="47px"
            height="47px"
            onClick={() => showComm(1)}
            alt="train2CC"
            id="soft_key_tcc"
          />
          <Softkey name="RF" alt=""/>
          <Softkey name="SYS" onClick={handleSysMenu} alt=""/>
          <Softkey name="ZD" onClick={showZD} alt=""/>
          <Softkey name="Menu" alt=""/>
        </div>
      </div>
      <div className={styles.rightscreen}>
        <ul>
          Zug Daten
          <li>{trainData.num}</li>
          <li>{trainData.typ}</li>
          <li>{trainData.EVA}</li>
        </ul>
        <div className={styles.networkSymbol}>
          <div
            className={styles.barFour}
            style={{ backgroundColor: `${colorNetworkBar}` }}
          ></div>
          <div
            className={styles.barThree}
            style={{ backgroundColor: `${colorNetworkBar}` }}
          ></div>
          <div className={styles.barTwo}></div>
          <div className={styles.barOne}></div>
          <div className={styles.barZero}></div>
        </div>
      </div>
    </div>
  );
};

export default Screen;
