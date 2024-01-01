import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import InputText from "./InputText";
import ChatList from "./ChatList";
import { timestampToDate, getAllChats, hourMinSec } from "../libs/helper.js";
//import { port } from "../../../server/server.js";
const port = 5720;
import getDb from "../libs/db.js";
import {
  getDocs,
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
const burl = import.meta.env.PROD? "https://react-chat-backend-two.vercel.app": "localhost"
const url = "";
const socketio = socketIOClient(`${burl}:${port}`);

export default function ChatContainer({ logout }) {
  const [chats, setChats] = useState([]);
  const avatar = localStorage.getItem("avatar");
  const user = localStorage.getItem("user");
  const collName = "Messages";

  useEffect(() => {
    socketio.on("chat", (senderChats) => {
      setChats(senderChats);
    });
  });

  const chatsRef = collection(getDb(), collName);
  useEffect(() => {
    const q = query(chatsRef, orderBy("createdAt", "asc"));
    const unsub = async () => {
      const data = await getAllChats(getDocs, q);
      const newData = data.map((chat) => {
        const { avatar, message, user, createdAt } = chat;
        return { user, avatar, message, time: timestampToDate(createdAt) };
      });
      setChats(newData);
    };
    return () => {
      unsub();
    };
  }, []);

  function addToFirebase(chatParts) {
    const newChat = { ...chatParts, createdAt: serverTimestamp() };
    const chatRef = doc(chatsRef);
    setDoc(chatRef, newChat)
      .then(() => console.log("Chat added succesfully"))
      .catch(console.log);
  }

  const addMessage = (chat) => {
    let date = new Date(Date.now());
    const chatParts = { ...chat, user, avatar };
    const newChat = { ...chatParts, time: hourMinSec(date) };
    addToFirebase(chatParts);
    setChats([...chats, newChat]);
    socketio.emit("chat", [...chats, newChat]);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <span>Hello {user} </span>
        <span onClick={() => logout()}>Log Out</span>
      </div>
      <ChatList chats={chats} />
      <InputText addMessage={addMessage} />
    </div>
  );
}
