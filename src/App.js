import React, { useContext, useState } from "react";
import "./App.css";
import { Context } from "./context/context";

const App = () => {

  const {onSent,prevPromts,recentPrompt,setRecentPrompt,showResult,loading,resultData,setInput,input}= useContext(Context)



    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent any default action (like form submission)
            if (input.trim()) { // Check if input is not just whitespace
                onSent(input); // Call the onSent function with the input value
                setInput(""); // Clear the input field after sending
            }
        }
    };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="upperside">
          <div className="upperside-top">
            <img src="./chatgpt.svg" alt="Logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>
          <button className="midbtn">
            <img src="./add-30.png" alt="" className="addbtn" />
            New Chat
          </button>
          <div className="upperside-bottom">
            {
              prevPromts.map((item,index)=>{
                return(
            <button className="query">
              <img src="./message.svg" alt="Query" /> {item} ...
            </button>
                )
              })
            }
            <button className="query">
              <img src="./message.svg" alt="Query" /> How to use an API
            </button>
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
          <div className="chat man">
            <img className="chatimg" src="./user-icon.png" alt="" />
            <p className="txt">
              {recentPrompt}
            </p>
          </div>
          <div className="chat bot">
            <img className="chatimg" src="./chatgptLogo.svg" alt="" />
            {loading?<div className="loader">
              <hr />
              <hr />
              <hr />
            </div>:<p dangerouslySetInnerHTML={{__html:resultData}} className="txt result-data"></p>}
          </div>
        </div>
        <div className="chatfooter">
          <div className="inp">
            <input 
            onChange={(e)=>setInput(e.target.value)}
            value={input}
            onKeyDown={handleKeyDown} // Listen for keydown events
            type="text" placeholder="Input your message" />
            <button className="send">
              <img
              onClick={()=>onSent()} src="./send.svg" alt="" />
            </button>
          </div>
          <p>
            ChatGPT may produce inaccurate information about people, places, or
            facts. ChatGPT September 3rd version.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
