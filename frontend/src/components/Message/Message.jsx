const MessageComponent = ({ message }) => {
  const messagebody = message?.body || "";

  return <div className="rounded-md bg-gray-500 text-white w-fit p-2 mt-2">{messagebody}</div>;
};

export default MessageComponent;
