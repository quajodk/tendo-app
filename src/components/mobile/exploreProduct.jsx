import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsBody from "./mobileProductDetail";

const ExploreProduct = () => {
  const dispatch = useDispatch();
  const productName = useSelector((state) => state.productName);
  const exploreProductSelected = useSelector(
    (state) => state.exploreProductSelected
  );

  const goBack = () => {
    dispatch({
      type: "selectExploreProduct",
      payload: null,
    });
  };
  return (
    <>
      <div className="h-screen overflow-x-auto">
        <div
          className="bg-black z-20 px-0 mx-0"
          style={{
            position: "absolute",
            pointerEvents: "auto",
            left: "env(safe-area-inset-left)",
            right: "env(safe-area-inset-right)",
            top: "env(safe-area-inset-top)",
          }}
        >
          <div
            className=""
            style={{
              color: "rgb(33, 150, 243)",
              height: 44,
              flexShrink: 0,
              display: "flex",
              position: "relative",
              alignItems: "center",
            }}
          >
            <div
              className="flex content-center justify-center text-blue-500 text-base cursor-pointer"
              onClick={goBack}
            >
              <HiChevronLeft size={24} /> Back
            </div>
            <div
              className="mx-4"
              style={{
                flexGrow: 1,
                textAlign: "center",
                fontWeight: 500,
                fontSize: 16,
                lineHeight: 19,
                color: "rgb(255, 255, 255)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                opacity: 1,
                transition: "opacity 0.2s ease 0s",
              }}
            >
              {productName}
            </div>
          </div>
        </div>
        <div className="my-12">
          <ProductDetailsBody item={exploreProductSelected} />
        </div>
      </div>
    </>
  );
};

export default ExploreProduct;
