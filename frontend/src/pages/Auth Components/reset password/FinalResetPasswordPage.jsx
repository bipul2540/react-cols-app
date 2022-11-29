import React from "react";
import { Header } from "../../General Components/Header";
import styles from "./FinalResetPasswordPage.module.scss";

import { passwordSchema } from "../../../auth/validations/UserValidations";
import { useFormik } from "formik";
import axios from "axios";

import { useSelector } from "react-redux";
import { useState } from "react";
import ResetPasswordSuccessPage from "./ResetPasswordSuccessPage";
import { useNavigate } from "react-router-dom";

const FinalResetPasswordPage = () => {
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const email = useSelector((state) => state.auth.authData.email);
  console.log(email);
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const { values, errors, handleChange, handleSubmit, handleBlur, touched } =
    useFormik({
      initialValues,
      validationSchema: passwordSchema,
      onSubmit: async (values, action) => {
        const verificationString = localStorage.getItem("verificationString");
        await axios
          .post("http://localhost:8080/api/otp-verified/change-password", {
            email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            verificationString,
          })
          .then((response) => {
            console.log(response);
            setIsPasswordChanged(true);
            action.resetForm(initialValues);
            navigate("/reset-password/success")
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });

  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <h1 className={styles.heading}>Change Password</h1>

        <div className={styles.container__form}>
          <form action='' className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form__input}>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                placeholder='Enter your new password'
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.password && touched.password
                    ? "input__error-border"
                    : null
                }
              />

              {errors.password && touched.password ? (
                <p className='input__err-msg'>{errors.password}</p>
              ) : null}
            </div>

            <div className={styles.form__input}>
              <label htmlFor='confirmPassword'>confirm Passowrd</label>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Enter your confirm password'
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.confirmPassword && touched.confirmPassword
                    ? "input__error-border"
                    : null
                }
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <p className='input__err-msg'>{errors.confirmPassword}</p>
              ) : null}
            </div>

            <div className={styles.form__input__btn}>
              <button  className={styles.btn__close}>
                close
              </button>
              <button type='submit' className={styles.btn__submit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default FinalResetPasswordPage;
