import { createContext, useState } from "react";
import run from "../OpenAi";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState('');
    const [recentPrompt, setRecentPrompt] = useState('');
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState('');

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    // Function to reset chat state
    const newChat = () => {
        setInput('');
        setRecentPrompt('');
        setPrevPrompt([]); // Clear previous prompts
        setResultData(''); // Clear result data
        setShowResult(false); // Hide result display
        setLoading(false); // Reset loading state
    };

    const onSent = async (prompt) => {
      setResultData('');
      setLoading(true);
      setShowResult(true);
      
      const finalPrompt = prompt !== undefined ? prompt : input;
  
      if (finalPrompt) {
          setPrevPrompt(prev => [...prev, finalPrompt]);
          setRecentPrompt(finalPrompt);
      }
  
      try {
          const response = await run(finalPrompt);
          let responseArray = response.split("**");
          let newResponse = '';
  
          for (let i = 0; i < responseArray.length; i++) {
              newResponse += (i === 0 || i % 2 !== 1) ? responseArray[i] : "<b>" + responseArray[i] + "</b>";
          }
  
          let newResponse2 = newResponse.split("*").join("</br>");
          let newResponseArray = newResponse2.split(" ");
  
          // Delay the display of each word
          for (let i = 0; i < newResponseArray.length; i++) {
              const nextWord = newResponseArray[i];
              delayPara(i, nextWord + " ");
          }
  
          // Return the final processed response
          return newResponse2; // Ensure you're returning the formatted response
      } catch (error) {
          console.error("Error fetching response:", error);
          setResultData("Error fetching response. Please try again.");
          return "Error fetching response. Please try again."; // Return error message
      } finally {
          setLoading(false);
          setInput("");
      }
  };

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;