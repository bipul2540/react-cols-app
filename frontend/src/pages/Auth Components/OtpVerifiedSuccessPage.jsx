import React from "react";
import image from "./../../assets/check-mark.svg";
import styles from "./OtpVerifiedSuccessPage.module.scss";
import { useNavigate } from "react-router-dom";

const OtpVerifiedSuccessPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth/signin");
  };
  return (
    <div className={styles.main__container_otp}>
      <div className={styles.logo__container}>
        <img src={image} alt='' />
        <div className={styles.info}>
          <h1>successful!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos esse,
            placeat odio repudiandae hic saepe aliquid repellendus sequi sed
            eveniet!
          </p>
        </div>
      </div>
      <div className={styles.btn__container}>
        <button onClick={handleClick}>Go to Login page</button>
      </div>
    </div>
  );
};

export default OtpVerifiedSuccessPage;
