import { createContext, useState, useEffect } from "react";

export const CountryContext = createContext({});

export function CountryContextProvider({ children }) {
  const [country, setCountry] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/country")
      .then((res) => {
        return res.json();
      })
      .then((result) => setCountry(result));
  }, []);

  return (
    <CountryContext.Provider value={{ country, setCountry }}>
      {children}
    </CountryContext.Provider>
  );
}
