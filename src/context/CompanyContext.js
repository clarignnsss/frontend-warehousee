import { createContext, useState, useEffect } from "react";

export const CompanyContext = createContext({});

export function CompanyContextProvider({ children }) {
  const [company, setCompany] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/company")
      .then((res) => {
        return res.json();
      })
      .then((result) => setCompany(result));
  }, []);

  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}