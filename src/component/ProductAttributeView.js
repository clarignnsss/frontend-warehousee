import React, { useState, useContext, useEffect } from "react";
import { ProductAttributeContext } from "../context/ProductAttributeContext.js";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";
import { RiAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { TitleContext } from "../context/TitleContext.js";
import ProductAttributePopup from "./ProductAttributePopup.js";

const ProductAttributeView = () => {
  useEffect(() => {
    setTitle("Product");
  });
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const { setTitle } = useContext(TitleContext);
  const { productattr } = useContext(ProductAttributeContext);
  const [filter, setFilter] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  return (
    <div className="px-4 py-4">
      {open && (
        <ProductAttributePopup data={selected} setOpen={setOpen} open={open} />
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
        <Link to="/home/addproductattr">
          <button
            type="button"
            className="text-[#2C4856] bg-[#ffff] hover:bg-[#d7d6d6] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <RiAddFill className="h-6 w-6" />
          </button>
        </Link>
      </div>

      <DataTable
        value={productattr}
        filters={filter}
        className="mt-5"
        sortMode="multiple"
        paginator
        rows={5}
        totalRecords={productattr.length}
        removableSort
        selectionMode="single"
        dataKey="idproductAttribute"
        selection={selected}
        onSelectionChange={(e) => {
          setSelected(e.value);
        }}
        onDoubleClick={() => setOpen(!open)}
      >
        <Column
          field="document_number"
          header="Produt Attribute Number"
          sortable
        ></Column>
        <Column field="code" header="Code" sortable></Column>
        <Column field="product" header="Product" sortable></Column>
        <Column
          field="attributeValue"
          header="Attribute Value"
          sortable
        ></Column>
        <Column field="created_at" header="Created At" sortable></Column>
        <Column field="created_by" header="Created By" sortable></Column>
        <Column field="modified_at" header="Modified At" sortable></Column>
        <Column field="modified_by" header="Modified By" sortable></Column>
      </DataTable>
    </div>
  );
};

export default ProductAttributeView;