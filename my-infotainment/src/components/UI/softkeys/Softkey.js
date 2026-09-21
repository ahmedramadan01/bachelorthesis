import styles from "./softkey.module.css";

/**
 * @constructor Softkey
 * @param {object} props properties of softKey Component
 * @example width, height, name and onClick properties of softKey
 * @returns user interface of softkey 
 */
const Softkey = (props) => {
  return (
    <button className={styles.btnsoft} onClick={props.onClick} id={props.id}>
      {props.name}{" "}
      <img
        src={props.imgurl}
        width={props.width}
        height={props.height}
        alt={props.alt}
      />
    </button>
  );
};

export default Softkey;
