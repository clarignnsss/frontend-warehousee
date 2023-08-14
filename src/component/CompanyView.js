import React, { useState, useContext, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { CompanyContext } from "../context/CompanyContext";
import { RiAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Alert } from "flowbite-react";
import { TitleContext } from "../context/TitleContext";
import "../index.css";
import CompanyPopup from "./CompanyPopup";

const CompanyView = () => {
  const { setTitle } = useContext(TitleContext);
  const { company } = useContext(CompanyContext);
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertColor, setAlertColor] = useState("");
  const [alertMsg, setAlertMsg] = useState("");
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  useEffect(() => {
    setTitle("Master Data");
  });

  return (
    <div className="px-4 py-4">
      {open && (
        <CompanyPopup
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
        <Link to="/home/addcompany">
          <button
            type="button"
            className="text-[#2C4856] bg-[#ffff] hover:bg-[#d7d6d6] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <RiAddFill className="h-6 w-6" />
          </button>
        </Link>
      </div>

      <DataTable
        value={company}
        filters={filter}
        className="mt-5"
        sortMode="multiple"
        paginator
        rows={5}
        totalRecords={company.length}
        removableSort
        selectionMode="single"
        dataKey="idcompany"
        selection={selected}
        onSelectionChange={(e) => {
          setSelected(e.value);
        }}
        onDoubleClick={() => setOpen(!open)}
        // style={{ maxWidth: "1000px" }}
      >
        <Column
          field="document_number"
          header="Company Number"
          sortable
        ></Column>
        <Column field="company_name" header="Company Name" sortable></Column>
        <Column field="company_address" header="Address" sortable></Column>
        <Column field="phone_no" header="Phone" sortable></Column>
        <Column field="currency_code" header="Currency" sortable></Column>
        <Column field="countryName" header="Country" sortable></Column>
        <Column field="cityName" header="City" sortable></Column>
        <Column field="provinceName" header="Province" sortable></Column>
        <Column field="created_at" header="Created At" sortable></Column>
        <Column field="created_by" header="Created By" sortable></Column>
        <Column field="modified_at" header="Modified At" sortable></Column>
        <Column field="modified_by" header="Modified By" sortable></Column>
      </DataTable>
    </div>
  );
};

export default CompanyView;