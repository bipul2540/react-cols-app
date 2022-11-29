import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignUpPage } from "./pages/Auth Components/SignUpPage";
import { SignInPage } from "./pages/Auth Components/SignInPage";
import { VerifyOtpPage } from "./pages/Auth Components/VerifyOtpPage";
import { PrivateRoutes } from "./auth/PrivateRoutes.jsx";
import Profile from "./pages/Home components/Profile";
import { Provider } from "react-redux";
import { store } from "./redux-store/store";
import ResetPasswordPage from "./pages/Auth Components/reset password/ResetPasswordPage";
import ResetPasswordSuccessPage from "./pages/Auth Components/reset password/ResetPasswordSuccessPage";
import App from "./App";
import AuthMain from "./pages/Auth Components/AuthMain";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<PrivateRoutes />}>
            <Route path='/' element={<App />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route path='/auth' element={<AuthMain />}>
            <Route path='signin' element={<SignInPage />} />
            <Route path='signup' element={<SignUpPage />} />
            <Route path='reset-password' element={<ResetPasswordPage />} />
          </Route>
          <Route
            path='/reset-password/success'
            element={<ResetPasswordSuccessPage />}
          />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

