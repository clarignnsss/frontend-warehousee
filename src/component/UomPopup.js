import React, { useState, useEffect, useRef, useContext } from "react";
import { UomContext } from "../context/UomContext";
import { Button } from "primereact/button";

const UomPopup = ({ data, setOpen, open }) => {
  const [uomName, setUomName] = useState(data.name);
  const { uom, setUom } = useContext(UomContext);
  const popup = useRef();

  const handleDelete = () => {
    const response = fetch(`http://localhost:4000/api/uom/${data.iduom}`, {
      method: "DELETE",
    }).then((res) => {
      return res.json();
    });

    // console.log(data.iduom);
    const newUom = uom.filter((uomItem) => uomItem.iduom !== data.iduom);
    setUom(newUom);
    setOpen(!open);
  };
  const handleUpdate = async () => {
    const response = await fetch(
      `http://localhost:4000/api/uom/${data.iduom}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uomName,
        }),
      }
    );

    if (response.ok) {
      const newUom = uom.map((u) => {
        if (u.iduom === data.iduom) {
          return {
            iduom: data.iduom,
            name: uomName,
          }; // update matching customer object
        }
        return u; // keep other customer objects unchanged
      });
      setUom(newUom);
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
        <h1 className="text-center text-lg font-bold mb-9">UOM Detail</h1>
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            ID UOM
          </label>
          <input
            type="text"
            id="name"
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={data.iduom}
            disabled
          />
        </div>
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            UOM Name
          </label>
          <input
            type="text"
            id="name"
            class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            value={uomName}
            onChange={(e) => {
              setUomName(e.target.value);
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
              disabled={!uomName && true}
              onClick={handleUpdate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UomPopup;