import { connect, sendMsg } from "./routes";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import ChatHistory from "./components/ChatHistory/ChatHistory";
import ChatInput from "./components/ChatInput/ChatInput";
import { LuSend } from "react-icons/lu";

function Dashboard() {
  const [chatHistory, setchatHistory] = useState([]);
  const [inputmsg, setInputmsg] = useState("");

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      sendMsg(inputmsg);
      setInputmsg("");
    }
    if (e.type === "click") {
      e.preventDefault();
      sendMsg(inputmsg);
      setInputmsg("");
    }
  };
  useEffect(() => {
    connect((msg) => {
      setchatHistory((prev) => [...prev, msg]);
    });
  }, []);
  return (
    <div className="w-full h-screen bg-black">
      <Header />
      <div className="w-full p-4 space-y-3">
        <ChatHistory chatHistory={chatHistory} />
      </div>
      <div className="w-full items-center justify-end mt-2">
        <ChatInput onClick={handleKeydown} />
        <button onClick={handleKeydown} className="ml-2">
          <LuSend className="w-5 h-5 text-white"  />
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
