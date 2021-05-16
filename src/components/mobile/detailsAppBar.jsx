import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import { useDispatch } from "react-redux";

const ProductAppBar = ({ title }) => {
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch({
      type: "selectMobileProduct",
      payload: null,
    });
  };
  return (
    <>
      <div
        className="bg-black z-20"
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
            {title}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAppBar;
