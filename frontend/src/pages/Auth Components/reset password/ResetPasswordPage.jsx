import React from "react";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import styles from "./ResetPasswordPage.module.scss";

import { useFormik } from "formik";
import { emailSchema } from "../../../auth/validations/UserValidations";
import { Header } from "../../General Components/Header";
import { useState } from "react";
import { Logo } from "../../General Components/Logo";

import { BsFillCheckCircleFill } from "react-icons/bs";
import FinalResetPasswordPage from "./FinalResetPasswordPage";
import axios from "axios";

import { useDispatch } from "react-redux";
import { emailStore } from "../../../redux-store/authFeature/authSlice";

const ResetPasswordPage = () => {
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  if (!isOtpVerified) {
    return (
      <SendEmailAndVerifyOtp
        isOtpVerified={isOtpVerified}
        setIsOtpVerified={setIsOtpVerified}
      />
    );
  } else {
    return <FinalResetPasswordPage />;
  }
};

const SendEmailAndVerifyOtp = ({ isOtpVerified, setIsOtpVerified }) => {
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    otp: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: emailSchema,
      onSubmit: async (values, action) => {
        const verificationString = localStorage.getItem("verificationString");
        dispatch(emailStore(values.email));
        await axios
          .post("http://localhost:8080/api/verify-otp/reset-password", {
            email: values.email,
            verificationString,
            otp: values.otp,
          })
          .then((response) => {
            console.log(response);
            setIsOtpVerified(true);
          })
          .catch((e) => {
            console.log(e);
          });
      },
    });

  const [email, setEmail] = useState("");
  const [isEmailsent, setisEmailSent] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState("");

  const handleSentOtpClick = async (e) => {
    e.preventDefault();

    if (!errors.email && values.email.length > 0) {
      const verificationString = localStorage.getItem("verificationString");

      if (verificationString && values.email) {
        await axios
          .post("http://localhost:8080/api/send-email/password-reset", {
            verificationString,
            email: values.email,
          })
          .then((res) => {
            console.log(res.data);
            setisEmailSent(true);
            setShowErrorMsg("");
            document.getElementById("email__field").disabled = true;
            document.getElementById("sendOtpbtn").disabled = true;
          })
          .catch((e) => {
            console.log(e.response.data.message);
            setShowErrorMsg(e.response.data.message);
          });
      }
    } else {
    }
  };

  const handleContinueclick = async () => {};
  return (
    <>
      <div className={styles.top__container}>
        <Logo />
      </div>
      <div className={styles.bottom__container}>
        <div className={styles.main__container}>
          <h2 className={styles.container__heading}>Forgot Password?</h2>
          <p className={styles.container__info}>
            Enter the Email associated with your account and will sned and email
            with instrution to reset yor password
          </p>

          {isEmailsent ? (
            <p className={styles.otpSent__success__msg}>
              Email has been sent !
            </p>
          ) : (
            ""
          )}
          {showErrorMsg ? (
            <p className={styles.otpSent__error__msg}>{showErrorMsg}</p>
          ) : (
            ""
          )}

          <form
            action=''
            className={styles.container__form}
            onSubmit={handleSubmit}>
            <div className={styles.email__field}>
              <p className={styles.form__input__label}>Email</p>

              <label>
                <input
                  id='email__field'
                  type='text'
                  placeholder='Enter your email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  autoComplete='off'
                  name='email'
                  className={
                    errors.email && touched.email ? styles.input__err : " "
                  }
                />
                <button
                  id='sendOtpbtn'
                  className={styles.sendOtpbtn}
                  onClick={handleSentOtpClick}>
                  {!isEmailsent ? (
                    " send otp "
                  ) : (
                    <BsFillCheckCircleFill className={styles.check__icon} />
                  )}
                </button>
              </label>

              {errors.email && touched.email ? (
                <p className={styles.form__err__msg}>{errors.email} </p>
              ) : null}
            </div>
            <div className={styles.otp__field}>
              <p className={styles.form__input__label}>Verification Code</p>
              <input
                type='text'
                placeholder='Enter your Otp'
                className={errors.otp && touched.otp ? styles.input__err : ""}
                value={values.otp}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete='off'
                name='otp'
              />
              {errors.otp && touched.otp ? (
                <p className={styles.form__err__msg}>{errors.otp} </p>
              ) : null}
            </div>

            <div className={styles.btn__design}>
              <p className={styles.go__back}>
                <IoIosArrowRoundBack /> Back to log in
              </p>
              <button
                className={styles.form__sendEmailbtn}
                onClick={handleContinueclick}>
                continue <IoIosArrowRoundForward />
              </button>
            </div>
          </form>
        </div>
      </div>{" "}
    </>
  );
};

export default ResetPasswordPage;
