import { Children, createContext, useState, useEffect } from "react";

export const CurrencyContext = createContext({});

export function CurrencyContextProvider({ children }) {
  const [currency, setCurrency] = useState("");
  useEffect(() => {
    fetch("http://localhost:4000/api/currency")
      .then((res) => {
        return res.json();
      })
      .then((result) => setCurrency(result));
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
