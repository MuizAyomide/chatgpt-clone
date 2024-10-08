import React, { useContext, useEffect, useRef, useState } from "react";
import "./App.css";
import { Context } from "./context/context";

const App = () => {
  const {
    onSent,
    prevPrompt,
    setRecentPrompt,
    loading,
    setInput,
    input,
    newChat,
  } = useContext(Context);

  const [messages, setMessages] = useState([]); // State to hold all messages
  const chatEndRef = useRef(null); // Create a ref for the chat end

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    
    // Create a message object for the prompt
    const newMessage = { type: "user", text: prompt };
    setMessages((prev) => [...prev, newMessage]); // Append the prompt to messages

    // Send the prompt to the bot and await the response
    const response = await onSent(prompt);
    if (response) {
      const botMessage = { type: "bot", text: response }; // Create bot message
      setMessages((prev) => [...prev, botMessage]); // Append bot message
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (input.trim()) {
        handleSend(); // Call handleSend directly
      }
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = { type: "user", text: input };
      setMessages((prev) => [...prev, newMessage]); // Append user message

      // Send input to the context's onSent function and await the response
      const response = await onSent(input);
      if (response) {
        const botMessage = { type: "bot", text: response }; // Create bot message
        setMessages((prev) => [...prev, botMessage]); // Append bot message
      }

      setInput(""); // Clear input field
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="app">
      <div className="sidebar">
        <div className="upperside">
          <div className="upperside-top">
            <img src="./chatgpt.svg" alt="Logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>
          <button className="midbtn" onClick={newChat}>
            <img src="./add-30.png" alt="" className="addbtn" />
            New Chat
          </button>

          <div className="upperside-bottom">
            {prevPrompt.map((item, index) => (
              <button key={index} className="query" onClick={() => loadPrompt(item)}>
                <img src="./message.svg" alt="Query" /> {item.slice(0, 25)}...
              </button>
            ))}
          </div>
        </div>
        <div className="lowerside">
          <div className="listitems">
            <img src="./home.svg" alt="" className="listitems-img" />
            Home
          </div>
          <div className="listitems">
            <img src="./bookmark.svg" alt="" className="listitems-img" />
            Saved
          </div>
          <div className="listitems">
            <img src="./rocket.svg" alt="" className="listitems-img" />
            Upgrade to pro
          </div>
        </div>
      </div>
      <div className="main">
        <div className="chats">
          {messages.map((msg, index) => (
            <div key={index} className={`chat ${msg.type}`}>
              <img className="chatimg" src={msg.type === "user" ? "./user-icon.png" : "./chatgptLogo.svg"} alt="" />
              <p className="txt" dangerouslySetInnerHTML={{ __html: msg.text }}></p>
            </div>
          ))}
          {loading && (
            <div className="loader">
              <hr />
              <hr />
              <hr />
            </div>
          )}
            <div ref={chatEndRef} />
        </div>
        <div className="chatfooter">
          <div className="inp">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              onKeyDown={handleKeyDown}
              type="text"
              placeholder="Input your message"
            />
            <button className="send" onClick={handleSend}>
              <img src="./send.svg" alt="" />
            </button>
          </div>
          <p>
            ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT September 3rd version.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;