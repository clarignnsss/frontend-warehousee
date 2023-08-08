import { createContext, useState, useEffect } from "react";

export const TransferContext = createContext({});

export function TransferContextProvider({ children }) {
  const [transfer, setTransfer] = useState("");

  useEffect(() => {
    try {
      fetch("http://localhost:4000/api/transfer")
        .then((res) => {
          return res.json();
        })
        .then((result) => setTransfer(result));
    } catch (error) {}
  }, []);

  return (
    <TransferContext.Provider value={{ transfer, setTransfer }}>
      {children}
    </TransferContext.Provider>
  );
}