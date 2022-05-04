import "./rightbar.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Rightbar() {
  return (
    <div className="rightbar">
      <div className="rightbar-wrapper">
        <div className="rightbar-chat">
          <div className="rightbar-chat-top">
            <h3>Message</h3>
            <div className="sidebar_chat-search">
              <i className="bx bx-search-alt-2"></i>
              <input placeholder="Search messages" />
            </div>
            <div className="rightbar-option__chatbox">
              <div>Primary</div>
              <div>Genaral </div>
              <div>Request</div>
            </div>
            <div className="rightbar-option__chatbox"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
