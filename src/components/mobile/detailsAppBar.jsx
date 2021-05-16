import React from "react";
import { HiChevronLeft } from "react-icons/hi";

const ProductAppBar = ({ title }) => {
  return (
    <>
      <div
        className=""
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
          <div className="flex content-center justify-center text-blue-500 text-sm">
            <HiChevronLeft size={24} /> Back
          </div>
          <div
            className=""
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
