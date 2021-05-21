import React from "react";
import { useSelector } from "react-redux";
import ProductDetailsBody from "../../../components/mobile/mobileProductDetail";
import ProductListing from "../ProductListing";

const HomeTab = () => {
  const selectedMobileItem = useSelector((state) => state.mobileProductSelect);
  return (
    <div className="flex-1">
      {selectedMobileItem ? (
        <ProductDetailsBody item={selectedMobileItem} />
      ) : (
        <ProductListing />
      )}
    </div>
  );
};

export default HomeTab;
