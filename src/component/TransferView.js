import React, { useState, useContext, useEffect } from "react";
import { TitleContext } from "../context/TitleContext.js";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Alert } from "flowbite-react";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { RiAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { TransferContext } from "../context/TransferContext.js";
import { Tag } from "primereact/tag";
import TransferPopup from "./TransferPopup.js";

const TransferView = () => {
  useEffect(() => {
    setTitle("Transfer");
  });
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const { setTitle } = useContext(TitleContext);
  const { transfer } = useContext(TransferContext);
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const statusBodyTemplate = (transfer) => {
    return <Tag value={transfer.status} severity={getSeverity(transfer)}></Tag>;
  };

  const getSeverity = (transfer) => {
    switch (transfer.status) {
      case "WIP":
        return "warning";

      case "Received":
        return "success";

      default:
        return null;
    }
  };
  return (
    <div className="px-4 py-4">
      {open && (
        <TransferPopup
          data={selected}
          setSelected={setSelected}
          setOpen={setOpen}
          open={open}
          setAlert={setAlert}
          setAlertColor={setAlertColor}
          setAlertMsg={setAlertMsg}
        />
      )}
      {alert ? (
        <Alert color={`${alertColor}`} className="mb-3">
          <span>
            <p className="flex items-center">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-3"
              >
                <path
                  d="M9.60208 13.8973L12.6447 17.0268C12.7851 17.1712 13.2064 17.2675 13.4404 17.0268C13.7026 16.7572 18.7299 11.5542 21.2108 8.98636C21.769 8.40861 22.9285 8.21602 23.6448 8.98636C24.347 9.74138 24.2066 10.7678 23.7385 11.2974L14.6107 20.6859C14.0021 21.3118 12.8319 22.1303 11.5681 20.8304C10.3642 19.5921 8.32412 17.4681 7.16801 16.2621C6.74722 15.8231 6.08326 14.7158 6.93397 13.801C7.38171 13.3195 8.33824 12.5973 9.60208 13.8973Z"
                  fill="white"
                />
                <rect
                  x="1.5"
                  y="1.5"
                  width="27"
                  height="27"
                  rx="4.5"
                  stroke="white"
                  stroke-width="3"
                />
              </svg>
              {alertMsg} !
            </p>
          </span>
        </Alert>
      ) : (
        ""
      )}
      <div className="flex justify-between ">
        <InputText
          onInput={(e) => {
            setFilter({
              ...filter,
              global: {
                value: e.target.value,
                matchMode: FilterMatchMode.CONTAINS,
              },
            });
          }}
          placeholder="Search.."
        />
        <Link to="/home/addtransfer">
          <button
            type="button"
            className="text-[#2C4856] bg-[#ffff] hover:bg-[#d7d6d6] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <RiAddFill className="h-6 w-6" />
          </button>
        </Link>
      </div>

      <DataTable
        value={transfer}
        filters={filter}
        className="mt-5"
        sortMode="multiple"
        paginator
        rows={5}
        totalRecords={transfer.length}
        removableSort
        selectionMode="single"
        dataKey="idtransfer"
        selection={selected}
        onSelectionChange={(e) => {
          setSelected(e.value);
        }}
        onDoubleClick={() => setOpen(!open)}
      >
        <Column body={statusBodyTemplate} header="Status" sortable></Column>
        <Column field="idtransfer" header="ID" sortable></Column>
        <Column field="product" header="Product" sortable></Column>
        <Column field="code" header="Code" sortable></Column>
        <Column field="uom" header="UOM" sortable></Column>
        <Column field="qty" header="Qty" sortable></Column>
        <Column
          field="warehouseFromName"
          header="warehouse From"
          sortable
        ></Column>
        <Column field="warehouseToName" header="warehouse To" sortable></Column>
        <Column field="created_at" header="Created At" sortable></Column>
      </DataTable>
    </div>
  );
};

export default TransferView;