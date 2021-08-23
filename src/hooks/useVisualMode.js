import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setMode(newMode);
      setHistory(prev=>[...prev, newMode]);
    } else {
      setMode(newMode);
      setHistory(prev=>[ ...prev.slice(0, prev.length -1), newMode])
    }
   
  };

  const back = () => {
    if (history.length < 2) return;

    setMode(history[history.length - 2]);
    setHistory(history=>history.slice(0,history.length - 1));
 
  };

  return { mode, transition, back };
};
export default useVisualMode;