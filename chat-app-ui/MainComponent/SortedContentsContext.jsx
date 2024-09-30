import { createContext, useState } from 'react';

// Tạo Context
export const SortedContentsContext = createContext();

// Tạo Provider cho Context
// eslint-disable-next-line react/prop-types
export const SortedContentsProvider = ({ children }) => {
  const [indexfind, setIndex] = useState([]);

  return (
    <SortedContentsContext.Provider value={{ indexfind, setIndex }}>
      {children}
    </SortedContentsContext.Provider>
  );
};


