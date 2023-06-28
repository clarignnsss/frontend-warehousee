import React, { useState, useEffect, useRef, useContext } from "react";
import { WarehouseContext } from "../context/WarehouseContext";
import { Button } from "primereact/button";

const WarehousePopup = ({ data, setOpen, setSelected, open }) => {
  const { warehouse, setWarehouse } = useContext(WarehouseContext);
  const [warehouse_name, setWarehouseName] = useState(data.warehouse_name);
  const [address, setAddress] = useState(data.address);
  const [contact_person, setCP] = useState(data.contact_person);
  const [contact_number, setCN] = useState(data.contact_number);
  const [status, setStatus] = useState(data.status);
  const popup = useRef();
  const updateBtn = useRef();
  const deleteBtn = useRef();

  const handleDelete = () => {
    const response = fetch(
      `http://localhost:4000/api/warehouse/${data.idwarehouse}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      return res.json();
    });

    // console.log(data.iduom);
    const newWarehouse = warehouse.filter(
      (item) => item.idwarehouse !== data.idwarehouse
    );
    setWarehouse(newWarehouse);
    setOpen(!open);
  };
  const handleUpdate = async (e) => {
    const response = await fetch(
      `http://localhost:4000/api/warehouse/${data.idwarehouse}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          warehouse_name,
          address,
          contact_person,
          contact_number,
          status,
        }),
      }
    );

    if (response.ok) {
      const newWarehouse = warehouse.map((u) => {
        if (u.idwarehouse === data.idwarehouse) {
          return {
            idwarehouse: data.idwarehouse,
            warehouse_name,
            address,
            contact_person,
            contact_number,
            status,
          }; // update matching customer object
        }
        return u; // keep other customer objects unchanged
      });
      setWarehouse(newWarehouse);
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
        <h1 className="text-center text-lg font-bold mb-9">Warehouse Detail</h1>
        <div>
          <label
            for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Warehouse Name
          </label>
          <input
            type="text"
            id="name"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ex: Warehouse - 1"
            required
            value={warehouse_name}
            onChange={(e) => {
              setWarehouseName(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            for="address"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ex: Jl Indofood"
            required
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            for="cp"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Contact Person
          </label>
          <input
            type="text"
            id="cp"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ex: Ahmad Yani"
            required
            value={contact_person}
            onChange={(e) => {
              setCP(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            for="cn"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Contact Number
          </label>
          <input
            type="text"
            id="cn"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ex: 08176764747"
            required
            value={contact_number}
            onChange={(e) => {
              setCN(e.target.value);
            }}
          />
        </div>
        <div>
          <label
            for="status"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Status
          </label>
          <input
            type="text"
            id="status"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ex: available"
            required
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
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
            disabled={
              (!warehouse_name ||
                !address ||
                !contact_number ||
                !contact_person ||
                !status) &&
              true
            }
          />
        </div>
      </div>
    </div>
  );
};

export default WarehousePopup;