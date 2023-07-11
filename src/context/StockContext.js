import { createContext, useState, useEffect } from "react";

export const StockContext = createContext({});

export function StockContextProvider({ children }) {
  const [stock, setStock] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/stock")
      .then((res) => {
        return res.json();
      })
      .then((result) => setStock(result));
  }, []);

  return (
    <StockContext.Provider value={{ stock, setStock }}>
      {children}
    </StockContext.Provider>
  );
}