import axios from "axios";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  follow,
  unfollow,
} from "./redux/useSlice";

const BASE_URL = "https://sqa-social.herokuapp.com/";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const loginCall = async (userCredential, dispatch) => {
  dispatch(loginStart());
  console.log(userCredential);
  try {
    const res = await axios.post(
      "https://sqa-social.herokuapp.com/auth/login",
      userCredential
    );
    console.log(res.data);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const uploadPost = async (dispatch, data) => {
  console.log(data);
  try {
    await axiosInstance.post("/posts/", data);
  } catch (err) {
    console.log(err);
  }
};

// export const getPost = async (dispatch, data) => {
//   try {
//     await axios.get("/posts/timeline",);
//   } catch (err) {
//     console.log(err);
//   }
// };
export const likeHandle = async (dispatch, data) => {
  try {
    console.log(data);
    await axiosInstance.put(`/posts/${data.postId}/like`, data);
  } catch (err) {
    alert(err.message);
  }
};

export const getUser = async (dispatch, data) => {
  try {
    const res = await axiosInstance.get(`/users/?userId=${data}`);
    return res;
  } catch (err) {
    alert(err.message);
  }
};

export const FollowApi = async (dispatch, data) => {
  console.log(data);
  try {
    const res = await axiosInstance.put(`/users/${data.profileId}/follow`, {
      userId: data.userId,
    });
    dispatch(follow(data.profileId));
  } catch (err) {}
};

export const unFollowApi = async (dispatch, data) => {
  console.log(data);

  try {
    const res = await axiosInstance.put(`/users/${data.profileId}/unfollow`, {
      userId: data.userId,
    });
    dispatch(unfollow(data.profileId));
  } catch (err) {}
};
