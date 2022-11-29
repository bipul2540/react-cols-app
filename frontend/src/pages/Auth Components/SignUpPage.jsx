import styles from "./SignUpPage.module.scss";
import { Header } from "../General Components/Header";
import { useNavigate } from "react-router-dom";
import { Footer } from "../General Components/Footer";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { VerifyOtpPage } from "./VerifyOtpPage";
import { useState } from "react";
import { userSchema } from "../../auth/validations/UserValidations";
import { useFormik } from "formik";
import axios from "axios";

import { useDispatch } from "react-redux";
import { authData } from "./../../redux-store/authFeature/authSlice";
import { useToken } from "../../auth/useToken";

import { HashLoader } from "react-spinners";
const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [popupOtp, setPopupOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setToken] = useToken();

  const [signupError, setSignupError] = useState("");
  const [verifyData, setVerifyData] = useState("");

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: userSchema,
      onSubmit: async (values, { setSubmitting, setFieldError, setStatus }) => {
        await axios
          .post("http://localhost:8080/api/signup", {
            name: values.name,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
          })
          .then(
            async (response) => {
              const { token } = response.data;
              setToken(token);
              if (token) {
                await axios
                  .post("http://localhost:8080/api/send-otp", {
                    email: values.email,
                  })
                  .then((res) => {
                    dispatch(authData(res.data.data));
                    localStorage.setItem(
                      "verificationString",
                      res.data.data.verificationString
                    );
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              } else {
                setFieldError({ token: "Token not found!!!" });
              }

              if (response) {
                setSignupError("");
                setIsLoading(true);
                setTimeout(() => {
                  setPopupOtp(true);
                  setIsLoading(false);
                }, 5000);
              }
            },
            (errors) => {
              setSignupError(errors.response.data.message);
            }
          )
          .catch((err) => {
            console.log(err.reponse);
          })
          .finally(() => {
            setSubmitting(false);
          });
      },
    });

  return (
    <>
      <div className={styles.main__container}>
        <Header
          pText='Already have an Account?'
          btnText='Log in'
          clickHandler={() => navigate("/auth/signin")}
        />
        <div className={styles.form__container}>
          {signupError.length > 0 && errors && (
            <p className={styles.signup__error}>{signupError}</p>
          )}
          <div className='loader_div'>
            {isLoading ? <HashLoader color='#d6a036' className='loader' /> : ""}
          </div>

          <h1 className={styles.form__heading}>Sign up</h1>

          <div className={styles.signup__options}>
            <div className={styles.line__txt}>
              <p className={styles.line}></p>
              <p className={styles.txt}>Sign up with</p>
            </div>

            <div className={styles.options__btn}>
              <button>
                <FcGoogle className={styles.gicons} />
                <span>Sign up with Google</span>
              </button>
              <button>
                <FaFacebook className={styles.ficons} />
                <span>Sign up with Facebook</span>
              </button>
            </div>
            <p className={styles.or}>or</p>
          </div>

          {/* =================FORM START=================== */}

          <form action='' className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form__input}>
              <p className={styles.input__label}>Name</p>
              <input
                type='text'
                placeholder='Enter your name'
                autoComplete='off'
                name='name'
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.name && touched.name ? styles.input__err : ""}
              />
              {errors.name && touched.name ? (
                <p className={styles.form__err__msg}>{errors.name} </p>
              ) : null}
            </div>
            <div className={styles.form__input}>
              <p className={styles.input__label}>Email Address</p>
              <input
                type='text'
                placeholder='Enter your email'
                autoComplete='off'
                name='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.email && touched.email ? styles.input__err : ""
                }
              />
              {errors.email && touched.email ? (
                <p className={styles.form__err__msg}>{errors.email} </p>
              ) : null}
            </div>
            <div className={styles.form__input}>
              <p className={styles.input__label}>Password</p>
              <input
                type='password'
                placeholder='Enter your password'
                name='password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password ? styles.input__err : ""
                }
              />
              {errors.password && touched.password ? (
                <p className={styles.form__err__msg}>{errors.password} </p>
              ) : null}
            </div>
            <div className={styles.form__input}>
              <p className={styles.input__label}>Confirm Password</p>
              <input
                type='password'
                placeholder='Confirm your password'
                name='confirmPassword'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? styles.input__err
                    : ""
                }
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <p className={styles.form__err__msg}>
                  {errors.confirmPassword}{" "}
                </p>
              ) : null}
            </div>

            <button type='submit' className={styles.form__signUpBtn}>
              Sign Up
            </button>
          </form>

          {/* =================FORM END=================== */}
        </div>
        <Footer />
      </div>

      {/* ====POP UP PAGE SETUP */}
      <div
        className={
          !popupOtp ? styles.popupOtpPage : styles.popupOtpPage_active
        }>
        <VerifyOtpPage
          popupOtp={popupOtp}
          setPopupOtp={setPopupOtp}
          emailProps={values.email}
        />
      </div>

      {/* ====POP UP PAGE SETUP END */}
    </>
  );
};
