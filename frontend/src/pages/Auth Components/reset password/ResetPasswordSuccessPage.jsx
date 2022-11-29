import React from "react";
import { Header } from "../../General Components/Header";
import image from "./../../../assets/mobile login-pana.svg";
import styles from "./ResetPasswordSuccessPage.module.scss";

const ResetPasswordSuccessPage = () => {
  return (
    <>
      <Header />
      <div className={styles.main__container}>
        <img className={styles.image} src={image} alt='' />
        <h2 className={styles.heading}>Password Reset</h2>
        <p className={styles.info}>Your password has been reset successfully</p>
        <button className={styles.goToLogin__page}>
          Continue to Login page
        </button>
      </div>
    </>
  );
};

export default ResetPasswordSuccessPage;
