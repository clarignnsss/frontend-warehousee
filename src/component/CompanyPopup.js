import React, { useState, useEffect, useRef, useContext } from "react";
import { CompanyContext } from "../context/CompanyContext";
import { CountryContext } from "../context/CountryContext";
import { CityContext } from "../context/CityContext";
import { ProvinceContext } from "../context/ProvinceContext";
import { CurrencyContext } from "../context/currencyContext";
import { Button } from "primereact/button";
import Select from "react-select";
import { UserContext } from "../context/UserContext";

const CompanyPopup = ({
  data,
  setOpen,
  open,
  setAlert,
  setAlertMsg,
  setAlertColor,
}) => {
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  const { company, setCompany } = useContext(CompanyContext);
  const { country, setCountry } = useContext(CountryContext);
  const { city, setCity } = useContext(CityContext);
  const current_date = new Date();
  const year = current_date.getFullYear();
  const month = (current_date.getMonth() + 1).toString().padStart(2, "0");
  const day = current_date.getDate().toString().padStart(2, "0");
  const hours = current_date.getHours().toString().padStart(2, "0");
  const minutes = current_date.getMinutes().toString().padStart(2, "0");
  const seconds = current_date.getSeconds().toString().padStart(2, "0");

  const sqlDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const { province, setProvince } = useContext(ProvinceContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const [company_name, setCompanyName] = useState(data.company_name);
  const [company_address, setCompanyAddress] = useState(data.company_address);
  const [phone_no, setPhoneNo] = useState(data.phone_no);
  const [idcountry, setIdCountry] = useState(data.idcountry);
  const [countryName, setCountryName] = useState(data.countryName);
  const [idcity, setIdCity] = useState(data.idcity);
  const [cityName, setCityName] = useState(data.cityName);
  const [idprovince, setIdProvince] = useState(data.idprovince);
  const [provinceName, setProvinceName] = useState(data.provinceName);
  const [currency_code, setCurrencyCode] = useState(data.currency_code);
  const [created_by, setCreatedBy] = useState(data.created_by);
  const popup = useRef();

  const options_country = country
    ? country.map((c) => ({
        value: c.idcountry,
        label: c.countryName,
      }))
    : "";

  const options_city = city
    ? city.map((c) => ({
        value: c.idcity,
        label: c.cityName,
      }))
    : "";
  const options_province = province
    ? province.map((c) => ({
        value: c.idprovince,
        label: c.provinceName,
      }))
    : "";
  const options_currency = currency
    ? currency.map((c) => ({
        value: c.currency_code,
        label: c.currency_name,
      }))
    : "";

  useEffect(() => {
    console.log(current_date.toISOString());
  }, []);

  const handleDelete = () => {
    const response = fetch(
      `http://localhost:4000/api/company/${data.idcompany}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        if (res.protocol41) {
          setAlertColor("success");
          setAlertMsg("Company data successfully deleted !");
          setAlert(true);
          const newCompany = company.filter(
            (item) => item.idstock !== data.idstock
          );
          setCompany(newCompany);
          setOpen(!open);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        } else {
          setAlert(true);
          setAlertColor("failure");
          setAlertMsg(res);
          setOpen(!open);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        }
      });
  };
  const handleUpdate = async () => {
    const newCompany = {
      company_name,
      company_address,
      phone_no,
      idcountry,
      idcity,
      idprovince,
      currency_code,
      modified_by: username,
    };
    console.log(newCompany);
    const response = await fetch(
      `http://localhost:4000/api/company/${data.idcompany}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newCompany,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((result) => {
        if (result.protocol41) {
          console.log(result);
          setAlertColor("success");
          setAlertMsg("Company data successfully updated !");
          setAlert(true);
          const newCompany = company.map((u) => {
            if (u.idcompany === data.idcompany) {
              return {
                idcompany: data.idcompany,
                document_number: data.document_number,
                company_name,
                company_address,
                phone_no,
                currency_code,
                countryName,
                provinceName,
                cityName,
                created_at: data.created_at,
                created_by: data.created_by,
                modified_at: sqlDatetime,
                modified_by: username,
              };
            }
            return u;
          });
          setCompany(newCompany);
          setOpen(!open);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        } else {
          setAlertColor("failure");
          setAlertMsg(result);
        }
      });
  };
  useEffect(() => {
    const handleClick = (e) => {
      if (popup.current) {
        setOpen(!open);
      }
    };

    document.addEventListener("click", (e) => {
      handleClick(e);
    });

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open]);

  const handleChildClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-20 flex items-center justify-center bg-gray-800 bg-opacity-75"
      ref={popup}
    >
      <div
        className="bg-white p-8   rounded-lg"
        onClick={(e) => handleChildClick(e)}
      >
        <h1 className="text-center text-lg font-bold mb-9">Company Detail</h1>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Company Number
            </label>
            <input
              type="text"
              id="name"
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={data.document_number}
              disabled
            />
          </div>
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
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={company_name}
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
            <input
              type="text"
              id="address"
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={company_address}
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
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={phone_no}
              onChange={(e) => {
                setPhoneNo(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="country"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Country
            </label>
            <Select
              id="country"
              options={options_country}
              classNamePrefix="select2-selection"
              onChange={(e) => {
                setCountryName(e.label);
                setIdCountry(e.value);
              }}
              required
              defaultValue={options_country.find(
                (option) => option.label == data.countryName
              )}
              className="focus:ring-black focus:border-black"
            ></Select>
          </div>
          <div>
            <label
              for="country"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <Select
              id="city"
              options={options_city}
              classNamePrefix="select2-selection"
              onChange={(e) => {
                setCityName(e.label);
                setIdCity(e.value);
              }}
              required
              defaultValue={options_city.find(
                (option) => option.label == data.cityName
              )}
              className="focus:ring-black focus:border-black"
            ></Select>
          </div>
          <div>
            <label
              for="province"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Province
            </label>
            <Select
              id="province"
              options={options_province}
              classNamePrefix="select2-selection"
              onChange={(e) => {
                setProvinceName(e.label);
                setIdProvince(e.value);
              }}
              required
              defaultValue={options_province.find(
                (option) => option.label == data.provinceName
              )}
              className="focus:ring-black focus:border-black"
            ></Select>
          </div>
          <div>
            <label
              for="province"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Currency
            </label>
            <Select
              id="province"
              options={options_currency}
              classNamePrefix="select2-selection"
              onChange={(e) => {
                setCurrencyCode(e.value);
              }}
              required
              defaultValue={options_currency.find(
                (option) => option.value == data.currency_code
              )}
              className="focus:ring-black focus:border-black"
            ></Select>
          </div>

          <div className="flex flex-start gap-4 mt-3">
            <Button
              label="Delete"
              severity="danger"
              size="small"
              onClick={handleDelete}
            />
            <Button
              label="Update"
              severity="success"
              size="small"
              disabled={
                (!company_name ||
                  !company_address ||
                  !phone_no ||
                  !countryName ||
                  !cityName ||
                  !provinceName ||
                  !currency_code) &&
                true
              }
              onClick={handleUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyPopup;