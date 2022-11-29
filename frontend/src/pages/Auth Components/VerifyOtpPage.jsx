import styles from "./VerifyOtpPage.module.scss";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import "./Auth.css";
import { useState } from "react";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useUser } from "../../auth/useUser";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import OtpVerifiedSuccessPage from "./OtpVerifiedSuccessPage";

export const VerifyOtpPage = (props) => {
  const { popupOtp, setPopupOtp, emailProps } = props;

  const closeOtpPopup = () => {
    if (popupOtp) {
      setPopupOtp(!popupOtp);
    }
  };
  const user = useUser();
  const authData = useSelector((state) => state.auth.authData);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [successOtp, setSucccssOtp] = useState(false);
  const [inputValue, setInputValue] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const sendOtpAgainbtn = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8080/api/send-otp", {
        email: authData.email,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(authData.email);

    setLoading(true);
  };

  setTimeout(() => {
    setLoading(false);
  }, 5000);

  const otp =
    inputValue.otp1 + inputValue.otp2 + inputValue.otp3 + inputValue.otp4;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (authData) {
      await axios
        .post("http://localhost:8080/api/verify-otp", {
          email: authData.email,
          verificationString: authData.verificationString,
          otp,
        })
        .then((res) => {
          console.log(res);

          if (res) {
            setSucccssOtp(true);

            setTimeout(() => {
              setSucccssOtp(false);
            }, 10000);
          }
        })
        .catch((err) => {
          console.log(err.response);
        })
    } else {
      console.log("user not found");
    }
  };

  return (
    <div className={styles.main__container}>
      {/* conditional rendering */}
      {successOtp ? (
        <OtpVerifiedSuccessPage />
      ) : (
        <>
          <div className={styles.close} onClick={closeOtpPopup}>
            <CgClose className={styles.close__icons} />
          </div>
          <div className={styles.main__card}>
            <h1>Enter Verification Code</h1>
            <p>We have send a verification Code to{emailProps}</p>

            <form action='' onSubmit={handleSubmit}>
              <div className={styles.otp__input}>
                <input
                  name='otp1'
                  type='text'
                  autoComplete='off'
                  className='otpInput o'
                  value={inputValue.otp1}
                  onChange={handleInputChange}
                  tabIndex='1'
                  maxLength='1'
                />
                <input
                  name='otp2'
                  type='text'
                  autoComplete='off'
                  className='otpInput o'
                  value={inputValue.otp2}
                  onChange={handleInputChange}
                  tabIndex='2'
                  maxLength='1'
                />
                <input
                  name='otp3'
                  type='text'
                  autoComplete='off'
                  className='otpInput o'
                  value={inputValue.otp3}
                  onChange={handleInputChange}
                  tabIndex='3'
                  maxLength='1'
                />
                <input
                  name='otp4'
                  type='text'
                  autoComplete='off'
                  className='otpInput o'
                  value={inputValue.otp4}
                  onChange={handleInputChange}
                  tabIndex='4'
                  maxLength='1'
                />
              </div>
              <div className={styles.links}>
                <a href='' onClick={sendOtpAgainbtn}>
                  Send the code again{" "}
                  {loading ? (
                    <ClipLoader
                      color='#36d7b7'
                      loading={loading}
                      size={15}
                      aria-label='Loading Spinner'
                      data-testid='loader'
                    />
                  ) : (
                    ""
                  )}
                </a>
                <a href=''>Change Email address</a>
              </div>

              <button className={styles.verify__otp_btn} type='submit'>
                Verify
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
