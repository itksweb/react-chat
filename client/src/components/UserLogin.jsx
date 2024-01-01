import React, { useState } from "react";
import _ from "lodash";

export default function UserLogin({ getUser }) {
  const [user, setUser] = useState("");

  function handleSetUser() {
    if (!user) return;
    localStorage.setItem("user", user);
    getUser(user);
    localStorage.setItem(
      "avatar",
      `https://picsum.photos/id/${_.random(1, 1000)}/200/300`
    );
  }

  return (
    <div>
      <h1>Super Chat</h1>
      <div>
        <input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Write a random name"
        ></input>
        <button onClick={() => handleSetUser()}>Login</button>
      </div>
    </div>
  );
}
