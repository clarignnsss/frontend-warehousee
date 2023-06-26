import React, { useEffect, useState, useContext } from "react";
import { TitleContext } from "../context/TitleContext";
import { UomContext } from "../context/UomContext";
import { Alert } from "flowbite-react";
import Select from "react-select";
import { ProductContext } from "../context/ProductContext";

const Product = () => {
  const { setTitle } = useContext(TitleContext);
  const { product, setProduct } = useContext(ProductContext);
  const [code, setCode] = useState();
  const [Name, setName] = useState();
  const [Qty, setQty] = useState();
  const [IdUom, setIdUom] = useState();
  const { uom } = useContext(UomContext);
  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState(false);
  const [alertMsg, setAlertMsg] = useState(false);

  const options = uom
    ? uom.map((c) => ({
        value: c.iduom,
        label: c.name,
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

  useEffect(() => {
    setTitle("Product");
  }, []);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newProduct = {
      code,
      name: Name,
      quantity: Qty,
      baseUOM: IdUom,
    };
    const response = fetch("http://localhost:4000/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...newProduct,
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
        fetch(`http://localhost:4000/api/product/${id}`)
          .then((res) => {
            return res.json();
          })
          .then((result) => {
            console.log(result);
            setProduct([...product, ...result]);
          });
        setAlert(true);
        if (result.protocol41) {
          setAlertColor("success");
          setAlertMsg("Attribute Value data successfully submitted !");
        } else {
          setAlertColor("failure");
          setAlertMsg(result);
        }

        setCode("");
        setName("");
        setQty("");
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="px-4 md:h-[650px] md:overflow-y-scroll">
      <div className="py-4 text-center text-[#2C4856] font-extrabold text-2xl">
        Product
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
              for="code"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Code
            </label>
            <input
              type="text"
              id="code"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: P0001"
              required
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: Product-2"
              required
              value={Name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="qty"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Quantity
            </label>
            <input
              type="text"
              id="qty"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ex: 1000"
              required
              value={Qty}
              onChange={(e) => {
                setQty(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="uom"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              UOM
            </label>
            <Select
              id="uom"
              options={options}
              styles={style}
              classNamePrefix="select2-selection"
              onChange={(e) => {
                setIdUom(e.value);
              }}
              className="focus:ring-black focus:border-black"
            ></Select>
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

export default Product;