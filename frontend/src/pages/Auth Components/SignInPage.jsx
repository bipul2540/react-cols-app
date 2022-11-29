import { Header } from "../General Components/Header";
import { Logo } from "../General Components/Logo";
import styles from "./SignInPage.module.scss";
import { Link, Navigate } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { Footer } from "../General Components/Footer";

import { useFormik } from "formik";
import { SignInSchema } from "../../auth/validations/UserValidations";
import axios from "axios";
import { useSelector } from "react-redux";
import { useToken } from "../../auth/useToken";

export const SignInPage = () => {
  const navigate = useNavigate();
  const [, setToken] = useToken();

  const initialValues = {
    email: "",
    password: "",
  };

  const authData = useSelector((state) => state.auth.authData);

  const { values, errors, touched, handleChange, handleSubmit, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignInSchema,
      onSubmit: async (values, action) => {
        await axios
          .post("http://localhost:8080/api/login", {
            email: values.email,
            password: values.password,
            verificationString: localStorage.getItem("verificationString"),
          })
          .then((response) => {
            const { token } = response.data;
            setToken(token);
            navigate("/");
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });

  return (
    <div className={styles.mainContainer}>
      <Header
        pText='New to Cols?'
        btnText={"Create an account"}
        clickHandler={() => navigate("/auth/signup")}
      />
      <div className={styles.container}>
        <h1>Sign In</h1>
        <button className={styles.signIn}>Sign in using Google</button>
        <div className={styles.styleLine}>
          <p>or Sign in with your email</p>
        </div>

        <form action='' className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.forminput}>
            <p className={styles.label}>Email address</p>
            <input
              type='text'
              placeholder='Enter you email'
              name='email'
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={
                errors.email && touched.email ? "input__error-border" : null
              }
            />
            {errors.email && touched.email ? (
              <p className='input__err-msg'>{errors.email}</p>
            ) : null}
          </div>

          <div className={styles.forminput}>
            <div className={styles.password}>
              <p className={styles.label}>Password</p>
              <Link to='/auth/reset-password'>Forgot password?</Link>
            </div>
            <input
              type='password'
              placeholder='Enter your password'
              name='password'
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

          <button className={styles.signInButton} type='submit'>
            Sign in
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};
