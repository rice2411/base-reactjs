import React from "react";

import { createContext } from "react";
import { loaderRoot } from "../..";

import { OverlayLoading } from "../../shared/Animations/Loading";

const LoadingContext = createContext({});

export const LoadingProvider = ({ children }) => {
  const handleShowLoader = () => {
    loaderRoot.render(<OverlayLoading />);
    return;
  };
  const handleHiddenLoader = () => {
    loaderRoot.render("");
    return;
  };
  return (
    <LoadingContext.Provider value={{ handleShowLoader, handleHiddenLoader }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
