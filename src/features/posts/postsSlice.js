import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (skip) => {
  const res = await axios.get(
    `https://dummyjson.com/posts?limit=10&skip=${skip}`
  );
  return res.data.posts;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    skip: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload];
        state.status = "succeeded";
        state.skip += 10;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default postsSlice.reducer;
