import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setMode(newMode);
      setHistory(history=>[...history,newMode]);
    } else {
      setMode(newMode);
    }
  };

  const back = () => {
    if (history.length > 1) {
      setHistory(history=>history.slice(0,history.length - 1));
      setMode(history[history.length - 1]);
    
    }
    else {
      setHistory(initial)
      setMode(initial)
    }
  };

  return { mode, transition, back };
};
export default useVisualMode;