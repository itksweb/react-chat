import ChatBox from "./ChatBox";
import React, { useEffect, useRef } from "react";

const ChatList = ({ chats }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <div className="chat-body">
      <div className="message-container">
        {chats.map((chat, index) => {
          return (
            <ChatBox
              key={index}
              message={chat.message}
              avatar={chat.avatar}
              user={chat.user}
              time={chat.time}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatList;
