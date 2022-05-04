import { Link } from "react-router-dom";
import "./topbar.css";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../redux/useSlice";
import { useHistory } from "react-router-dom";

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  const logOutClick = () => {
    dispatch(logOut());
    history.push("/");
  };

  return (
    <div className="topbar">
      <div className="topbar-wrapper">
        <div className="top-bar__left">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="top-bar__left__logo">Unidesign</span>
          </Link>
        </div>
        <div className="top-bar__center">
          <div className="top-bar__center__searchbar">
            <i className="bx bx-search-alt-2"></i>
            <input placeholder="Search for friend, post or video" />
          </div>
        </div>
        <div className="top-bar__right">
          <img
            className="profile__img"
            src="/assets/story2.png"
            alt=""
            onClick={() => setIsOpen(!isOpen)}
          />
          <div className={`topbar-option-menu ${isOpen ? "active" : ""}`}>
            <Link
              to={`/profile/${user._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="topbar-option-item">
                <i className="bx bx-user"></i>
                <span>Profile</span>
              </div>
            </Link>
            <div className="topbar-option-item">
              <i className="bx bx-extension"></i>
              <span>Setting</span>
            </div>
            <div className="topbar-option-item">
              <i className="bx bx-refresh"></i>
              <span>Profile</span>
            </div>
            <hr></hr>
            <div onClick={logOutClick} className="topbar-option-item">
              <i className="bx bx-log-in"></i>
              <span>Log out</span>
            </div>
          </div>
          <i className="topbar-btn bx bx-notification"></i>
          <i className="topbar-btn bx bx-message-square-dots"></i>
          <i className="topbar-btn bx bx-home"></i>
        </div>
      </div>
    </div>
  );
}
