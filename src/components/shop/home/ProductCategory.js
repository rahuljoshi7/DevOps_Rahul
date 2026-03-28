import React, { Fragment, useContext } from "react";
import ProductCategoryDropdown from "./ProductCategoryDropdown";
import { HomeContext } from "./index";

const ProductCategory = () => {
  const { data, dispatch } = useContext(HomeContext);

  const toggle = (type) => {
    const isOpen = data[type];
    dispatch({ type: "categoryListDropdown", payload: false });
    dispatch({ type: "filterListDropdown", payload: false });
    dispatch({ type: "searchDropdown", payload: false });
    if (!isOpen) dispatch({ type, payload: true });
  };

  const buttons = [
    {
      key: "categoryListDropdown",
      label: "Categories",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
    },
    {
      key: "filterListDropdown",
      label: "Filter",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4-2A1 1 0 018 17v-3.586L3.293 6.707A1 1 0 013 6V4z" />
        </svg>
      ),
    },
    {
      key: "searchDropdown",
      label: "Search",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">All Products</h2>
        <div className="flex items-center space-x-2">
          {buttons.map(btn => (
            <button key={btn.key} onClick={() => toggle(btn.key)}
              className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                data[btn.key]
                  ? "bg-gray-900 text-white border-gray-900 shadow"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900"
              }`}>
              {btn.icon}
              <span>{btn.label}</span>
            </button>
          ))}
        </div>
      </div>
      <ProductCategoryDropdown />
    </Fragment>
  );
};

export default ProductCategory;
