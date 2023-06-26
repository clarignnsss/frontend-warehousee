import { createContext, useState, useEffect } from "react";

export const AttributeContext = createContext({});

export function AttributeContextProvider({ children }) {
  const [attribute, setAttribute] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/attribute")
      .then((res) => {
        return res.json();
      })
      .then((result) => setAttribute(result));
  }, []);

  return (
    <AttributeContext.Provider value={{ attribute, setAttribute }}>
      {children}
    </AttributeContext.Provider>
  );
}