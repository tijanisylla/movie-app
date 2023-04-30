import { useContext, useEffect, useRef } from "react";
import { socialMediaAuth } from "../auth/auth";
import ContextAll from "../context/ContextAll";
import "./Login.css";

import {
  googleProvider,
  facebookProvider,
  yahooProvider,
} from "../auth/authMethods";

const Login = () => {
  const { openLogin, setOpenLogin } = useContext(ContextAll) as any;
  const loginRef = useRef(null) as any;

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setOpenLogin(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [loginRef, setOpenLogin]);

  const handleAuth = async (provider: any) => {
    await socialMediaAuth(provider);
  };

  return (
    <div className={`login ${openLogin && "active__login"}`}>
      <div
        className={`login__container ${
          openLogin ? "active__login__container" : "close__login__container"
        }`}
        ref={loginRef}
      >
        <div className="login__header">
          {/* logo */}
          <div className="login__logo">
            <img
              src={require("../assets/sylla-movies-high-resolution-logo-color-on-transparent-background.png")}
              alt="logo"
            />
          </div>

          <span className="login__title">Sign in</span>

          <span
            className="login__close"
            onClick={() => setOpenLogin(!openLogin)}
          >
            <i className="uil uil-times"></i>
          </span>
        </div>

        <div className="login__buttons">
          <div
            className="social__login--btn lg-google"
            onClick={() => handleAuth(googleProvider)}
          >
            <div className="social__login--icon-wrapper">
              <img
                className="social__login--icon"
                src="https://img.icons8.com/color/48/000000/google-logo.png"
                alt="google"
              />
            </div>
            <span className="btn-text">Sign in with google</span>
          </div>
          <div
            className="social__login--btn lg-facebook"
            onClick={() => handleAuth(facebookProvider)}
          >
            <div className="social__login--icon-wrapper">
              <img
                className="social__login--icon"
                src="https://img.icons8.com/color/48/000000/facebook-new.png"
                alt="facebook"
              />
            </div>
            <span className="btn-text">Sign in with facebook</span>
          </div>
          <div
            className="social__login--btn lg-yahoo"
            onClick={() => handleAuth(yahooProvider)}
          >
            <div className="social__login--icon-wrapper">
              <img
                className="social__login--icon"
                src="https://img.icons8.com/color/48/000000/yahoo.png"
                alt="yahoo"
              />
            </div>
            <span className="btn-text">Sign in with yahoo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
