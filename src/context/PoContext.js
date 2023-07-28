import { createContext, useState, useEffect } from "react";

export const POContext = createContext({});

export function POContextProvider({ children }) {
  const [po, setPO] = useState("");

  useEffect(() => {

    try {

      fetch("http://localhost:4000/api/po")

        .then((res) => {

          return res.json();

        })

        .then((result) => setPO(result));

    } catch (error) {}

  }, []);

  return (
    <POContext.Provider value={{ po, setPO }}>{children}</POContext.Provider>
  );
}