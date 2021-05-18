import React from "react";
import { HiChevronLeft } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard } from "../../layout/mobile/ProductListing";

const CategoryProductsScreen = () => {
  const mobileSelectedCategory = useSelector(
    (state) => state.mobileSelectedCategory
  );
  const categoryName = useSelector((state) => state.categoryName);
  const dispatch = useDispatch();

  const goBack = () => {
    dispatch({
      type: "categorySelectedPop",
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
              <HiChevronLeft size={24} />
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
              {categoryName}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 my-8">
          {mobileSelectedCategory.map((item) =>
            item.glideStatus === "TRUE" ? (
              <ProductCard item={item} key={item.id} />
            ) : null
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryProductsScreen;
