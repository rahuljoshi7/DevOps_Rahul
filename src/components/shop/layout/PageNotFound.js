import React from "react";
import { useHistory } from "react-router-dom";
import Layout from "./index";

const PageNotFoundComponent = () => {
  const history = useHistory();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4" style={{ marginTop: "-64px" }}>
      <div className="text-center">
        <div className="text-9xl font-extrabold text-gray-200 select-none">404</div>
        <div className="text-3xl font-bold text-gray-800 mt-2">Page Not Found</div>
        <p className="text-gray-500 mt-3 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => history.push("/")}
            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-700 transition"
          >
            Go to Homepage
          </button>
          <button
            onClick={() => history.goBack()}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

const PageNotFound = () => <Layout children={<PageNotFoundComponent />} />;

export default PageNotFound;
