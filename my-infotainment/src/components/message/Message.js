import React, { useEffect, useState } from "react";
import styles from "./message.module.css";

/**
 * A functional component which is responsible for sending messages to our flask web servers
 * @constructor Message
 * @param {object} props
 * lastDigit prop is the last digit of our flask webservers. it could be 0,1,2,3 since we have
 * 4 flask webservers controlcenter, passengers, train dispatcher and Emergency
 * 
 * @param {string} message input value of the user
 * @param {string} statusText response text of the web server
 */
function Message(props) {

  const [message, setMessage] = useState("");
  const [statusText, setStatusText] = useState("");
  const [avgRes,setAvgRes] = useState(0)
  const [resArr,setResArr] = useState([])

  /**
   * fetching the flask web server and send message and timestamp of the message to that flask webserver asynchronize
   * @return sendMessage
   * 
   */
  const sendMessage = async () => {
    try {
      const startTime = performance.now()
      const currentTimeStamp = new Date().toISOString();
      const response = await fetch(`http://127.0.0.1:500${props.lastDigit}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message, timeStamp: currentTimeStamp }),
      });
      const endTime = performance.now();
      const responseTime = endTime - startTime;
      setResArr((prevResArr) => [...prevResArr, responseTime]);


      const responseData = response.statusText;
      setStatusText(responseData);
      console.log("Response from Flask server:", responseData);
    } catch (error) {
      setStatusText("Error");
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (resArr.length > 0) {
      const totalResponseTime = resArr.reduce((acc, time) => acc + time, 0);
      const avgTime = totalResponseTime / resArr.length;
      setAvgRes(avgTime);
    }
    props.sendResponseToScreen(statusText);
  }, [statusText, props,resArr]);

  return (
    <div className={styles.message}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message"
        style={{ marginLeft: "20px" }}
        id="input-message"
      />
      <button
        onClick={sendMessage}
        style={{
          display: "block",
          fontWeight: "900",
          marginTop: "20px",
          marginLeft: "20px",
          padding: "5px",
          border: "none",
          backgroundColor: "orange",
          color: "black",
        }}
        id="btn-message"
      >
        Send Message
      </button>
    </div>
  );
}

export default Message;
