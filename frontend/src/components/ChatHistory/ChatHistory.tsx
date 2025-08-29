import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import MessageComponent from "../Message/Message";

interface ChatMessage {
  username: string;
  content: string;
  isSystem?: boolean;
  timestamp?: Date;
}

interface ChatHistoryProps {
  chatHistory: ChatMessage[];
  currentUser: string;
}

const ChatHistory = ({ chatHistory, currentUser }: ChatHistoryProps) => {
  const scrollBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="flex-1 overflow-hidden bg-black">
      <div className="h-full overflow-y-auto px-6 py-4 scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-700">
        <div className="space-y-1">
          {chatHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="text-gray-400 text-lg font-medium mb-2">No messages yet</h3>
              <p className="text-gray-500 text-sm">Start a conversation by sending a message below</p>
            </div>
          ) : (
            chatHistory.map((msg, index) => (
              <MessageComponent
                key={index}
                message={msg.content}
                username={msg.username}
                isCurrentUser={msg.username === currentUser}
                isSystem={msg.isSystem}
              />
            ))
          )}
          <div ref={scrollBottomRef} />
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;