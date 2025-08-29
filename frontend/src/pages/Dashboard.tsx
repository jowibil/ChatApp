import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import ChatHistory from "../components/ChatHistory/ChatHistory";
import ChatInput from "../components/ChatInput/ChatInput";
import { connect, sendMsg } from "../routes/index";

interface ChatMessage {
  username: string;
  content: string;
  timestamp?: Date;
}

function Dashboard() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [inputMsg, setInputMsg] = useState("");
  const currentUser = localStorage.getItem("username") || "Guest";

  useEffect(() => {
    connect(currentUser, (msg) => {
      setChatHistory((prev) => [...prev, msg]);
    });
  }, [currentUser]);

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    sendMsg(currentUser, inputMsg);
    setInputMsg("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };


  return (
    <div className="w-full h-screen bg-black text-white flex flex-col">
      <Header />
      <ChatHistory chatHistory={chatHistory} currentUser={currentUser} />
      <ChatInput
        value={inputMsg}
        onChange={(e) => setInputMsg(e.target.value)}
        onKeyDown={handleKeyDown}
        onSend={handleSend}
      />
    </div>
  );
}

export default Dashboard;
