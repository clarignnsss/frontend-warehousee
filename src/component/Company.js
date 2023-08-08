import React, { useContext, useState, useEffect } from "react";
import { TitleContext } from "../context/TitleContext";
import { CurrencyContext } from "../context/currencyContext";
import { CountryContext } from "../context/CountryContext";
import { ProvinceContext } from "../context/ProvinceContext";
import { CompanyContext } from "../context/CompanyContext";
import { UserContext } from "../context/UserContext";
import { CityContext } from "../context/CityContext";
import { Alert } from "flowbite-react";

import Select from "react-select";

const Company = () => {
  const { currency } = useContext(CurrencyContext);
  const { company, setCompany } = useContext(CompanyContext);
  const { setTitle } = useContext(TitleContext);
  const { country } = useContext(CountryContext);
  const { province } = useContext(ProvinceContext);
  const { city } = useContext(CityContext);
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  const [resetSelect, setResetSelect] = useState();
  const [currencyCode, setCurrencyCode] = useState();
  const [currencyName, setCurrencyName] = useState();
  const [companyName, setCompanyName] = useState();
  const [companyAddress, setCompanyAddress] = useState();
  const [countryValue, setCountryValue] = useState();
  const [provinceValue, setProvinceValue] = useState();
  const [cityValue, setCityValue] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const options = currency
    ? currency.map((c) => ({
        value: c.currency_name,
        label: c.currency_code,
      }))
    : "";
  const countryOptions = country
    ? country.map((c) => ({
        value: c.idcountry,
        label: c.countryName,
      }))
    : "";
  const provinceOptions = province
    ? province.map((p) => ({
        value: p.idprovince,
        label: p.provinceName,
      }))
    : "";
  const cityOptions = city
    ? city.map((p) => ({
        value: p.idcity,
        label: p.cityName,
      }))
    : "";
  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
    }),
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newCompany = {
      company_name: companyName,
      company_address: companyAddress,
      phone_no: phoneNo,
      currency_code: currencyCode,
      idcountry: countryValue,
      idprovince: provinceValue,
      idcity: cityValue,
      created_by: username,
    };
    const response = fetch("http://localhost:4000/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newCompany,
      }),
    });
    response
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        const id = result["insertId"];
        fetch(`http://localhost:4000/api/company?idcompany=${id}`)
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            console.log(result);
            setCompany([...company, ...result]);
          });
        setAlert(true);
        if (result.protocol41) {
          setAlertColor("success");
          setAlertMsg("Company data successfully submitted !");
        } else {
          setAlertColor("failure");
          setAlertMsg(result);
        }
        // setCountry("");
        setPhoneNo("");
        setCompanyName("");
        setCompanyAddress("");
        setCurrencyCode("");
        setCurrencyName("");
        setResetSelect("");
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      })
      .catch((err) => console.log(err));
    console.log(newCompany);
  };
  useEffect(() => {
    setTitle("Master Data");
  }, []);
  return (
    <div className="px-4 md:h-[650px] md:overflow-y-scroll">
      <div className="py-4 text-center text-[#2C4856] font-extrabold text-2xl">
        Company
      </div>
      {alert ? (
        <Alert color={`${alertColor}`} className="mb-3">
          <span>
            <p className="flex items-center">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3"
              >
                <path
                  d="M9.60208 13.8973L12.6447 17.0268C12.7851 17.1712 13.2064 17.2675 13.4404 17.0268C13.7026 16.7572 18.7299 11.5542 21.2108 8.98636C21.769 8.40861 22.9285 8.21602 23.6448 8.98636C24.347 9.74138 24.2066 10.7678 23.7385 11.2974L14.6107 20.6859C14.0021 21.3118 12.8319 22.1303 11.5681 20.8304C10.3642 19.5921 8.32412 17.4681 7.16801 16.2621C6.74722 15.8231 6.08326 14.7158 6.93397 13.801C7.38171 13.3195 8.33824 12.5973 9.60208 13.8973Z"
                  fill="white"
                />
                <rect
                  x="1.5"
                  y="1.5"
                  width="27"
                  height="27"
                  rx="4.5"
                  stroke="white"
                  stroke-width="3"
                />
              </svg>
              {alertMsg} !
            </p>
          </span>
        </Alert>
      ) : (
        ""
      )}

      <form onSubmit={handleSubmit}>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Company Name
            </label>
            <input
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: Indofood"
              required
              value={companyName}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="address"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Company Address
            </label>
            <textarea
              type="text"
              id="address"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: Jl Petojo Melintang No 6"
              required
              value={companyAddress}
              onChange={(e) => {
                setCompanyAddress(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="phone"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone No
            </label>
            <input
              type="text"
              id="phone"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: 02184997151"
              required
              value={phoneNo}
              onChange={(e) => {
                setPhoneNo(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="currency-code"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Currency Code
            </label>
            <Select
              options={options}
              styles={style}
              value={resetSelect}
              classNamePrefix="select2-selection"
              onChange={(e) => {
                setCurrencyCode(e.label);
                setCurrencyName(e.value);
              }}
              className="focus:ring-black focus:border-black"
            ></Select>
          </div>
          <div>
            <label
              for="country"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Country
            </label>
            <Select
              options={countryOptions}
              styles={style}
              // value={resetSelect}
              classNamePrefix="select2-selection"
              onChange={(e) => {
                setCountryValue(e.value);
              }}
              className="focus:ring-black focus:border-black"
            ></Select>
          </div>
          <div>
            <label
              for="currency-name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Currency Name
            </label>
            <input
              type="text"
              id="currency-name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              disabled
              value={currencyName}
            />
          </div>
          <div>
            <label
              for="province"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Province
            </label>
            <Select
              options={provinceOptions}
              styles={style}
              // value={resetSelect}
              classNamePrefix="select2-selection"
              onChange={(e) => {
                setProvinceValue(e.value);
              }}
              className="focus:ring-black focus:border-black"
            ></Select>
          </div>
          <div>
            <label
              for="city"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <Select
              options={cityOptions}
              styles={style}
              // value={resetSelect}
              classNamePrefix="select2-selection"
              onChange={(e) => {
                setCityValue(e.value);
              }}
              className="focus:ring-black focus:border-black"
            ></Select>
          </div>
        </div>

        <button
          type="submit"
          className="text-white block ml-auto   bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Company;
