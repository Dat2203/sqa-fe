import { useContext, useRef } from "react";
import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { loginCall } from "../../apiCall";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const isFetching = useSelector((state) => state.user.isFetching);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  const googleAuth = () => {
    window.open("http://localhost:4000/auth/google", "_self");
  };
  const logout = () => {
    window.open("http://localhost:4000/auth/logout", "_self");
  };

  return (
    <div className="login">
      <img
        className="login-logo"
        src="http://localhost:3000/assets/login-logo.png"
      ></img>
      <span className="login-name">UDESIGN</span>
      <div className="login-wrapper">
        <form className="loginBox">
          <div className="login-input">
            <img src="/assets/user-circle.png"></img>
            <input ref={email} placeholder="Email" type="email" required />
          </div>
          <div className="login-input">
            <img src="/assets/login-pas.png"></img>

            <input
              ref={password}
              placeholder="Password"
              type="password"
              required
              minLength="6"
            />
          </div>
          <div className="login-action">
            <div className="login-action__input">
              <input type="checkbox"></input>
              <label>Remember me</label>
            </div>
            <a> Forgot Password</a>
          </div>
          <button
            onClick={handleClick}
            className="login-button"
            type="submit"
            disabled={isFetching}
          >
            {isFetching ? (
              <CircularProgress color="white" size="20px" />
            ) : (
              "Log In"
            )}
          </button>
        </form>
        <div className="login-signup">
          <span>Don't have account ? </span>
          <Link to="/register" style={{ textDecoration: "none" }}>
            Sign up
          </Link>
        </div>
        <div className="login-signup-with">
          <span onClick={logout}>Sign up with</span>
          <div onClick={googleAuth} className="login-signup-auth0">
            <i className="bx bxl-facebook-circle"></i>
            <i className="bx bxl-google"></i>
            <i className="bx bxl-instagram"></i>
            <i className="bx bxl-twitter"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
