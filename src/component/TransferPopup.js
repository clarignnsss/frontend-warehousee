import React, { useState, useEffect, useRef, useContext } from "react";
import { Button } from "primereact/button";
import { TransferContext } from "../context/TransferContext";
import { StockContext } from "../context/StockContext";

const TransferPopup = ({
  data,
  setOpen,
  open,
  setSelected,
  setAlert,
  setAlertMsg,
  setAlertColor,
}) => {
  const { transfer, setTransfer } = useContext(TransferContext);
  const { stock, setStock } = useContext(StockContext);
  const [idtransfer, setIdTransfer] = useState(data.idtransfer);
  const [product, setProduct] = useState(data.product);
  const [code, setCode] = useState(data.code);
  const [uom, setUom] = useState(data.uom);
  const [qty, setQty] = useState(data.qty);
  const [qtyDiff, setQtyDiff] = useState(0);
  const [warehouseFrom, setWarehouseTo] = useState(data.warehouseFrom);
  const [warehouseTo, setWarehouseFrom] = useState(data.warehouseTo);

  const popup = useRef();

  const handleDelete = () => {
    const response = fetch(
      `http://localhost:4000/api/transfer/${data.idtransfer}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        if (res.protocol41) {
          setAlertColor("success");
          setAlertMsg("Transfer data successfully deleted !");
          setAlert(true);
          const newTransfer = transfer.filter(
            (item) => item.idtransfer !== data.idtransfer
          );
          setTransfer(newTransfer);
          setOpen(!open);
          setTimeout(() => {
            setAlert(false);
          }, 3000);

          const newStock = stock.map((s) => {
            if (s.idstock == data.idstock) {
              return {
                idstock: s.idstock,
                idwarehouse: s.idwarehouse,
                warehouse_name: s.warehouse_name,
                idproductUnitConversion: s.idproductUnitConversion,
                iduom: s.iduom,
                uom: s.uom,
                idproduct: s.idproduct,
                code: s.code,
                product: s.product,
                qty: s.qty + qty,
              };
            }
            return s;
          });
          setStock(newStock);
        } else {
          setAlert(true);
          setAlertColor("failure");
          setAlertMsg(res);
          setOpen(!open);
          setTimeout(() => {
            setAlert(false);
          }, 3000);
        }
      });
  };
  const handleUpdate = async () => {
    const response = await fetch(
      `http://localhost:4000/api/transfer/${data.idtransfer}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qty,
        }),
      }
    );

    const res = await response.json();
    if (response.ok) {
      const newTransfer = transfer.map((u) => {
        if (u.idtransfer === data.idtransfer) {
          return {
            idtransfer: data.idtransfer,
            idstock: data.idstock,
            idproductUnitConversion: data.idproductUnitConversion,
            product: data.product,
            code: data.code,
            iduom: data.iduom,
            uom: data.uom,
            status: data.status,
            qty: qty,
            warehouseFrom: data.warehouseFrom,
            warehouseTo: data.warehouseTo,
            warehouseToName: data.warehouseToName,
            warehouseFromName: data.warehouseFromName,
            created_at: data.created_at,
          };
        }
        return u;
      });
      setTransfer(newTransfer);
      setSelected("");
      setOpen(!open);
      setAlertColor("success");
      setAlertMsg("Transfer data successfully updated !");
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
  const handleReceived = async () => {
    const response = await fetch(
      `http://localhost:4000/api/transfer/status/${data.idtransfer}`,
      {
        method: "PUT",
      }
    );
    const res = await response.json();
    if (response.ok) {
      const newTransfer = transfer.map((u) => {
        if (u.idtransfer === data.idtransfer) {
          return {
            idtransfer: data.idtransfer,
            idstock: data.idstock,
            idproductUnitConversion: data.idproductUnitConversion,
            product: data.product,
            code: data.code,
            iduom: data.iduom,
            uom: data.uom,
            qty: data.qty,
            status: "Received",
            warehouseFrom: data.warehouseFrom,
            warehouseTo: data.warehouseTo,
            warehouseToName: data.warehouseToName,
            warehouseFromName: data.warehouseFromName,
            created_at: data.created_at,
          };
        }
        return u;
      });
      const newStock = stock.map((s) => {
        if (s.idstock == data.idstock) {
          return {
            idstock: data.idstock,
            idwarehouse: data.idwarehouse,
            warehouse_name: data.warehouse_name,
            idproductUnitConversion: data.idproductUnitConversion,
            iduom: data.iduom,
            uom: data.uom,
            idproduct: data.idproduct,
            code: data.code,
            product: data.product,
            qty: s.qty - qty,
          };
        }
        return s;
      });
      setStock(newStock);
      setTransfer(newTransfer);
      setSelected("");
      setOpen(!open);
      setAlertColor("success");
      setAlertMsg("Transfer item successfully received !");
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
            Transfer Detail
          </h1>
          {/* <Tag
            value={data.status}
            className="mb-2"
            severity={getSeverity(data)}
          ></Tag> */}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              ID Transfer
            </label>
            <input
              type="text"
              id="name"
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={data.idtransfer}
              disabled
            />
          </div>

          <div>
            <label
              for="product"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product
            </label>
            <input
              type="text"
              id="product"
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
              for="code"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              UOM
            </label>
            <input
              type="text"
              id="code"
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
              Warehouse From
            </label>
            <input
              type="text"
              id="uom"
              disabled
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={data.warehouseFrom}
            />
          </div>
          <div>
            <label
              for="uom"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Warehouse From
            </label>
            <input
              type="text"
              id="uom"
              disabled
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={data.warehouseTo}
            />
          </div>
          <div>
            <label
              for="uom"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Qty
            </label>
            <input
              type="text"
              id="uom"
              class="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-black focus:border-black block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              value={qty}
              onChange={(e) => {
                setQty(e.target.value);
                setQtyDiff(parseInt(data.qty) - e.target.value);
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
            disabled={data.status == "Received" && true}
          />
          <Button
            label="Update"
            severity="success"
            size="small"
            disabled={data.status == "Received" && true}
            onClick={handleUpdate}
          />
          <Button
            label="Received"
            severity="warning"
            size="small"
            disabled={data.status == "Received" && true}
            onClick={handleReceived}
          />
        </div>
      </div>
    </div>
  );
};

export default TransferPopup;