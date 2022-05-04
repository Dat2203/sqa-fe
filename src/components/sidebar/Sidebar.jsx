import "./sidebar.css";
import React from "react";
import { Users } from "../../dummyData";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="sidebar-profile">
          <img src="http://localhost:3000/assets/story2.png"></img>
          <div className="sidebar-profile-infor">
            <div>{user.username}</div>
            <span>@dean</span>
          </div>
        </div>
        <div className="sidebar-main"></div>
      </div>
    </div>
  );
}
