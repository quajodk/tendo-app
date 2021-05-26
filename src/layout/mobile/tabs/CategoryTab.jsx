import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CategoryProductsScreen from "../../../components/mobile/categoriesProducts";
import ScreenWrapper from "../../../components/ScreenWrapper";
import MobileCategories from "../MobileCategories";

const CategoryTab = () => {
  const dispatch = useDispatch();
  const mobileSelectedCategory = useSelector(
    (state) => state.mobileSelectedCategory
  );
  const cateogories = useSelector((state) => state.originalMobileCategories);
  const categoryName = useSelector((state) => state.categoryName);
  const mobileProducts = useSelector((state) => state.orginalMobileProducts);
  const goBackHandler = () => {
    dispatch({
      type: "categorySelectedPop",
    });
  };

  const search = (text) => {
    if (cateogories.length !== 0) {
      const filteredProduct = cateogories.filter((x) =>
        x?.categories?.toLowerCase().includes(text.toLowerCase())
      );

      dispatch({
        type: "updateMobileCategories",
        payload: filteredProduct,
      });
    } else {
      dispatch({
        type: "updateMobileCategories",
        payload: cateogories,
      });
    }
  };

  const productSearch = (text) => {
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
    <ScreenWrapper
      title={mobileSelectedCategory.length ? categoryName : "Categories"}
      showBackBtn={mobileSelectedCategory.length > 0}
      backFunction={goBackHandler}
      searchFunction={mobileSelectedCategory.length ? productSearch : search}
    >
      {mobileSelectedCategory.length ? (
        <CategoryProductsScreen />
      ) : (
        <MobileCategories />
      )}
    </ScreenWrapper>
  );
};

export default CategoryTab;
