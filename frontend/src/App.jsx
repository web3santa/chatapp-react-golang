import React, { useEffect, useState } from "react";
import ChatHistory from "./components/ChatHistory";
import ChatInput from "./components/ChatInput";
import { connect } from "./api";
import { Header } from "./components/Header";
export const ChatContext = React.createContext();

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState(null);

  const componentDidMount = () => {
    var socket = new WebSocket('ws://localhost:9000/ws')

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log('Received message:', receivedMessage);
    
      // chatHistory 상태 업데이트
      setChatHistory((prevChatHistory) => [...prevChatHistory, receivedMessage]);
    };
  };
  
  useEffect(() => {
    componentDidMount();
  }, []);

  return (
    <div className="bg-gray-400 m-0 p-0">
      <ChatContext.Provider value={{chatHistory, setChatHistory, message, setMessage}}>
        <header>
          <Header />
        </header>
        <ChatHistory />
        <ChatInput />
      </ChatContext.Provider>
    </div>
  );
}

export default App;
