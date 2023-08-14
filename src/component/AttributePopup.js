import React, { useState, useEffect, useRef, useContext } from "react";
import { AttributeContext } from "../context/AttributeContext";
import { Button } from "primereact/button";
import { UserContext } from "../context/UserContext";
const AttributePopup = ({ data, setOpen, open }) => {
  const [attrName, setAttr] = useState(data.name);
  const { attribute, setAttribute } = useContext(AttributeContext);
  const popup = useRef();
  const { userInfo } = useContext(UserContext);
  const username = userInfo?.username;
  const current_date = new Date();
  const year = current_date.getFullYear();
  const month = (current_date.getMonth() + 1).toString().padStart(2, "0");
  const day = current_date.getDate().toString().padStart(2, "0");
  const hours = current_date.getHours().toString().padStart(2, "0");
  const minutes = current_date.getMinutes().toString().padStart(2, "0");
  const seconds = current_date.getSeconds().toString().padStart(2, "0");
  const sqlDatetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  const handleDelete = () => {
    const response = fetch(
      `http://localhost:4000/api/attribute/${data.idattribute}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      return res.json();
    });

    // console.log(data.iduom);
    const newAttr = attribute.filter(
      (attrItem) => attrItem.idattribute !== data.idattribute
    );
    setAttribute(newAttr);
    setOpen(!open);
  };
  const handleUpdate = async () => {
    const response = await fetch(
      `http://localhost:4000/api/attribute/${data.idattribute}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attrName,
          modified_by: username,
        }),
      }
    );

    if (response.ok) {
      const newAttr = attribute.map((u) => {
        if (u.idattribute === data.idattribute) {
          return {
            idattribute: data.idattribute,
            name: attrName,
            document_number: data.document_number,
            created_at: data.created_at,
            created_by: data.created_by,
            modified_by: username,
            modified_at: sqlDatetime,
          }; // update matching customer object
        }
        return u; // keep other customer objects unchanged
      });
      setAttribute(newAttr);
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
        <h1 className="text-center text-lg font-bold mb-9">Attribute Detail</h1>
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            ID Attribute
          </label>
          <input
            type="text"
            id="name"
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={data.idattribute}
            disabled
          />
        </div>
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Attribute Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={attrName}
            onChange={(e) => {
              setAttr(e.target.value);
            }}
          />
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
              disabled={!attrName && true}
              onClick={handleUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttributePopup;