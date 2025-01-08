"use client";

import React from "react";

type AvatarProps = {
  name: string;
};

const Avatar: React.FC<AvatarProps> = ({ name }) => {
  // Gunakan avatar generator atau default image
  const avatarUrl =
    name !== "Anonymous"
      ? `/api/avatar?name=${encodeURIComponent(name)}`
      : null; // Jangan gunakan string kosong

  if (!avatarUrl) {
    return (
      <div
        style={{
          width: 128,
          height: 128,
          borderRadius: "50%",
          backgroundColor: "green", // Set green as the static background color
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "48px",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        <span>{name[0].toUpperCase()}</span> {/* Display first letter of name */}
      </div>
    );
  }

  return (
    <img
      src={avatarUrl}
      alt={`${name}'s avatar`}
      style={{
        width: 128,
        height: 128,
        borderRadius: "50%",
        border: "2px solid #ddd",
      }}
    />
  );
};

export default Avatar;
