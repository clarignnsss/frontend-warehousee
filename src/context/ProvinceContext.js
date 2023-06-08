import { createContext, useState, useEffect } from "react";

export const ProvinceContext = createContext({});

export function ProvinceContextProvider({ children }) {
  const [province, setProvince] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/province")
      .then((res) => {
        return res.json();
      })
      .then((result) => setProvince(result));
  }, []);

  return (
    <ProvinceContext.Provider value={{ province, setProvince }}>
      {children}
    </ProvinceContext.Provider>
  );
}
