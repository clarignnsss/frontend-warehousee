import React, { useState, useEffect, useRef, useContext } from "react";
import { StockContext } from "../context/StockContext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

const AdjustmentStockPopup = ({
  setSelected,
  selected,
  openPopup,
  handleOpenPopup,
}) => {
  const { stock } = useContext(StockContext);
  const popup = useRef();
  const submitBtn = useRef();

  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const handleCloseClick = (e) => {
    handleOpenPopup(!openPopup);
    setSelected("");
  };

  useEffect(() => {
    const handleClickBtn = (event) => {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission
        submitBtn.current.click();
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
        className="bg-white p-8  rounded-lg relative"
        onClick={(e) => handleChildClick(e)}
      >
        <h1 className="text-center text-lg font-bold mb-9 ">Stock Detail</h1>

        {/* <GrClose
          className="w-8 h-8 absolute top-3 right-3 cursor-pointer "
          onClick={handleCloseClick}
        /> */}

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
        <DataTable
          value={stock}
          filters={filter}
          className="mt-5"
          sortMode="multiple"
          paginator
          rows={5}
          totalRecords={stock.length}
          removableSort
          selectionMode="single"
          dataKey="idstock"
          selection={selected}
          onSelectionChange={(e) => {
            setSelected(e.value);
          }}
        >
          <Column field="idstock" header="ID" sortable></Column>
          <Column field="warehouse_name" header="Warehouse" sortable></Column>
          <Column field="product" header="Product" sortable></Column>
          <Column field="code" header="Code" sortable></Column>
          <Column field="uom" header="Uom" sortable></Column>
          <Column field="qty" header="Qty" sortable></Column>
        </DataTable>
        <div className="flex flex-start gap-4 mt-3">
          <Button
            label="Select"
            severity="success"
            size="small"
            onClick={() => {
              handleOpenPopup(!openPopup);
            }}
            ref={submitBtn}
          />
          <Button
            label="Unselect"
            severity="danger"
            size="small"
            onClick={() => {
              handleCloseClick();
            }}
            ref={submitBtn}
          />
        </div>
      </div>
    </div>
  );
};

export default AdjustmentStockPopup;