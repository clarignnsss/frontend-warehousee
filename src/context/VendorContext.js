import { createContext, useState, useEffect } from "react";

export const VendorContext = createContext({});

export function VendorContextProvider({ children }) {
  const [vendor, setVendor] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/vendor")
      .then((res) => {
        return res.json();
      })
      .then((result) => setVendor(result));
  }, []);

  return (
    <VendorContext.Provider value={{ vendor, setVendor }}>
      {children}
    </VendorContext.Provider>
  );
}