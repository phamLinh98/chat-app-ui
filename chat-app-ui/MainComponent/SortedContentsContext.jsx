/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const SortedContentsContext = createContext();

export const SortedContentsProvider = ({ children }) => {
  const [contextUserLoginAndUserClicked, setContextUserLoginAndUserClicked] =
    useState(null);
  const [indexfind, setIndex] = useState(null);

  return (
    <SortedContentsContext.Provider
      value={{
        contextUserLoginAndUserClicked,
        setContextUserLoginAndUserClicked,
        indexfind,
        setIndex,
      }}
    >
      {children}
    </SortedContentsContext.Provider>
  );
};
