import { useState } from "react";

export default function InputText({ addMessage }) {
  const [message, setMessage] = useState("");

  function addAMessage() {
    addMessage({
      message,
    });
    setMessage("");
  }

  return (
    <div className="chat-footer">
      <input
        type="text"
        placeholder="WhatsApp..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && message !== "" && addAMessage()}
        autoFocus
      />
      <button onClick={() => addAMessage()}>&#9658;</button>
    </div>
  );
}
