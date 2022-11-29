import image from "./../../assets/final logo.png";
import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={image} alt='logo' />
    </div>
  );
};
