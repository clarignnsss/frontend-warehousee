import { createContext, useState, useEffect } from "react";

export const WarehouseContext = createContext({});

export function WarehouseContextProvider({ children }) {
  const [warehouse, setWarehouse] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/warehouse")
      .then((res) => {
        return res.json();
      })
      .then((result) => setWarehouse(result));
  }, []);

  return (
    <WarehouseContext.Provider value={{ warehouse, setWarehouse }}>
      {children}
    </WarehouseContext.Provider>
  );
}