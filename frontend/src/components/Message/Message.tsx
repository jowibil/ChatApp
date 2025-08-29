interface MessageComponentProps {
  message: string;
  username: string;
  isCurrentUser: boolean;
  isSystem?: boolean;
}

const MessageComponent = ({
  message,
  username,
  isCurrentUser,
  isSystem = false,
}: MessageComponentProps) => {
  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <div className="bg-gray-900 px-4 py-2 rounded-full border border-gray-800">
          <span className="text-gray-400 text-sm">{message}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex mb-6 ${isCurrentUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-sm ${isCurrentUser ? "order-2" : "order-1"}`}>
        {!isCurrentUser && (
          <div className="flex items-center mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center mr-2">
              <span className="text-white text-sm font-medium">
                {username.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-gray-400 text-sm font-medium">{username}</span>
          </div>
        )}
        <div
          className={`px-4 py-3 rounded-2xl relative ${isCurrentUser
              ? "bg-white text-black rounded-br-md shadow-lg"
              : "bg-gray-900 text-white border border-gray-800 rounded-bl-md"
            }`}
        >
          <p className="leading-relaxed">{message}</p>
          {isCurrentUser && (
            <div className="text-right mt-1">
              <span className="text-gray-500 text-xs">{username}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;