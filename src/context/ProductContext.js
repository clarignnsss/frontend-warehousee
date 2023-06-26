import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext({});

export function ProductContextProvider({ children }) {
  const [product, setProduct] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/product")
      .then((res) => {
        return res.json();
      })
      .then((result) => setProduct(result));
  }, []);

  return (
    <ProductContext.Provider value={{ product, setProduct }}>
      {children}
    </ProductContext.Provider>
  );
}