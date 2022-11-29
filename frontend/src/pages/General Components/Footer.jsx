import styles from "./Footer.module.scss";
import { FaRegCopyright } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <p>
          {" "}
          <FaRegCopyright /> <span>Cols Limited.</span>
        </p>
      </div>

      <div className={styles.rightContainer}>
        <ul>
          <li>
            {" "}
            <a href=''> Terms</a>
          </li>
          <li>
            {" "}
            <a href=''>Privacy</a>{" "}
          </li>
          <li>
            {" "}
            <a href=''>Security</a>{" "}
          </li>
          <li>
            <a href=''>Get in Touch</a>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};
