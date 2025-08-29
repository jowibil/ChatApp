import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const ChatInput = ({ value, onChange, onKeyDown, onSend }: ChatInputProps) => {
  return (
    <div className="bg-black border-t border-gray-800 px-6 py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder="Type your message..."
            className="w-full bg-gray-900 border border-gray-700 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all duration-200"
          />
        </div>
        <button
          onClick={onSend}
          disabled={!value.trim()}
          className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-100 transition-all duration-200 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;