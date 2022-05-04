import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./postModal.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { remove } from "../../redux/postModalSlice";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const Postmodal = () => {
  const [post, setPost] = useState(undefined);
  const postMo = useSelector((state) => state.postModal.value);
  const dispatch = useDispatch();
  // console.log;

  useEffect(() => {
    setPost(postMo);
    console.log(post);
  }, [postMo]);

  return (
    <div className={`post-modal ${post ? "active-modal" : ""}`}>
      <div className="post-modal_content">
        <div className="post-modal_img">
          {post && <img src={post.img}></img>}
        </div>
        <div className="post-modal_action">
          <div className="post-modal_user">
            <img src="http://localhost:3000/assets/story2.png"></img>
            <div className="post-modal_username">{post && post.username}</div>
          </div>
          <div className="post-modal_desc">{post && post.desc}</div>
          <div className="post-modal_comment-view"></div>
          <hr></hr>
          <div className="post-modal_react">
            <div className="post-modal-reaction">
              <i className="icon-react bx bx-heart"></i>
              <i className="icon-react bx bx-message-alt"></i>
              <i className="icon-react bx bx-share-alt"></i>
            </div>
            <hr></hr>
            <div className="post-modal__comment ">
              <div
                className="post-modal__comment-input"
                style={{
                  border: "solid 1px ",
                  borderRadius: "7px",
                  padding: "0 10px",
                  width: "9 0%",
                }}
              >
                <i class="bx bx-laugh"></i>
                <input
                  placeholder="Add a comment..."
                  style={{ border: "none" }}
                />
              </div>
              <div
                style={{ color: "#0046ff", fontSize: 14, fontWeight: "bold" }}
                className="post-enter"
              >
                Post
              </div>
            </div>
            <i
              onClick={() => dispatch(remove())}
              className=" close-modal bx bx-left-arrow-alt"
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

Postmodal.propTypes = {};

export default Postmodal;
