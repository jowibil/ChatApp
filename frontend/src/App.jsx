import "./App.css";
import { connect, sendMsg } from "./routes";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import ChatHistory from "./components/ChatHistory/ChatHistory";
import ChatInput from "./components/ChatInput/ChatInput";
import { LuSend } from "react-icons/lu";

function App() {
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
      <div className="w-full p-3">
        <ChatHistory chatHistory={chatHistory} />
        <div className="flex items-center justify-end mt-3 p-2">
          <ChatInput
            value={inputmsg}
            onChange={(e) => setInputmsg(e.target.value)}
            onKeyDown={handleKeydown}
          />
          <button onClick={handleKeydown} className="ml-2 hover:cursor-pointer">
            <LuSend className="text-white w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
