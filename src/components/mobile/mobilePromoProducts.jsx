import React from "react";
import { useSelector } from "react-redux";
import { ProductCard } from "../../layout/mobile/ProductListing";
import { ReactComponent as NoProduct } from "../../assets/no-product.svg";

const MobilePromoProducts = () => {
  const { promoProducts } = useSelector((state) => state);

  return (
    <div className="w-screen">
      {promoProducts.length !== 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 my-8">
          {promoProducts.map((item) =>
            item.glideStatus === "TRUE" ? (
              <ProductCard item={item} key={item.id} />
            ) : null
          )}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <NoProduct className="w-80 h-80" />
          <span className="text-center text-xl text-white font-semibold">
            No product(s) found
          </span>
        </div>
      )}
    </div>
  );
};

export default MobilePromoProducts;
