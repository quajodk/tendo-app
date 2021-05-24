import React from "react";
import { useSelector } from "react-redux";
import { ProductCard } from "../../layout/mobile/ProductListing";

const CategoryProductsScreen = () => {
  const mobileSelectedCategory = useSelector(
    (state) => state.mobileSelectedCategory
  );

  return (
    <>
      <div className="w-screen">
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
