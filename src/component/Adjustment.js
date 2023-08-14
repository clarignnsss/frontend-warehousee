import React, { useState, useContext, useEffect } from "react";
import { Alert } from "flowbite-react";
import { AdjustmentContext } from "../context/AdjustmentContext";
import { RiDashboardFill } from "react-icons/ri";
import { StockContext } from "../context/StockContext";
import { UserContext } from "../context/UserContext";

import AdjustmentStockPopup from "./AdjustmentStockPopup";
const Adjustment = () => {
  const { adjustment, setAdjustment } = useContext(AdjustmentContext);
  const { stock, setStock } = useContext(StockContext);
  const [qtyAdj, setQtyAdj] = useState(0);
  const [qtyAdjSum, setQtyAdjSum] = useState(0);
  const [selected, setSelected] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const response = fetch("http://localhost:4000/api/adjustment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idstock: selected.idstock,
        adjustment_qty: parseInt(-qtyAdjSum),
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
        fetch(`http://localhost:4000/api/adjustment/${id}`)
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            setAdjustment([...adjustment, ...result]);

            const newStock = stock.map((s) => {
              if (s.idstock == result[0].idstock) {
                return {
                  idstock: s.idstock,
                  idwarehouse: s.idwarehouse,
                  warehouse_name: s.warehouse_name,
                  idproductUnitConversion: s.idproductUnitConversion,
                  iduom: s.iduom,
                  uom: s.uom,
                  idproduct: s.idproduct,
                  code: s.code,
                  product: s.product,
                  qty: qtyAdj,
                  created_by: s.created_by,
                  created_at: s.created_at,
                  modified_at: s.modified_at,
                  modified_by: s.modified_by,
                  document_number: s.document_number,
                };
              }
              return s;
            });
            setStock(newStock);
          });

        setAlert(true);
        if (result.protocol41) {
          setAlertColor("success");
          setAlertMsg("Adjustment data successfully submitted !");
        } else {
          setAlertColor("failure");
          setAlertMsg(result);
        }

        setQtyAdj("");
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
        <div className="py-4 text-center text-[#2C4856] font-extrabold text-2xl">
          Adjustment
        </div>
        {openPopup ? (
          <AdjustmentStockPopup
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
                    for="qtyAdj"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Quantity
                  </label>

                  <input
                    type="text"
                    id="qtyAdj"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    placeholder="input quantity"
                    value={qtyAdj}
                    onChange={(e) => {
                      setQtyAdj(e.target.value);
                      setQtyAdjSum(parseInt(selected.qty) - e.target.value);
                    }}
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

export default Adjustment;