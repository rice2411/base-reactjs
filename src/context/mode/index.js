import { createContext, useState } from "react";

const ModeContext = createContext({});
export const ModeProvider = ({ children }) => {
  //true is light mode, false is dark mode
  const [mode, setMode] = useState(
    localStorage.getItem("mode") !== null
      ? JSON.parse(localStorage.getItem("mode"))
      : true
  );
  const toggleMode = () => {
    setMode(!mode);

    localStorage.setItem("mode", !mode);
  };
  return (
    <ModeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeContext;
