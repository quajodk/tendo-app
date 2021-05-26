import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ScreenWrapper from "../../../components/ScreenWrapper";
import ProductListing from "../ProductListing";

const HomeTab = () => {
  const dispatch = useDispatch();
  const mobileProducts = useSelector((state) => state.orginalMobileProducts);
  const search = (text) => {
    if (mobileProducts.length !== 0) {
      const filteredProduct = mobileProducts.filter(
        (x) =>
          x.glideStatus === "TRUE" &&
          (x?.product?.toLowerCase().includes(text.toLowerCase()) ||
            x?.skUs?.toLowerCase().includes(text.toLowerCase()))
      );

      dispatch({
        type: "updateMobileProducts",
        payload: filteredProduct,
      });
    } else {
      dispatch({
        type: "updateMobileProducts",
        payload: mobileProducts,
      });
    }
  };

  return (
    <ScreenWrapper title="Home" searchFunction={search}>
      <ProductListing />
    </ScreenWrapper>
  );
};

export default HomeTab;
