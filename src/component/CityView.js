import React, { useState, useContext, useEffect } from "react";
import { CityContext } from "../context/CityContext.js";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { RiAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { TitleContext } from "../context/TitleContext.js";

const CityView = () => {
  useEffect(() => {
    setTitle("Master Data");
  });

  const { setTitle } = useContext(TitleContext);
  const { city } = useContext(CityContext);
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  return (
    <div className="px-4 py-4">
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
        <Link to="/home/addcity">
          <button
            type="button"
            className="text-[#2C4856] bg-[#ffff] hover:bg-[#d7d6d6] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <RiAddFill className="h-6 w-6" />
          </button>
        </Link>
      </div>

      <DataTable
        value={city}
        filters={filter}
        className="mt-5"
        sortMode="multiple"
        paginator
        rows={5}
        totalRecords={city.length}
        removableSort
        selectionMode="single"
      >
        <Column field="idcity" header="ID" sortable></Column>
        <Column field="cityName" header="City" sortable></Column>
      </DataTable>
    </div>
  );
};

export default CityView;