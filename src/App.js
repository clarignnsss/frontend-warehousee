import Login from "./pages/Login";
import Home from "./pages/Home";
import Company from "./component/Company";
import { UserContextProvider } from "./context/UserContext.js";
import { TitleContextProvider } from "./context/TitleContext";
import { CurrencyContextProvider } from "./context/currencyContext";
import { CountryContextProvider } from "./context/CountryContext";
import { ProvinceContextProvider } from "./context/ProvinceContext";
import { CityContextProvider } from "./context/CityContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Currency from "./component/Currency";
import Country from "./component/Country";
import Province from "./component/Province";
import City from "./component/City";
function App() {
  return (
    <div className="App ">
      <UserContextProvider>
        <TitleContextProvider>
          <CurrencyContextProvider>
            <CountryContextProvider>
              <ProvinceContextProvider>
                <CityContextProvider>
                  <BrowserRouter>
                    <Routes>
                      <Route path="/">
                        <Route index element={<Login />} />
                        <Route path="home" element={<Home />}>
                          <Route index element={<h1>Dashboard</h1>} />
                          <Route path="company" element={<Company />} />
                          <Route path="currency" element={<Currency />} />
                          <Route path="country" element={<Country />} />
                          <Route path="province" element={<Province />} />
                          <Route path="city" element={<City />} />
                        </Route>
                      </Route>
                    </Routes>
                  </BrowserRouter>
                </CityContextProvider>
              </ProvinceContextProvider>
            </CountryContextProvider>
          </CurrencyContextProvider>
        </TitleContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
