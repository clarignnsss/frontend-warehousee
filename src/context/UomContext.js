import { createContext, useState, useEffect } from "react";

export const UomContext = createContext({});

export function UomContextProvider({ children }) {
  const [uom, setUom] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/uom")
      .then((res) => {
        return res.json();
      })
      .then((result) => setUom(result));
  }, []);

  return (
    <UomContext.Provider value={{ uom, setUom }}>
      {children}
    </UomContext.Provider>
  );
}