import { useContext } from "react";
import ModeContext from "../context/mode";

const useMode = () => {
  return useContext(ModeContext);
};

export default useMode;
