import React from "react";
import { Route, Routes } from "react-router-dom";
import ChatComponent from "./components/Chat";
import PastConversations from "./components/ConversationList";
import ThemeToggle from "./components/ThemeToggle";
import { ChatProvider } from "./contexts/ChatContext";
import "./App.css";

function App() {
  return (
    <>
      <ThemeToggle />
      <ChatProvider>
        <div className="App">
          <Routes>
            <Route path="/history" element={<PastConversations />} />
            <Route path="/" element={<ChatComponent />} />
          </Routes>
        </div>
      </ChatProvider>
    </>
  );
}

export default App;
