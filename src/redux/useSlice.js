import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    follow: (state, action) => {
      console.log(action.payload);
      state.currentUser = {
        ...state.currentUser,
        followings: [...state.currentUser.followings, action.payload],
      };
    },
    unfollow: (state, action) => {
      console.log(action.payload);
      state.currentUser = {
        ...state.currentUser,
        followings: state.currentUser.followings.filter(
          (e) => e !== action.payload
        ),
      };
    },
    logOut: (state) => {
      state.currentUser = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
  follow,
  unfollow,
} = UserSlice.actions;
export default UserSlice.reducer;
