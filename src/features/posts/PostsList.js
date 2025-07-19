import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./postsSlice";
import { Card, Tag, Spin } from "antd";
import PostCard from "./PostCard";

const PostsList = () => {
  const dispatch = useDispatch();
  const { items, status, skip } = useSelector((state) => state.posts);
  const loader = useRef(null);

  useEffect(() => {
    dispatch(fetchPosts(0));
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && status !== "loading") {
        dispatch(fetchPosts(skip));
      }
    });

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [dispatch, skip, status]);

  return (
    <div style={{ padding: "20px", maxWidth: 800, margin: "auto" }}>
      {items.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <div ref={loader} style={{ textAlign: "center", padding: 16 }}>
        {status === "loading" && <Spin />}
      </div>
    </div>
  );
};

export default PostsList;
