import React, { useState, useEffect, useRef, useContext } from "react";
import { ProductUnitContext } from "../context/ProductUnitContext";
import { ProductContext } from "../context/ProductContext";
import { UomContext } from "../context/UomContext";
import { Button } from "primereact/button";
import Select from "react-select";
import { UserContext } from "../context/UserContext";

const ProductUnitPopup = ({ data, setOpen, setSelected, open }) => {
  const [UomId, setUomId] = useState(data.iduom);
  const [UomName, setUomName] = useState(data.uom);
  const [ProductId, setProductId] = useState(data.idproduct);
  const [ProductName, setProductName] = useState(data.product);
  const [ProductCode, setProductCode] = useState(data.code);
  const { productunit, setProductUnit } = useContext(ProductUnitContext);
  const { product } = useContext(ProductContext);
  const { uom } = useContext(UomContext);
  const popup = useRef();
  const updateBtn = useRef();
  const deleteBtn = useRef();
  const current_date = new Date();
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  const year = current_date.getFullYear();
  const month = (current_date.getMonth() + 1).toString().padStart(2, "0");
  const day = current_date.getDate().toString().padStart(2, "0");
  const hours = current_date.getHours().toString().padStart(2, "0");
  const minutes = current_date.getMinutes().toString().padStart(2, "0");
  const seconds = current_date.getSeconds().toString().padStart(2, "0");
  const sqlDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

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
          modified_by: username,
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
            created_at: data.created_at,
            created_by: data.created_by,
            modified_at: sqlDatetime,
            modified_by: username,
            code: ProductCode,
            product: ProductName,
            uom: UomName,
            document_number: data.document_number,
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
            disabled={(!ProductId || !UomId) && true}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUnitPopup;