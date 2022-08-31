import { createContext, useState } from "react";

const ModeContext = createContext({});
export const ModeProvider = ({ children }) => {
  //true is light mode, false is dark mode
  const [mode, setMode] = useState(
    localStorage.getItem("mode") !== null
      ? JSON.parse(localStorage.getItem("mode"))
      : true
  );
  const initMode = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleMode = () => {
    if (localStorage.theme === "dark") {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
      setMode("light");
    } else {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      setMode("dark");
    }
  };

  return (
    <ModeContext.Provider value={{ mode, toggleMode, initMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeContext;
