import { createContext, useState, useEffect } from "react";

export const AttrValueContext = createContext({});

export function AttrValueContextProvider({ children }) {
  const [attrvalue, setAttrvalue] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/attributevalue")
      .then((res) => {
        return res.json();
      })
      .then((result) => setAttrvalue(result));
  }, []);

  return (
    <AttrValueContext.Provider value={{ attrvalue, setAttrvalue }}>
      {children}
    </AttrValueContext.Provider>
  );
}