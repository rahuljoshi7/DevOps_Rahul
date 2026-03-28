import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

const Footer = () => {
  const history = useHistory();
  return (
    <Fragment>
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-white text-xl font-extrabold tracking-widest uppercase mb-3">BF-Fabric</h3>
            <p className="text-sm leading-relaxed">Premium quality fabrics and clothing for every occasion. Crafted with care, delivered with love.</p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "All Products", path: "/" },
                { label: "Men's Collection", path: "/" },
                { label: "Women's Collection", path: "/" },
                { label: "Kids", path: "/" },
                { label: "Fabric Rolls", path: "/" },
              ].map(item => (
                <li key={item.label}>
                  <button onClick={() => history.push(item.path)}
                    className="hover:text-white transition-colors text-left">{item.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Blog", path: "/blog" },
                { label: "Contact Us", path: "/contact" },
                { label: "My Account", path: "/user/profile" },
                { label: "My Orders", path: "/user/orders" },
                { label: "Wishlist", path: "/wish-list" },
              ].map(item => (
                <li key={item.label}>
                  <button onClick={() => history.push(item.path)}
                    className="hover:text-white transition-colors text-left">{item.label}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2"><span>📍</span><span>123 Fabric Lane, Mumbai, India</span></li>
              <li className="flex items-start space-x-2"><span>📞</span><span>+91 98765 43210</span></li>
              <li className="flex items-start space-x-2"><span>✉️</span><span>support@bffabric.com</span></li>
              <li className="flex items-start space-x-2"><span>🕐</span><span>Mon–Sat: 9AM – 6PM IST</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-600">
            <span>© {moment().format("YYYY")} BF-Fabric. All rights reserved.</span>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
              <span className="hover:text-gray-400 cursor-pointer">Refund Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
