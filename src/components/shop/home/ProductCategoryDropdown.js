import React, { Fragment, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HomeContext } from "./index";
import { getAllCategory } from "../../admin/categories/FetchApi";
import { getAllProduct, productByPrice } from "../../admin/products/FetchApi";
import "./style.css";

const apiURL = process.env.REACT_APP_API_URL;

const CategoryList = () => {
  const history = useHistory();
  const { data } = useContext(HomeContext);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategory().then(res => {
      if (res && res.Categories) setCategories(res.Categories);
    }).catch(console.log);
  }, []);

  if (!data.categoryListDropdown) return null;

  return (
    <div className="mt-4 animate-fadeIn">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categories.length > 0 ? categories.map((item, i) => (
          <div key={i} onClick={() => history.push(`/products/category/${item._id}`)}
            className="group flex flex-col items-center bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer hover:border-gray-900 hover:shadow-md transition-all">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mb-3 flex items-center justify-center">
              <img src={`${apiURL}/uploads/categories/${item.cImage}`} alt={item.cName}
                className="w-full h-full object-cover" onError={e => { e.target.style.display = "none"; }} />
            </div>
            <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{item.cName}</span>
          </div>
        )) : (
          <div className="col-span-4 text-center py-8 text-gray-400 text-sm">No categories found</div>
        )}
      </div>
    </div>
  );
};

const FilterList = () => {
  const { data, dispatch } = useContext(HomeContext);
  const [range, setRange] = useState(0);

  const rangeHandle = async (e) => {
    const val = e.target.value;
    setRange(val);
    if (val === "0") {
      const res = await getAllProduct();
      if (res && res.Products) dispatch({ type: "setProducts", payload: res.Products });
    } else {
      dispatch({ type: "loading", payload: true });
      setTimeout(async () => {
        const res = await productByPrice(val);
        if (res && res.Products) {
          dispatch({ type: "setProducts", payload: res.Products });
          dispatch({ type: "loading", payload: false });
        }
      }, 400);
    }
  };

  const reset = async () => {
    setRange(0);
    dispatch({ type: "filterListDropdown", payload: false });
    const res = await getAllProduct();
    if (res && res.Products) dispatch({ type: "setProducts", payload: res.Products });
  };

  if (!data.filterListDropdown) return null;

  return (
    <div className="mt-4 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Filter by Price</h3>
        <button onClick={reset} className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center space-x-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Reset</span>
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between text-xs text-gray-500">
          <span>₹0</span>
          <span className="font-bold text-gray-900 text-sm">Up to ₹{Number(range).toLocaleString()}</span>
          <span>₹10,000</span>
        </div>
        <input type="range" min="0" max="10000" step="100" value={range}
          onChange={rangeHandle}
          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-gray-900" />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{range === "0" ? "Showing all products" : `Showing products under ₹${Number(range).toLocaleString()}`}</span>
        </div>
      </div>
    </div>
  );
};

const Search = () => {
  const { data, dispatch } = useContext(HomeContext);
  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getAllProduct().then(res => {
      if (res && res.Products) setAllProducts(res.Products);
    }).catch(console.log);
  }, []);

  const searchHandle = (e) => {
    const val = e.target.value;
    setSearch(val);
    dispatch({ type: "searchHandleInReducer", payload: val, productArray: allProducts });
  };

  const close = () => {
    setSearch("");
    dispatch({ type: "searchDropdown", payload: false });
    dispatch({ type: "setProducts", payload: allProducts });
  };

  if (!data.searchDropdown) return null;

  return (
    <div className="mt-4 animate-fadeIn">
      <div className="relative">
        <svg className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input value={search} onChange={searchHandle} autoFocus
          className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400 shadow-sm transition-all"
          type="text" placeholder="Search products by name..." />
        {search && (
          <button onClick={close} className="absolute right-4 top-3 text-gray-400 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      {search && (
        <p className="text-xs text-gray-400 mt-2 px-1">
          Searching for "<span className="font-semibold text-gray-600">{search}</span>"
        </p>
      )}
    </div>
  );
};

const ProductCategoryDropdown = () => (
  <Fragment>
    <CategoryList />
    <FilterList />
    <Search />
  </Fragment>
);

export default ProductCategoryDropdown;
