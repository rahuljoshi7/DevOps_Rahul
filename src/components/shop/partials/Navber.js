import React, { Fragment, useContext, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import "./style.css";
import { logout } from "./Action";
import { LayoutContext } from "../index";
import { isAdmin } from "../auth/fetchApi";

const Navber = () => {
  const history = useHistory();
  const location = useLocation();
  const { data, dispatch } = useContext(LayoutContext);
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartModalOpen = () => dispatch({ type: "cartModalToggle", payload: !data.cartModal });
  const loginModalOpen = () => dispatch({ type: "loginSignupModalToggle", payload: !data.loginSignupModal });

  const navLinks = [
    { label: "Shop", path: "/" },
    { label: "Blog", path: "/blog" },
    { label: "Contact", path: "/contact" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <Fragment>
      <nav className="fixed top-0 w-full z-20 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <div onClick={() => history.push("/")} className="cursor-pointer flex items-center space-x-2">
            <span className="text-xl font-extrabold tracking-widest uppercase text-gray-900">BF-Fabric</span>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map(link => (
              <button key={link.path} onClick={() => history.push(link.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}>
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-1">
            {/* Wishlist */}
            <button onClick={() => history.push("/wish-list")} title="Wishlist"
              className={`p-2 rounded-lg transition-all ${location.pathname === "/wish-list" ? "bg-gray-900 text-white" : "text-gray-600 hover:bg-gray-100"}`}>
              <svg className="w-5 h-5" fill={location.pathname === "/wish-list" ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* User */}
            {localStorage.getItem("jwt") ? (
              <div className="relative group">
                <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 hidden group-hover:block z-50">
                  {!isAdmin() ? (
                    <>
                      {[
                        { label: "My Orders", path: "/user/orders" },
                        { label: "My Profile", path: "/user/profile" },
                        { label: "Wishlist", path: "/wish-list" },
                        { label: "Settings", path: "/user/setting" },
                      ].map(item => (
                        <button key={item.path} onClick={() => history.push(item.path)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          {item.label}
                        </button>
                      ))}
                      <hr className="my-1 border-gray-100" />
                      <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">Logout</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => history.push("/admin/dashboard")}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Admin Panel</button>
                      <hr className="my-1 border-gray-100" />
                      <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50">Logout</button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <button onClick={loginModalOpen} title="Sign In"
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </button>
            )}

            {/* Cart */}
            <button onClick={cartModalOpen} title="Cart"
              className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {data.cartProduct && data.cartProduct.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {data.cartProduct.length}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <button key={link.path} onClick={() => { history.push(link.path); setMobileOpen(false); }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path) ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"
                }`}>
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </Fragment>
  );
};

export default Navber;
