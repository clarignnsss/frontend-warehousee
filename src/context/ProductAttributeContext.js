import { createContext, useState, useEffect } from "react";

export const ProductAttributeContext = createContext({});

export function ProductAttributeContextProvider({ children }) {
  const [productattr, setProductattr] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/productattr")
      .then((res) => {
        return res.json();
      })
      .then((result) => setProductattr(result));
  }, []);

  return (
    <ProductAttributeContext.Provider value={{ productattr, setProductattr }}>
      {children}
    </ProductAttributeContext.Provider>
  );
}