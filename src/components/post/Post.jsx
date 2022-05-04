import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import "./post.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { likeHandle } from "../../apiCall";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

function Post(props) {
  const user = useSelector((state) => state.user.currentUser);
  const [isLike, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likes.length);
  const userId = user._id;

  const dispatch = useDispatch();

  const handleLikeClick = () => {
    setIsLiked(!isLike);
    if (!isLike) {
      setLikeCount((state) => (state = +1));
    } else {
      setLikeCount((state) => (state -= 1));
    }
    try {
      likeHandle(dispatch, { userId, postId: props.id });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLiked(props.likes.includes(userId));
  }, [userId]);

  return (
    <div className="post">
      <div className="post-wrapper">
        <div className="post-header">
          <div className="post-header-left">
            <Link to={`/profile/${props.userId}`}>
              {user.profilePicture ? (
                <img
                  className="profile__img"
                  src={user.profilePicture}
                  alt=""
                />
              ) : (
                <img
                  className="profile__img"
                  src="http://localhost:3000/assets/story2.png"
                  alt=""
                />
              )}
            </Link>
            <div className="post-user-infor">
              <div className="post-user-name">{props.username}</div>
              <div className="post-time">Hanoi, 20 MINUTES AGO</div>
            </div>
          </div>
          <div className="post-header-right"></div>
        </div>
        <div className="post-main">
          <div className="post-des">{props.description}</div>
          <img src={props.postImg} />
        </div>
        <div className="post-footer">
          <div className="post-reaction">
            <div>{likeCount}</div>
            {isLike ? (
              <i
                onClick={handleLikeClick}
                class="icon-react bx bxs-heart"
                style={{ color: "red" }}
              ></i>
            ) : (
              <i
                onClick={handleLikeClick}
                className="icon-react bx bx-heart"
              ></i>
            )}
            <i className="icon-react bx bx-message-alt"></i>
            <i className="icon-react bx bx-share-alt"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  userImg: PropTypes.string,
  username: PropTypes.string,
  description: PropTypes.string,
  postImg: PropTypes.string,
  like: PropTypes.number,
  comments: PropTypes.number,
};

export default Post;
