import { useContext } from "react";
import { ChatContext } from "../App";
import Message from "./Message";

const ChatHistory = () => {
  const { chatHistory } = useContext(ChatContext);
  
  return (
    <div className="bg-gray-700 m-0 p-5">
      <h2 className="m-0 p-0 text-white">Chat History</h2>
      {chatHistory.length === 0 ? (
        <p className="text-white">No chat history available.</p>
      ) : (
        chatHistory.map((msg) => (
          <Message key={msg.id} message={msg.body} />
        ))
      )}
    </div>
  );
};

export default ChatHistory;
