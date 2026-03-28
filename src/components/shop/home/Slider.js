import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "../../admin/dashboardAdmin/Action";
import { prevSlide, nextSlide } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const HeroBanner = () => {
  const history = useHistory();
  return (
    <div className="relative mt-16 bg-gray-900 overflow-hidden" style={{ minHeight: "420px" }}>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900 opacity-90" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6 py-24">
        <span className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-3">New Collection 2026</span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          Style That <span className="text-yellow-400">Speaks</span>
        </h1>
        <p className="text-gray-300 text-lg mb-8 max-w-xl">
          Discover premium clothing — shirts, dresses, pants, shoes and more. Quality you can feel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => { const el = document.getElementById("shop"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}
            className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold rounded-xl transition"
          >
            Shop Now
          </button>
          <button
            onClick={() => history.push("/")}
            className="px-8 py-3 border border-white text-white hover:bg-white hover:text-gray-900 font-bold rounded-xl transition"
          >
            View Categories
          </button>
        </div>
      </div>
    </div>
  );
};

const Slider = () => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    sliderImages(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-slide every 4s
  useEffect(() => {
    if (!data.sliderImages.length) return;
    const t = setInterval(() => nextSlide(data.sliderImages.length, slide, setSlide), 4000);
    return () => clearInterval(t);
  }, [data.sliderImages.length, slide]);

  return (
    <Fragment>
      {data.sliderImages.length > 0 ? (
        <div className="relative mt-16 bg-gray-100 overflow-hidden">
          <img
            className="w-full object-cover"
            style={{ maxHeight: "500px" }}
            src={`${apiURL}/uploads/customize/${data.sliderImages[slide].slideImage}`}
            alt="slider"
          />
          {/* Dots */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {data.sliderImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === slide ? "bg-white scale-125" : "bg-white opacity-50"}`}
              />
            ))}
          </div>
          {/* Arrows */}
          <svg onClick={() => prevSlide(data.sliderImages.length, slide, setSlide)}
            className="z-10 absolute top-1/2 left-3 -translate-y-1/2 w-10 h-10 text-white bg-black bg-opacity-30 rounded-full p-2 cursor-pointer hover:bg-opacity-60 transition"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <svg onClick={() => nextSlide(data.sliderImages.length, slide, setSlide)}
            className="z-10 absolute top-1/2 right-3 -translate-y-1/2 w-10 h-10 text-white bg-black bg-opacity-30 rounded-full p-2 cursor-pointer hover:bg-opacity-60 transition"
            fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          {/* Shop Now overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <a href="#shop" style={{ background: "#303031" }}
              className="cursor-pointer text-xl text-white px-6 py-2 rounded-xl font-semibold hover:bg-yellow-700 transition">
              Shop Now
            </a>
          </div>
        </div>
      ) : (
        <HeroBanner />
      )}
      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
