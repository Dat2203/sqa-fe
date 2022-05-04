import React, { useEffect, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { set } from "../../redux/postModalSlice";
import "./profile.css";
import { Posts } from "../../dummyData";
import Postmodal from "../../components/postModal/postModal";
import { axiosInstance } from "../../apiCall";
import { useParams } from "react-router";
import { getUser, FollowApi, unFollowApi } from "../../apiCall";

const PF = process.env.REACT_APP_PUBLIC_FOLDER;

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [posts, setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const id = useParams().username;
  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get(`/posts/profile/${id}`);
      setPosts(res.data);
    };
    getPost();
    const getProfileUser = async () => {
      getUser(dispatch, id).then((res) => {
        setProfileUser(res.data);
        console.log(res.data);
      });
    };
    getProfileUser();
  }, []);

  useEffect(() => {
    if (user.followings) {
      setIsFollow(user.followings.includes(id));
    }
  }, [user.followings]);

  const handleFollow = () => {
    FollowApi(dispatch, { profileId: id, userId: user._id });
  };

  const handleUnFollow = () => {
    unFollowApi(dispatch, { profileId: id, userId: user._id });
  };

  return (
    <div className="profile">
      <Topbar />
      <div className="profile-main">
        <div className="profile-wrapper">
          <div className="profile-user-infor">
            <img src="  /assets/story3.png"></img>
            <div className="profile-infor-details">
              <div className="profile-name">
                <span>{profileUser && profileUser.username}</span>
                <button>Edit profile</button>
                <img src="  /assets/setting.png"></img>
              </div>
              <div className="profile-post">
                <div style={{ display: "flex", marginBottom: "5px" }}>
                  <div>
                    {profileUser.followings && profileUser.followings.length}
                  </div>
                  <div style={{ margin: "0 50px 0 20px", fontWeight: "bold" }}>
                    Followings
                  </div>
                  <div>
                    {profileUser.followers && profileUser.followers.length}
                  </div>
                  <div style={{ margin: "0 20px", fontWeight: "bold" }}>
                    Follows
                  </div>
                </div>
                <div style={{ display: "flex", marginBottom: "15px" }}>
                  <div>{posts.length}</div>
                  <div style={{ fontWeight: "bold", margin: "0 20px" }}>
                    Post
                  </div>
                </div>
              </div>
              {id !== user._id && (
                <div>
                  {isFollow ? (
                    <button onClick={handleUnFollow} className="add_frind">
                      UnFollow
                    </button>
                  ) : (
                    <button onClick={handleFollow} className="add_frind">
                      Follow
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <hr></hr>
          <div className="profile-images-post">
            {posts.map((p, index) => {
              return (
                <img
                  key={index}
                  onClick={() => dispatch(set(p))}
                  className="profile-img"
                  src={p.img}
                ></img>
              );
            })}
          </div>
        </div>
      </div>
      <Postmodal />
    </div>
  );
};

export default Profile;
