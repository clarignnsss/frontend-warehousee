import React, { useState, useEffect, useRef, useContext } from "react";
import { POContext } from "../context/PoContext";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import Select from "react-select";
import { VendorContext } from "../context/VendorContext";
import { StockContext } from "../context/StockContext";
import { UserContext } from "../context/UserContext";
const POPopup = ({
  data,
  setOpen,
  open,
  setSelected,
  setAlert,
  setAlertMsg,
  setAlertColor,
}) => {
  const { po, setPO } = useContext(POContext);
  const [idpurchase_order, setIdPO] = useState(data.idpurchase_order);
  const [idvendor, setIdVendor] = useState(data.idvendor);
  const [idstock, setIdStock] = useState(data.idstock);
  const [status, setStatus] = useState(data.status);
  const [quantity, setQty] = useState(data.quantity);
  const [price, setPrice] = useState(data.price);
  const [total, setTotal] = useState(data.total);
  const [warehouse_name, setWarehouseName] = useState(data.warehouse_name);
  const [product, setProduct] = useState(data.product);
  const [code, setCode] = useState(data.code);
  const [uom, setUOM] = useState(data.uom);
  const [vendor_name, setVendorName] = useState(data.vendor_name);
  const { vendor, setVendor } = useContext(VendorContext);
  const { stock, setStock } = useContext(StockContext);
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

  const getSeverity = (po) => {
    switch (po.status) {
      case "Done":
        return "success";

      case "Waiting":
        return "warning";

      default:
        return null;
    }
  };

  const options_vendor = vendor
    ? vendor.map((c) => ({
        value: c.idvendor,
        label: c.vendor_name,
      }))
    : "";

  const popup = useRef();

  const handleReceived = async () => {
    const response = await fetch(
      `http://localhost:4000/api/po/status/${data.idpurchase_order}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modified_by: username,
        }),
      }
    );
    const res = await response.json();
    if (response.ok) {
      const newPO = po.map((u) => {
        if (u.idpurchase_order === data.idpurchase_order) {
          return {
            idpurchase_order,
            idvendor,
            idstock,
            vendor_name,
            warehouse_name,
            product,
            uom,
            code,
            status: "Done",
            quantity,
            price,
            total,
            modified_at: data.modified_at,
            modified_by: data.modified_by,
            created_at: data.created_at,
            created_by: data.created_by,
            document_number: data.document_number,
          };
        }
        return u;
      });
      const newStock = stock.map((s) => {
        if (s.idstock == data.idstock) {
          return {
            ...data,
            document_number: s.document_number,
            created_at: s.created_at,
            created_by: s.created_by,
            modified_at: s.modified_at,
            modified_by: s.modified_by,
            qty: res.qty,
          };
        }
        return s;
      });
      setStock(newStock);
      setPO(newPO);
      setSelected("");
      setOpen(!open);
      setAlertColor("success");
      setAlertMsg("Purchase Order item successfully received !");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      setOpen(!open);
      setAlert(true);
      setAlertColor("failure");
      setAlertMsg(res);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:4000/api/po/${data.idpurchase_order}`,
      {
        method: "DELETE",
      }
    );
    const res = await response.json();
    if (response.ok) {
      const newPO = po.filter(
        (item) => item.idpurchase_order !== data.idpurchase_order
      );

      setPO(newPO);
      setAlertColor("success");
      setAlertMsg("Purchase Order data successfully deleted !");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
      setSelected("");
      setOpen(!open);
    } else {
      setOpen(!open);
      setAlert(true);
      setAlertColor("failure");
      setAlertMsg(res);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  };
  const handleUpdate = async () => {
    const response = await fetch(
      `http://localhost:4000/api/po/${data.idpurchase_order}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idvendor,
          idstock,
          status,
          quantity,
          price,
          total,
          modified_by: username,
        }),
      }
    );

    const res = await response.json();
    if (response.ok) {
      const newPO = po.map((u) => {
        if (u.idpurchase_order === data.idpurchase_order) {
          return {
            idpurchase_order,
            idvendor,
            idstock,
            vendor_name,
            warehouse_name,
            product,
            uom,
            code,
            status,
            quantity,
            price,
            total,
            modified_at: sqlDatetime,
            modified_by: username,
            created_at: data.created_at,
            created_by: data.created_by,
            document_number: data.document_number,
          };
        }
        return u;
      });
      setPO(newPO);
      setSelected("");
      setOpen(!open);
      setAlertColor("success");
      setAlertMsg("Purchase Order data successfully updated !");
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      setOpen(!open);
      setAlert(true);
      setAlertColor("failure");
      setAlertMsg(res);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
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

  useEffect(() => {
    setTotal(quantity * price);
  }, [price, quantity]);

  const handleChildClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      className="fixed top-0 left-0 w-full h-full z-20 flex items-center justify-center bg-gray-800 bg-opacity-75"
      ref={popup}
    >
      <div
        className="bg-white p-8  h-5/6  overflow-scroll rounded-lg"
        onClick={(e) => handleChildClick(e)}
      >
        <div className="flex h-10 justify-between mb-2">
          <h1 className="text-center text-xl font-bold mb-9">
            Purchase Order Detail
          </h1>
          <Tag
            value={data.status}
            className="mb-2"
            severity={getSeverity(data)}
          ></Tag>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ID PO
            </label>
            <input
              type="text"
              id="name"
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={data.idpurchase_order}
              disabled
            />
          </div>

          <div>
            <label
              for="product"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Warehouse
            </label>
            <input
              type="text"
              id="product"
              disabled
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={data.warehouse_name}
            />
          </div>
          <div>
            <label
              for="code"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product
            </label>
            <input
              type="text"
              id="code"
              disabled
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={data.product}
            />
          </div>
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
              disabled
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={data.code}
            />
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
              disabled
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={data.uom}
            />
          </div>
          <div>
            <label
              for="uom"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Vendor
            </label>

            <Select
              id="vendor"
              options={options_vendor}
              isDisabled={data.status == "Done" && true}
              classNamePrefix="select2-selection"
              onChange={(e) => {
                setIdVendor(e.value);
                setVendorName(e.label);
              }}
              required
              defaultValue={options_vendor.find(
                (option) => option.value == data.idvendor
              )}
              className="focus:ring-black focus:border-black"
            ></Select>
          </div>
          <div>
            <label
              for="qty"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Qty
            </label>
            <input
              type="number"
              id="qty"
              disabled={data.status == "Done" && true}
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={quantity}
              onChange={(e) => {
                setQty(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="price"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              disabled={data.status == "Done" && true}
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              for="uom"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Total
            </label>
            <input
              type="text"
              id="uom"
              disabled
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={total}
              onChange={(e) => {
                setTotal(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-start gap-4 mt-3">
          <Button
            label="Delete"
            severity="danger"
            size="small"
            onClick={handleDelete}
            disabled={data.status == "Done" && true}
          />
          <Button
            label="Update"
            severity="success"
            size="small"
            disabled={data.status == "Done" && true}
            onClick={handleUpdate}
          />
          <Button
            label="Received"
            severity="warning"
            size="small"
            disabled={data.status == "Done" && true}
            onClick={handleReceived}
          />
        </div>
      </div>
    </div>
  );
};

export default POPopup;