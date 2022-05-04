import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { Posts } from "../../dummyData";
import { axiosInstance } from "../../apiCall";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPost = async () => {
      const res = await axiosInstance.get("/posts/timeline");
      console.log(res.data);
      setPosts(res.data);
    };
    getPost();
  }, []);

  return (
    <div className="feed">
      <Share />
      <div className="feed-wrapper">
        {posts &&
          posts.map((post, index) => {
            return (
              <Post
                key={index}
                description={post.desc}
                postImg={post.img}
                username={post.username}
                likes={post.likes}
                id={post._id}
                userId={post.userId}
              />
            );
          })}
      </div>
    </div>
  );
}
