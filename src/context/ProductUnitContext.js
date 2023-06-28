import { createContext, useState, useEffect } from "react";

export const ProductUnitContext = createContext({});

export function ProductUnitContextProvider({ children }) {
  const [productunit, setProductUnit] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/productunit")
      .then((res) => {
        return res.json();
      })
      .then((result) => setProductUnit(result));
  }, []);

  return (
    <ProductUnitContext.Provider value={{ productunit, setProductUnit }}>
      {children}
    </ProductUnitContext.Provider>
  );
}