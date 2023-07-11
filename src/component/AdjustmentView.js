import React, { useState, useContext, useEffect } from "react";
import { AdjustmentContext } from "../context/AdjustmentContext.js";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { RiAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { TitleContext } from "../context/TitleContext.js";

import AdjustmentPopup from "./AdjustmentPopup.js";

const AdjustmentView = () => {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTitle("Adjustment");
  });

  const { setTitle } = useContext(TitleContext);
  const { adjustment } = useContext(AdjustmentContext);
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  return (
    <div className="px-4 py-4">
      {open && (
        <AdjustmentPopup
          data={selected}
          setOpen={setOpen}
          open={open}
          setSelected={setSelected}
        />
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
        <Link to="/home/addadjustment">
          <button
            type="button"
            className="text-[#2C4856] bg-[#ffff] hover:bg-[#d7d6d6] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <RiAddFill className="h-6 w-6" />
          </button>
        </Link>
      </div>

      <DataTable
        value={adjustment}
        filters={filter}
        className="mt-5"
        sortMode="multiple"
        paginator
        rows={5}
        totalRecords={adjustment.length}
        removableSort
        selectionMode="single"
        dataKey="idadjustment"
        selection={selected}
        onSelectionChange={(e) => {
          setSelected(e.value);
        }}
        onDoubleClick={() => setOpen(!open)}
      >
        <Column field="idadjustment" header="ID" sortable></Column>
        <Column field="warehouse_name" header="Warehouse" sortable></Column>
        <Column field="product" header="Product" sortable></Column>
        <Column field="code" header="Code" sortable></Column>
        <Column field="uom" header="UOM" sortable></Column>
        <Column field="qtyStock" header="Qty Stock" sortable></Column>
        <Column field="qtyAdj" header="Qty Adjustment" sortable></Column>
        <Column field="qtyInStock" header="Qty In Stock" sortable></Column>
        <Column field="idstock" header="idstock" sortable hidden></Column>
        <Column field="idwarehouse" header="idstock" sortable hidden></Column>
        <Column
          field="idproductUnitConversion"
          header="idstock"
          sortable
          hidden
        ></Column>
      </DataTable>
    </div>
  );
};

export default AdjustmentView;