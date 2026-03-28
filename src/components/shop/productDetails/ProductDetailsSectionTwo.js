import React, { Fragment, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AllReviews from "./AllReviews";
import ReviewForm from "./ReviewForm";
import { ProductDetailsContext } from "./";
import { LayoutContext } from "../layout";
import { isAuthenticate } from "../auth/fetchApi";
import { getAllProduct } from "../../admin/products/FetchApi";
import "./style.css";

const apiURL = process.env.REACT_APP_API_URL;

const Menu = () => {
  const { data, dispatch } = useContext(ProductDetailsContext);
  const { data: layoutData } = useContext(LayoutContext);

  return (
    <Fragment>
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div
          onClick={(e) => dispatch({ type: "menu", payload: true })}
          className={`${data.menu ? "border-b-2 border-yellow-700" : ""} px-4 py-3 cursor-pointer`}
        >
          Description
        </div>
        <div
          onClick={(e) => dispatch({ type: "menu", payload: false })}
          className={`${!data.menu ? "border-b-2 border-yellow-700" : ""} px-4 py-3 relative flex cursor-pointer`}
        >
          <span>Reviews</span>
          <span className="absolute text-xs top-0 right-0 mt-2 bg-yellow-700 text-white rounded px-1">
            {layoutData.singleProductDetail.pRatingsReviews.length}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

const RatingReview = () => {
  return (
    <Fragment>
      <AllReviews />
      {isAuthenticate() ? (
        <ReviewForm />
      ) : (
        <div className="mb-12 md:mx-16 lg:mx-20 xl:mx-24 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded mb-4">
          Please login to leave a review
        </div>
      )}
    </Fragment>
  );
};

const RelatedProducts = ({ currentProduct }) => {
  const history = useHistory();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!currentProduct || !currentProduct.pCategory) return;
    getAllProduct().then(res => {
      if (res && res.Products) {
        const filtered = res.Products.filter(
          p => p.pCategory._id === currentProduct.pCategory._id && p._id !== currentProduct._id
        ).slice(0, 4);
        setRelated(filtered);
      }
    }).catch(console.log);
  }, [currentProduct]);

  if (!related.length) return null;

  return (
    <section className="m-4 md:mx-12 md:my-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Related Products</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {related.map((item, i) => (
          <div
            key={i}
            onClick={() => { history.push(`/products/${item._id}`); window.scrollTo(0, 0); }}
            className="cursor-pointer group"
          >
            <div className="w-full h-44 overflow-hidden rounded-lg bg-gray-100">
              <img
                loading="lazy"
                src={`${apiURL}/uploads/products/${item.pImages[0]}`}
                alt={item.pName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2 text-sm font-medium text-gray-700 truncate">{item.pName}</div>
            <div className="text-sm text-gray-900 font-semibold">₹{item.pPrice}.00</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ProductDetailsSectionTwo = (props) => {
  const { data } = useContext(ProductDetailsContext);
  const { data: layoutData } = useContext(LayoutContext);
  const [singleProduct, setSingleproduct] = useState({});

  useEffect(() => {
    setSingleproduct(layoutData.singleProductDetail ? layoutData.singleProductDetail : "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <section className="m-4 md:mx-12 md:my-8">
        <Menu />
        {data.menu ? (
          <div className="mt-6">{singleProduct.pDescription}</div>
        ) : (
          <RatingReview />
        )}
      </section>
      <div className="m-4 md:mx-8 md:my-6 flex justify-center capitalize font-light tracking-widest bg-white border-t border-b text-gray-800 px-4 py-4 space-x-4">
        <div>
          <span>Category :</span>
          <span className="text-sm text-gray-600">
            {" "}
            {singleProduct.pCategory ? singleProduct.pCategory.cName : ""}
          </span>
        </div>
      </div>
      <RelatedProducts currentProduct={singleProduct} />
    </Fragment>
  );
};

export default ProductDetailsSectionTwo;
