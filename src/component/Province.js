import React, { useState, useContext } from "react";
import { Alert } from "flowbite-react";
import { ProvinceContext } from "../context/ProvinceContext.js";

const Province = () => {
  const [provinceValue, setProvinceValue] = useState("");
  const { province, setProvince } = useContext(ProvinceContext);
  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const newProvince = {
      provinceName: provinceValue,
    };
    const response = fetch("http://localhost:4000/api/province", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newProvince,
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
        console.log(result);
        setAlert(true);
        if (result.protocol41) {
          setAlertColor("success");
          setAlertMsg("Province data successfully submitted !");
          setProvince([...province, newProvince]);
        } else {
          setAlertColor("failure");
          setAlertMsg(result);
        }

        setProvinceValue("");
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="px-4 md:h-[650px] md:overflow-y-scroll">
        <div className="py-4 text-center text-[#2C4856] font-extrabold text-2xl">
          Province
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
                for="province"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Province Name
              </label>
              <input
                type="text"
                id="province"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                placeholder="Ex: DKI Jakarta"
                required
                value={provinceValue}
                onChange={(e) => setProvinceValue(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="text-white  bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Province;
