import React, { useState, useEffect, useRef, useContext } from "react";
import { ProductUnitContext } from "../context/ProductUnitContext";
import { ProductContext } from "../context/ProductContext";
import { UomContext } from "../context/UomContext";
import { Button } from "primereact/button";
import Select from "react-select";

const ProductUnitPopup = ({ data, setOpen, setSelected, open }) => {
  const [UomId, setUomId] = useState(data.iduom);
  const [UomName, setUomName] = useState(data.uom);
  const [ProductId, setProductId] = useState(data.idproduct);
  const [ProductName, setProductName] = useState(data.product);
  const [ProductCode, setProductCode] = useState(data.code);
  const [Qty, setQty] = useState(data.unitQty);
  const { productunit, setProductUnit } = useContext(ProductUnitContext);
  const { product } = useContext(ProductContext);
  const { uom } = useContext(UomContext);
  const popup = useRef();
  const updateBtn = useRef();
  const deleteBtn = useRef();

  const options_product = product
    ? product.map((c) => ({
        value: c.idproduct,
        label: c.name,
        code: c.code,
      }))
    : "";
  const options_uom = uom
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

  const handleDelete = () => {
    const response = fetch(
      `http://localhost:4000/api/productunit/${data.idproductUnitConversion}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      return res.json();
    });

    // console.log(data.iduom);
    const newProductUnit = productunit.filter(
      (item) => item.idproductUnitConversion !== data.idproductUnitConversion
    );
    setProductUnit(newProductUnit);
    setOpen(!open);
  };
  const handleUpdate = async (e) => {
    const response = await fetch(
      `http://localhost:4000/api/productunit/${data.idproductUnitConversion}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idproduct: ProductId,
          iduom: UomId,
          unitQty: Qty,
        }),
      }
    );

    if (response.ok) {
      const newProductUnit = productunit.map((u) => {
        if (u.idproductUnitConversion === data.idproductUnitConversion) {
          return {
            idproductUnitConversion: data.idproductUnitConversion,
            idproduct: ProductId,
            iduom: UomId,
            unitQty: Qty,
            code: ProductCode,
            product: ProductName,
            uom: UomName,
          }; // update matching customer object
        }
        return u; // keep other customer objects unchanged
      });
      setProductUnit(newProductUnit);
      setSelected("");
      setOpen(!open);
    }
  };
  useEffect(() => {
    const handleClick = (e) => {
      if (popup.current) {
        setOpen(!open);
        setSelected("");
      }
    };

    document.addEventListener("click", (e) => {
      handleClick(e);
    });

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open]);

  useEffect(() => {
    const handleClickBtn = (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        updateBtn.current.click();
      }
    };

    document.addEventListener("keydown", handleClickBtn);

    return () => {
      document.removeEventListener("keydown", handleClickBtn);
    };
  }, []);

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
        <h1 className="text-center text-lg font-bold mb-9">
          Product Unit Detail
        </h1>
        <div>
          <label
            for="product"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product
          </label>
          <Select
            id="product"
            required
            options={options_product}
            styles={style}
            classNamePrefix="select2-selection"
            onChange={(e) => {
              setProductId(e.value);
              setProductName(e.label);
              setProductCode(e.code);
            }}
            defaultValue={options_product.find(
              (option) => option.value == data.idproduct
            )}
            className="focus:ring-black focus:border-black"
          ></Select>
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
            required
            options={options_uom}
            styles={style}
            classNamePrefix="select2-selection"
            onChange={(e) => {
              setUomId(e.value);
              setUomName(e.label);
            }}
            defaultValue={options_uom.find(
              (option) => option.value == data.iduom
            )}
            className="focus:ring-black focus:border-black"
          ></Select>
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
        <div className="flex flex-start gap-4 mt-3">
          <Button
            label="Delete"
            severity="danger"
            size="small"
            onClick={handleDelete}
            ref={deleteBtn}
          />
          <Button
            type="submit"
            label="Update"
            ref={updateBtn}
            onClick={handleUpdate}
            severity="success"
            size="small"
            disabled={(!ProductId || !UomId || !Qty) && true}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUnitPopup;