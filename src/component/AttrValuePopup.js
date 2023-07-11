import React, { useState, useEffect, useRef, useContext } from "react";
import { AttrValueContext } from "../context/AttrValueContext";
import { AttributeContext } from "../context/AttributeContext";
import Select from "react-select";
import { Button } from "primereact/button";

const AttrValuePopup = ({ data, setOpen, open }) => {
  const [idattribute, setIdAttribute] = useState(data.idattribute);
  const [attrName, setAttr] = useState();
  const { attribute } = useContext(AttributeContext);
  const [value, setValue] = useState(data.value);
  const [Name, setName] = useState(data.name);
  const { attrvalue, setAttrvalue } = useContext(AttrValueContext);
  const popup = useRef();

  const options = attribute
    ? attribute.map((c) => ({
        value: c.idattribute,
        label: c.name,
      }))
    : "";

  const handleDelete = () => {
    const response = fetch(
      `http://localhost:4000/api/attributevalue/${data.idattributeValue}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      return res.json();
    });
    console.log(options);
    const newAttrValue = attrvalue.filter(
      (attrItem) => attrItem.idattributeValue !== data.idattributeValue
    );
    setAttrvalue(newAttrValue);
    setOpen(!open);
  };
  const handleUpdate = async () => {
    const response = await fetch(
      `http://localhost:4000/api/attributevalue/${data.idattributeValue}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: Name,
          idattr: idattribute,
          value,
        }),
      }
    );

    if (response.ok) {
      const newAttrValue = attrvalue.map((u) => {
        if (u.idattributeValue === data.idattributeValue) {
          return {
            idattributeValue: data.idattributeValue,
            name: Name,
            attribute: attrName,
            value,
          }; // update matching customer object
        }
        return u; // keep other customer objects unchanged
      });
      setAttrvalue(newAttrValue);
      console.log(newAttrValue);
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
          Attribute Value Detail
        </h1>
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
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={Name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            for="attr"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Attribute
          </label>
          <Select
            id="attr"
            options={options}
            classNamePrefix="select2-selection"
            onChange={(e) => {
              setIdAttribute(e.value);
              setAttr(e.label);
              console.log(e.value);
            }}
            defaultValue={options.find((option) => option.label == data.name)}
            className="focus:ring-black focus:border-black mb-4"
          ></Select>
        </div>
        <div>
          <label
            for="values"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Value
          </label>
          <input
            type="text"
            id="value"
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
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
            disabled={!value && true}
            onClick={handleUpdate}
          />
        </div>
      </div>
    </div>
  );
};

export default AttrValuePopup;