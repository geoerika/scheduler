import { useState } from "react";

// seeting mode for appointment component
export default function useVisualMode(initialMode) {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  //transitions to the next mode
  function transition(newMode, replace = false) {
    console.log('history in transition: ', history);
    console.log('mode in transition: ', mode);
    // we skip adding the new mode to history if we want to go back two modes
    if (!replace) {
      setHistory(prev => [...prev, newMode]);
    }
    setMode(newMode);
  }

  // appointment comp goes back to the previous mode
  function back() {
    console.log('history in back: ', history);
    console.log('mode in back: ', mode);

    if (history.length > 1) {
      history.pop();
      setHistory(history);
    }
    setMode(history[history.length - 1]);
  }

  return { mode, transition, back };
}