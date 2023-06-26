import React, { useState, useEffect, useRef, useContext } from "react";

import Select from "react-select";
import { Button } from "primereact/button";
import { ProductAttributeContext } from "../context/ProductAttributeContext";
import { AttrValueContext } from "../context/AttrValueContext";
import { ProductContext } from "../context/ProductContext";

const ProductAttributePopup = ({ data, setOpen, open }) => {
  const { productattr, setProductattr } = useContext(ProductAttributeContext);

  const [IdProduct, setIdProduct] = useState();
  const { attrvalue } = useContext(AttrValueContext);
  const { product } = useContext(ProductContext);
  const [idattrValue, setIdAttrValue] = useState(data.idattrvalue);
  const [attrValue, setAttrValue] = useState(data.name);
  const [code, setCode] = useState();
  const [Name, setName] = useState(data.name);

  const popup = useRef();

  const options_attrvalue = attrvalue
    ? attrvalue.map((c) => ({
        value: c.idattributeValue,
        label: c.name,
      }))
    : "";

  const options_product = product
    ? product.map((c) => ({
        value: c.idproduct,
        label: c.name,
        code: c.code,
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
      `http://localhost:4000/api/productattr/${data.idproductAttribute}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      return res.json();
    });

    const newProductAttribute = productattr.filter(
      (attrItem) => attrItem.idproductAttribute !== data.idproductAttribute
    );
    setProductattr(newProductAttribute);
    setOpen(!open);
  };
  const handleUpdate = async () => {
    const response = await fetch(
      `http://localhost:4000/api/productattr/${data.idproductAttribute}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idproduct: IdProduct,
          idattrvalue: idattrValue,
        }),
      }
    );

    if (response.ok) {
      const newProductAttribute = productattr.map((u) => {
        if (u.idproductAttribute === data.idproductAttribute) {
          return {
            idproductAttribute: data.idproductAttribute,
            code,
            product: Name,
            attributeValue: attrValue,
            idattrvalue: idattrValue,
          }; // update matching customer object
        }
        return u; // keep other customer objects unchanged
      });
      setProductattr(newProductAttribute);
      console.log(newProductAttribute);
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
        <h1 className="text-center text-lg font-bold mb-9">
          Product Attribute Detail
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
            options={options_product}
            styles={style}
            classNamePrefix="select2-selection"
            onChange={(e) => {
              setIdProduct(e.value);
              setCode(e.code);
              setName(e.label);
            }}
            required
            className="focus:ring-black focus:border-black"
          ></Select>
        </div>
        <div>
          <label
            for="attrvalue"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Attribute Value
          </label>
          <Select
            id="attrvalue"
            options={options_attrvalue}
            styles={style}
            classNamePrefix="select2-selection"
            onChange={(e) => {
              setIdAttrValue(e.value);
              setAttrValue(e.label);
            }}
            required
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
            disabled={(!idattrValue || !IdProduct) && true}
            onClick={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductAttributePopup;