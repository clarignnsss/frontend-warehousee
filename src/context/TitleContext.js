import { Children, createContext, useState } from "react";

export const TitleContext = createContext({});

export function TitleContextProvider({ children }) {
  const [title, setTitle] = useState("");

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
}
