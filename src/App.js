import Login from "./pages/Login";
import Home from "./pages/Home";
import Company from "./component/Company";
import { UserContextProvider } from "./context/UserContext.js";
import { TitleContextProvider } from "./context/TitleContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Currency from "./component/Currency";
import Country from "./component/Country";
import Province from "./component/Province";
import City from "./component/City";
import CompanyView from "./component/CompanyView";
import CurrencyView from "./component/CurrencyView";
import CountryView from "./component/CountryView";
import CityView from "./component/CityView";
import ProvinceView from "./component/ProvinceView";
import AttributeView from "./component/AttributeView";
import Attribute from "./component/Attribute";
//theme
// import "primereact/resources/themes/lara-light-blue/theme.css";
import "./theme/theme.css";
//core
import "primereact/resources/primereact.min.css";
import Uom from "./component/Uom";
import UomView from "./component/UomView";
import AttrValueView from "./component/AttrValueView";
import AttrValue from "./component/AttrValue";
import ProductView from "./component/ProductView";
import Product from "./component/Product";
import ProductAttributeView from "./component/ProductAttributeView";
import ProductAttribute from "./component/ProductAttribute";
import ProductUnitView from "./component/ProductUnitView";
import ProductUnit from "./component/ProductUnit";
import WarehouseView from "./component/WarehouseView";
import Warehouse from "./component/Warehouse";
import Stock from "./component/Stock";
import StockView from "./component/StockView";
import AdjustmentView from "./component/AdjustmentView";
import Adjustment from "./component/Adjustment";
import DashboardView from "./component/DashboardView";
import VendorView from "./component/VendorView";
import Vendor from "./component/Vendor";
import POView from "./component/POView";
import PO from "./component/PO";
import TransferView from "./component/TransferView";
import Transfer from "./component/Transfer";

function App() {
  return (
    <div className="App ">
      <UserContextProvider>
        <TitleContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<Login />} />
                <Route path="home" element={<Home />}>
                  <Route index element={<DashboardView />} />
                  <Route path="company" element={<CompanyView />} />
                  <Route path="currency" element={<CurrencyView />} />
                  <Route path="country" element={<CountryView />} />
                  <Route path="province" element={<ProvinceView />} />
                  <Route path="city" element={<CityView />} />
                  <Route path="addcompany" element={<Company />} />
                  <Route path="addcurrency" element={<Currency />} />
                  <Route path="addcountry" element={<Country />} />
                  <Route path="addcity" element={<City />} />
                  <Route path="addprovince" element={<Province />} />
                  <Route path="uomview" element={<UomView />} />
                  <Route path="adduom" element={<Uom />} />
                  <Route path="attributeview" element={<AttributeView />} />
                  <Route path="addattribute" element={<Attribute />} />
                  <Route path="attrvalueview" element={<AttrValueView />} />
                  <Route path="addattrvalue" element={<AttrValue />} />
                  <Route path="productview" element={<ProductView />} />
                  <Route path="addproduct" element={<Product />} />
                  <Route
                    path="productattrview"
                    element={<ProductAttributeView />}
                  />
                  <Route path="addproductattr" element={<ProductAttribute />} />
                  <Route path="productunitview" element={<ProductUnitView />} />
                  <Route path="addproductunit" element={<ProductUnit />} />
                  <Route path="warehouseview" element={<WarehouseView />} />
                  <Route path="addwarehouse" element={<Warehouse />} />
                  <Route path="addstock" element={<Stock />} />
                  <Route path="stockview" element={<StockView />} />
                  <Route path="adjview" element={<AdjustmentView />} />
                  <Route path="addadjustment" element={<Adjustment />} />
                  <Route path="vendorview" element={<VendorView />} />
                  <Route path="addvendor" element={<Vendor />} />
                  <Route path="poview" element={<POView />} />
                  <Route path="addpo" element={<PO />} />
                  <Route path="transferview" element={<TransferView />} />
                  <Route path="addtransfer" element={<Transfer />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </TitleContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;