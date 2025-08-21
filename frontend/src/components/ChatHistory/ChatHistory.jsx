import { useEffect, useRef } from "react";
import MessageComponent from "../Message/Message";

function ChatHistory({ chatHistory }) {
  const scrollBottom = useRef(null);

  useEffect(() => {
    scrollBottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div>
      <div className="bg-white/10 backdrop-blur-md border border-white/20 text-black font-medium text-[16px] h-[50rem] p-4 rounded-lg overflow-auto space-y-3">
        <h2 className="text-3xl text-white font-bold border-b-2 sticky">Group Chat</h2>
        <div>
          {chatHistory.map((msg, index) => {
            return <MessageComponent key={index} message={msg.data} />;
          })}
        </div>
        <div ref={scrollBottom} />
      </div>
    </div>
  );
}

export default ChatHistory;
