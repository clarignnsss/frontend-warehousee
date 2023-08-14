import React, { useEffect, useState, useContext } from "react";
import { TitleContext } from "../context/TitleContext";
import { WarehouseContext } from "../context/WarehouseContext";
import { Alert } from "flowbite-react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Warehouse = () => {
  const { title, setTitle } = useContext(TitleContext);
  const { warehouse, setWarehouse } = useContext(WarehouseContext);
  const [warehouse_name, setWarehouseName] = useState();
  const [address, setAddress] = useState();
  const [contact_person, setCP] = useState();
  const [contact_number, setCN] = useState();
  const [status, setStatus] = useState();
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState(false);
  const [alertMsg, setAlertMsg] = useState(false);

  const history = useNavigate();

  const goBack = () => {
    history(-1);
  };

  useEffect(() => {
    setTitle("Warehouse");
  }, []);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newWarehouse = {
      warehouse_name,
      address,
      contact_person,
      contact_number,
      status,
      created_by: username,
    };
    const response = fetch("http://localhost:4000/api/warehouse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newWarehouse,
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
        fetch(`http://localhost:4000/api/warehouse/${id}`)
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            console.log(result);
            setWarehouse([...warehouse, ...result]);
          });
        setAlert(true);
        if (result.protocol41) {
          setAlertColor("success");
          setAlertMsg("Warehouse data successfully submitted !");
        } else {
          setAlertColor("failure");
          setAlertMsg(result);
        }

        setWarehouseName("");
        setAddress("");
        setCN("");
        setCP("");
        setStatus("");
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="px-4 md:h-[650px] md:overflow-y-scroll">
      <span className="py-3 block cursor-pointer " onClick={goBack}>
        <BiArrowBack
          className="w-12 h-12 bg-[#ffff] hover:bg-[#d7d6d6] rounded-full p-3
        "
        />
      </span>

      <div className="py-4 text-center text-[#2C4856] font-extrabold text-2xl">
        Warehouse
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
              Warehouse Name
            </label>
            <input
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: Warehouse - 1"
              required
              value={warehouse_name}
              onChange={(e) => {
                setWarehouseName(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="address"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: Jl Indofood"
              required
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="cp"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contact Person
            </label>
            <input
              type="text"
              id="cp"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: Ahmad Yani"
              required
              value={contact_person}
              onChange={(e) => {
                setCP(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="cn"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="cn"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: 08176764747"
              required
              value={contact_number}
              onChange={(e) => {
                setCN(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="status"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Status
            </label>
            <input
              type="text"
              id="status"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: available"
              required
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="text-white block mr-auto   bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-gray-800 "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Warehouse;