import { createContext, useState, useEffect } from "react";

export const CityContext = createContext({});

export function CityContextProvider({ children }) {
  const [city, setCity] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/city")
      .then((res) => {
        return res.json();
      })
      .then((result) => setCity(result));
  }, []);

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
}
