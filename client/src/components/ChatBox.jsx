import React from "react";
import { Avatar, Image } from "antd";

export default function ChatBox({ avatar, user, message, time }) {
  const storedUser = localStorage.getItem("user");
  const yours = user.toLowerCase() === storedUser.toLowerCase();

  return (
    <div className={`message ${yours ? "right" : "left"}`}>
      <Avatar
        size={35}
        src={<Image src={avatar} className="avatar" preview={false} />}
      />
      <div>
        <div className="message-content">
          <p>{message}</p>
        </div>
        <div className="message-meta">
          <p id="time">{time}</p>
          <p id="author">{user}</p>
        </div>
      </div>
    </div>
  );
}
