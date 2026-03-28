import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAllProduct } from "../../admin/products/FetchApi";
import { HomeContext } from "./index";
import { isWishReq, unWishReq, isWish } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

/* ── Toast ─────────────────────────────────────────────────────────────────── */
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = {
    success: "bg-green-600",
    error:   "bg-red-600",
    info:    "bg-gray-800",
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-5 py-3 rounded-xl shadow-lg text-white text-sm font-medium animate-fadeIn ${colors[type] || colors.info}`}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  );
};

/* ── Skeleton Card ──────────────────────────────────────────────────────────── */
const SkeletonCard = () => (
  <div className="col-span-1 m-2 animate-pulse">
    <div className="w-full h-56 md:h-64 bg-gray-200 rounded-lg" />
    <div className="mt-3 h-4 bg-gray-200 rounded w-3/4" />
    <div className="mt-2 h-4 bg-gray-200 rounded w-1/3" />
  </div>
);

/* ── Sort Bar ───────────────────────────────────────────────────────────────── */
const SortBar = ({ total, filtered }) => {
  const { data, dispatch } = useContext(HomeContext);

  return (
    <div className="flex items-center justify-between mb-4 px-1">
      <span className="text-sm text-gray-500">
        Showing <span className="font-semibold text-gray-800">{filtered}</span> of <span className="font-semibold text-gray-800">{total}</span> products
      </span>
      <select
        value={data.sort}
        onChange={e => dispatch({ type: "setSort", payload: e.target.value })}
        className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white"
      >
        <option value="default">Sort: Default</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="newest">Newest First</option>
        <option value="name_asc">Name: A–Z</option>
      </select>
    </div>
  );
};

/* ── Pagination ─────────────────────────────────────────────────────────────── */
const Pagination = ({ total, perPage, page, onPage }) => {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  return (
    <div className="col-span-2 md:col-span-3 lg:col-span-4 flex justify-center items-center space-x-2 py-8">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-30 hover:bg-gray-100 transition"
      >← Prev</button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
        <button
          key={p}
          onClick={() => onPage(p)}
          className={`px-3 py-1.5 rounded-lg border text-sm transition ${p === page ? "bg-gray-900 text-white border-gray-900" : "hover:bg-gray-100"}`}
        >{p}</button>
      ))}

      <button
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        className="px-3 py-1.5 rounded-lg border text-sm disabled:opacity-30 hover:bg-gray-100 transition"
      >Next →</button>
    </div>
  );
};

/* ── Single Product Card ────────────────────────────────────────────────────── */
const ProductCard = ({ item, wList, setWlist, showToast }) => {
  const history = useHistory();
  const inStock = item.pQuantity > 0;

  return (
    <div className="relative col-span-1 m-2 flex flex-col group">
      {/* Stock Badge */}
      <div className="relative w-full h-56 md:h-64 overflow-hidden bg-gray-100 rounded-lg">
        <img
          loading="lazy"
          onClick={() => history.push(`/products/${item._id}`)}
          className="w-full h-full object-cover object-center cursor-pointer group-hover:scale-105 transition-transform duration-300"
          src={`${apiURL}/uploads/products/${item.pImages[0]}`}
          alt={item.pName}
        />
        {/* In Stock / Out of Stock badge */}
        <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-full ${inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
          {inStock ? "In Stock" : "Out of Stock"}
        </span>
        {/* Offer badge */}
        {item.pOffer && item.pOffer !== "0" && (
          <span className="absolute top-2 right-8 text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-400 text-yellow-900">
            {item.pOffer}% OFF
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex items-center justify-between mt-2">
        <div className="text-gray-700 font-medium truncate text-sm">{item.pName}</div>
        <div className="flex items-center space-x-1 text-xs text-gray-500">
          <svg className="w-3.5 h-3.5 fill-current text-yellow-500" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{item.pRatingsReviews.length}</span>
        </div>
      </div>
      <div className="text-gray-900 font-semibold text-sm mt-0.5">₹{item.pPrice}.00</div>

      {/* Wishlist */}
      <div className="absolute top-3 right-2">
        <svg
          onClick={e => { isWishReq(e, item._id, setWlist); showToast("Added to wishlist", "success"); }}
          className={`${isWish(item._id, wList) && "hidden"} w-5 h-5 cursor-pointer text-white drop-shadow hover:text-yellow-400 transition`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <svg
          onClick={e => { unWishReq(e, item._id, setWlist); showToast("Removed from wishlist", "info"); }}
          className={`${!isWish(item._id, wList) && "hidden"} w-5 h-5 cursor-pointer text-yellow-400 drop-shadow transition`}
          fill="currentColor" viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

/* ── Main Component ─────────────────────────────────────────────────────────── */
const SingleProduct = () => {
  const { data, dispatch } = useContext(HomeContext);
  const [wList, setWlist] = useState(JSON.parse(localStorage.getItem("wishList")));
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let res = await getAllProduct();
      setTimeout(() => {
        if (res && res.Products) {
          dispatch({ type: "setProducts", payload: res.Products });
          dispatch({ type: "setAllProducts", payload: res.Products });
          dispatch({ type: "loading", payload: false });
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  const showToast = (message, type = "info") => setToast({ message, type });

  if (data.loading) {
    return (
      <Fragment>
        {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
      </Fragment>
    );
  }

  if (!data.products || data.products.length === 0) {
    return (
      <div className="col-span-2 md:col-span-3 lg:col-span-4 flex flex-col items-center justify-center py-24 text-gray-400">
        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-xl font-medium">No products found</span>
      </div>
    );
  }

  // Sort
  let sorted = [...data.products];
  if (data.sort === "price_asc")  sorted.sort((a, b) => a.pPrice - b.pPrice);
  if (data.sort === "price_desc") sorted.sort((a, b) => b.pPrice - a.pPrice);
  if (data.sort === "newest")     sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (data.sort === "name_asc")   sorted.sort((a, b) => a.pName.localeCompare(b.pName));

  // Paginate
  const perPage = data.perPage || 8;
  const page    = data.page    || 1;
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  return (
    <Fragment>
      {/* Sort bar spans full grid */}
      <div className="col-span-2 md:col-span-3 lg:col-span-4">
        <SortBar total={data.products.length} filtered={sorted.length} />
      </div>

      {paginated.map((item, index) => (
        <ProductCard key={index} item={item} wList={wList} setWlist={setWlist} showToast={showToast} />
      ))}

      <Pagination
        total={sorted.length}
        perPage={perPage}
        page={page}
        onPage={p => dispatch({ type: "setPage", payload: p })}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </Fragment>
  );
};

export default SingleProduct;
