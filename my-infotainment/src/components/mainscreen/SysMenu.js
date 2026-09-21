import React from "react";

/**
 * A functional component which is responsible for rendering an ordered lits contains the availabe netwrok modes, the user can choose from.
 * @constructor SysMenu
 * @param {props} changeNetwork This function will be fired when the user choose a netwrok from the available list
 * @returns JSX Elements user interface of the list
 */

const SysMenu = (props) => {
  return (
    <div
      style={{
        backgroundColor: "#454f5f",
        width: "300px",
        position: "absolute",
        top: "35%",
        left: "30%",
        zIndex: "1",
      }}
    >
      <p
        style={{
          color: "black",
          backgroundColor: "orange",
          width: "100%",
          fontWeight: "900",
        }}
      >
        choose your network
      </p>

      <ol>
        <li
          onClick={() => props.changeNetwork("GSMR-SC")}
          style={{ cursor: "pointer" }}
        >
          GSMR-SC
        </li>

        <li
          onClick={() => props.changeNetwork("analoger ZF")}
          style={{ cursor: "pointer" }}
        >
          analoger ZF
        </li>

        <li
          onClick={() => props.changeNetwork("analoger ZF Laender")}
          style={{ cursor: "pointer" }}
        >
          analoger ZF Laender
        </li>

        <li
          onClick={() => props.changeNetwork("analoger ZF OEBB")}
          style={{ cursor: "pointer" }}
        >
          analoger ZF OEBB
        </li>
        <li
          onClick={() => props.changeNetwork("GSMR-D")}
          style={{ cursor: "pointer" }}
        >
          GSMR-D
        </li>
      </ol>
    </div>
  );
};

export default SysMenu;
