import React, { useState, useContext, useEffect } from "react";
import { Alert } from "flowbite-react";
import { RiDashboardFill } from "react-icons/ri";
import { VendorContext } from "../context/VendorContext";
import { POContext } from "../context/PoContext";
import Select from "react-select";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import POStockPopup from "./POStockPopup";
const PO = () => {
  const { po, setPO } = useContext(POContext);
  const { vendor, setVendor } = useContext(VendorContext);
  const [qty, setQty] = useState(0);
  const [idvendor, setIdVendor] = useState("");
  const [vendor_name, setVendorName] = useState("");
  const [status, setStatus] = useState("Waiting");
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  const options_vendor = vendor
    ? vendor.map((c) => ({
        value: c.idvendor,
        label: c.vendor_name,
      }))
    : "";
  useEffect(() => {
    setTotal(price * qty);
  }, [qty, price]);

  const history = useNavigate();

  const goBack = () => {
    history(-1);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const response = fetch("http://localhost:4000/api/po", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idvendor,
        idstock: selected.idstock,
        status,
        quantity: qty,
        price,
        total,
        created_by: username,
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
        const id = result["insertId"];
        fetch(`http://localhost:4000/api/po/${id}`)
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            setPO([...po, ...result]);
          });

        setAlert(true);
        if (result.protocol41) {
          setAlertColor("success");
          setAlertMsg("Purchase Order data successfully submitted !");
        } else {
          setAlertColor("failure");
          setAlertMsg(result);
        }

        setPrice(0);
        setQty(0);
        setTotal(0);
        setSelected("");
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="px-4 md:h-[650px] md:overflow-y-scroll">
        <span className="py-3 block cursor-pointer " onClick={goBack}>
          <BiArrowBack
            className="w-12 h-12 bg-[#ffff] hover:bg-[#d7d6d6] rounded-full p-3
        "
          />
        </span>
        <div className="py-4 text-center text-[#2C4856] font-extrabold text-2xl">
          Purchase Order
        </div>
        {openPopup ? (
          <POStockPopup
            selected={selected}
            setSelected={setSelected}
            handleOpenPopup={setOpenPopup}
            openPopup={openPopup}
          />
        ) : (
          ""
        )}
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

        <form onSubmit={handleSubmit} className="mb-10">
          <div
            className="flex items-center space-x-3 mb-5 p-2 bg-white w-44 rounded-md cursor-pointer"
            onClick={() => setOpenPopup(!openPopup)}
          >
            <p className="">Select Stock</p>
            <RiDashboardFill className="w-8 h-8 " />
          </div>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            {selected && (
              <>
                <div>
                  <label
                    for="product"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product
                  </label>
                  <span className="flex items-center space-x-2">
                    <input
                      type="text"
                      id="product"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      disabled
                      value={selected.product}
                    />
                  </span>
                </div>
                <div>
                  <label
                    for="code"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Code
                  </label>
                  <span className="flex items-center space-x-2">
                    <input
                      type="text"
                      id="code"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      disabled
                      value={selected.code}
                    />
                  </span>
                </div>
                <div>
                  <label
                    for="uom"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    UOM
                  </label>

                  <input
                    type="text"
                    id="uom"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    disabled
                    value={selected.uom}
                    onChange={selected.uom}
                  />
                </div>
                <div>
                  <label
                    for="qty"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Quantity Stock
                  </label>

                  <input
                    type="text"
                    id="qty"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    placeholder="input quantity"
                    value={selected.qty}
                    disabled
                  />
                </div>
                <div>
                  <label
                    for="vendor"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Vendor
                  </label>
                  <Select
                    id="vendor"
                    options={options_vendor}
                    classNamePrefix="select2-selection"
                    onChange={(e) => {
                      setIdVendor(e.value);
                      setVendorName(e.label);
                    }}
                    required
                    className="focus:ring-black focus:border-black"
                  ></Select>
                </div>
                <div>
                  <label
                    for="vendor"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Qty
                  </label>
                  <input
                    type="number"
                    id="qty"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    placeholder="input quantity"
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    for="vendor"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    id="qty"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    placeholder="input quantity"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <label
                    for="vendor"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Total
                  </label>
                  <input
                    type="number"
                    id="qty"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    placeholder="input quantity"
                    value={total}
                    disabled
                  />
                </div>
              </>
            )}
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

export default PO;