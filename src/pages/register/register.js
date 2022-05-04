import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { useHistory } from "react-router";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post(
          "https://sqa-social.herokuapp.com/auth/register",
          user
        );
        history.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="register">
      <div className="register-container">
        <h1>UniDesign</h1>
        <div className="register-banner">
          Sign up to see photos and videos from your friends
        </div>
        <div className="register-login-with"> Log in with</div>
        <div className="login-signup-auth0">
          <i className="bx bxl-facebook-circle"></i>
          <i className="bx bxl-google"></i>
          <i className="bx bxl-instagram"></i>
          <i className="bx bxl-twitter"></i>
        </div>
        <div className="register-horirontal">
          <hr></hr>
          <div className="register-or">Or</div>
        </div>

        <form className="register-form">
          <div className="register-form-username">
            <input
              ref={username}
              placeholder="Username"
              type="text"
              className=""
            ></input>
          </div>
          <div className="register-form-username">
            <input
              ref={email}
              placeholder="Email"
              type="text"
              className=""
            ></input>
          </div>
          <div className="register-form-username">
            <input
              ref={password}
              placeholder="Password"
              type="password"
              className=""
            ></input>
          </div>
          <div className="register-form-username">
            <input type="date" className=""></input>
          </div>

          <div className="register-form-username">
            <input
              ref={passwordAgain}
              placeholder="Comfirm Password"
              type="password"
              className=""
            ></input>
          </div>
          <div className="register-form-pravicy">
            <input type="checkbox"></input>
            <label className="">I agree with pravicy and and policy</label>
          </div>
          <button onClick={handleClick} className="register-submit-btn">
            Sign up
          </button>
        </form>
        <div className="register-switch-form">
          <span className="">Already have an account ?</span>
          <Link to="/">Sign up</Link>
        </div>
      </div>
    </div>
  );
}
