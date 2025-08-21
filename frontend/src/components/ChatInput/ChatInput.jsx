function ChatInput({value, onChange, onKeyDown}) {

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Enter your message... Press enter to send"
        className="w-2xl p-1.5 text-white bg-gray-800 border-2 border-gray-600 rounded-md placeholder-gray-400 focus:border-green-400 focus:bg-gray-700 focus:outline-none transition-colors duration-200"
      />
    </div>
  );
}

export default ChatInput;
