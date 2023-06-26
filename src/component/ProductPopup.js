import React, { useState, useEffect, useRef, useContext } from "react";
import { UomContext } from "../context/UomContext";
import { ProductContext } from "../context/ProductContext";
import Select from "react-select";
import { Button } from "primereact/button";

const ProductPopup = ({ data, setOpen, open }) => {
  const { product, setProduct } = useContext(ProductContext);
  const [code, setCode] = useState(data.code);
  const [Name, setName] = useState(data.name);
  const [Qty, setQty] = useState(data.quantity);
  const [uomName, setUomName] = useState(data.uom);
  const [uomId, setUomId] = useState();
  const { uom } = useContext(UomContext);
  const popup = useRef();

  const payload = {
    code,
    name: Name,
    quantity: Qty,
    baseUOM: uomId,
  };

  const options = uom
    ? uom.map((c) => ({
        value: c.iduom,
        label: c.name,
      }))
    : "";
  const defaultValue = options.find((op) => op.label == data.uom);

  const style = {
    control: (base) => ({
      ...base,
      border: 0,
      // This line disable the blue border
      boxShadow: "none",
    }),
  };

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:4000/api/product/${data.idproduct}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const newProduct = product.filter((p) => p.idproduct !== data.idproduct);
      setProduct(newProduct);
      setOpen(!open);
    }
  };
  const handleUpdate = async () => {
    const response = await fetch(
      `http://localhost:4000/api/product/${data.idproduct}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...payload,
        }),
      }
    );

    if (response.ok) {
      const newProduct = product.map((u) => {
        if (u.idproduct === data.idproduct) {
          return {
            idproduct: data.idproduct,
            code,
            name: Name,
            quantity: Qty,
            uom: uomName,
          }; // update matching customer object
        }
        return u; // keep other customer objects unchanged
      });
      setProduct(newProduct);
      console.log(newProduct);
      setOpen(!open);
    }
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
        className="bg-white p-8 w-80  rounded-lg"
        onClick={(e) => handleChildClick(e)}
      >
        <h1 className="text-center text-lg font-bold mb-9">Product Detail</h1>
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
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={Name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            for="quantity"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Quantity
          </label>
          <input
            type="text"
            id="quantity"
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
          >
            UOM
          </label>
          <Select
            id="uom"
            options={options}
            styles={style}
            classNamePrefix="select2-selection"
            onChange={(e) => {
              setUomId(e.value);
              setUomName(e.label);
            }}
            defaultValue={defaultValue}
            className="focus:ring-black focus:border-black mb-4 "
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
            disabled={!payload && true}
            onClick={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;