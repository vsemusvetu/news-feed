import React, { useState, useEffect, useRef } from "react";
import { Card, Tag } from "antd";

const PostCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  const wrapperRef = useRef(null);
  const fullRef = useRef(null);

  const checkOverflow = () => {
    const fullEl = fullRef.current;
    if (fullEl) {
      const fullHeight = fullEl.scrollHeight;
      setMeasuredHeight(fullHeight);

      const lineHeight = parseFloat(getComputedStyle(fullEl).lineHeight);
      const maxHeight = lineHeight * 3;

      setIsOverflowing(fullHeight > maxHeight + 1);
    }
  };

  useEffect(() => {
    checkOverflow();

    const handleResize = () => {
      checkOverflow();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [post.body]);

  return (
    <Card title={post.title} style={{ marginBottom: 16 }}>
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          maxHeight: expanded ? measuredHeight : "5em",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
          PaddingBottom: 2,
        }}
      >
        <div ref={fullRef}>{post.body}</div>

        {!expanded && isOverflowing && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              paddingLeft: "30%",
              background: "linear-gradient(to right, transparent, white 80%)",
              textAlign: "right",
              pointerEvents: "none",
            }}
          >
            ...
          </div>
        )}
      </div>

      {isOverflowing && (
        <a onClick={() => setExpanded(!expanded)}>
          {expanded ? "hide..." : "...show more"}
        </a>
      )}

      <div style={{ marginTop: 8 }}>
        {post.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div>
        {typeof post.reactions === "object" ? (
          <>
            👍 {post.reactions.likes} | 👎 {post.reactions.dislikes}
          </>
        ) : (
          <>👍 {post.reactions}</>
        )}
      </div>
    </Card>
  );
};

export default PostCard;
