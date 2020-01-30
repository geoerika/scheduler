import { useState } from "react";

export default function useVisualMode(initialMode) {

  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  function transition(newMode) {
    setHistory([...history, newMode]);
    setMode(newMode);
  }

  function back() {
    history.pop();
    setMode(history[history.length - 1]);
  }

  return { mode, transition, back };
}