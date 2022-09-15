import { useContext } from "react";
import LoadingContext from "../context/loading";

const useLoading = () => {
  return useContext(LoadingContext);
};

export default useLoading;
