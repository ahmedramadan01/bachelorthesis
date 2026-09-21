import styles from "./hardkey.module.css";

const Hardkey = (props) => {
  return (
    <button
      className={styles.btnhard}
      onClick={props.onClick}
      onKeyDown={props.onKeyDown}
    >
      {props.num}{" "}
      <img src={props.imgurl} width={props.width} height={props.height} alt={props.alt}/>
    </button>
  );
};

export default Hardkey;
