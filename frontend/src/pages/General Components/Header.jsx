import { Logo } from "./Logo";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

export const Header = ({ pText, btnText, clickHandler }) => {
  return (
    <header className={styles.container}>
      <div className={styles.containerLeft}>
        <Logo />
      </div>

      <div className={styles.containerRight}>
        <p>{pText}</p>

        {btnText && (
          <button
            className={styles.button_createAccount}
            onClick={clickHandler}>
            {btnText}
          </button>
        )}
      </div>
    </header>
  );
};
