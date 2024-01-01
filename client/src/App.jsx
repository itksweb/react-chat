import { useEffect, useState } from "react";
import "./App.css";
import ChatContainer from "./components/ChatContainer";
import UserLogin from "./components/UserLogin";

const App = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  //console.log(import.meta.env.VITE_ME);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    setUser("");
  };

  return (
    <div className="App">
      {user ? (
        <ChatContainer logout={logout} />
      ) : (
        <UserLogin getUser={setUser} />
      )}
    </div>
  );
};

export default App;
