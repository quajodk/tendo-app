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
  const categories = useSelector((state) => state.originalMobileCategories);
  const categorySelected = useSelector((state) => state.categorySelected);
  const categoryName = useSelector((state) => state.categoryName);
  const originalMobileSelectedCategory = useSelector(
    (state) => state.originalMobileSelectedCategory
  );
  const goBackHandler = () => {
    dispatch({
      type: "categorySelectedPop",
    });
  };

  const search = (text) => {
    if (categories.length !== 0) {
      const filteredProduct = categories.filter((x) =>
        x?.categories?.toLowerCase().includes(text.toLowerCase())
      );

      dispatch({
        type: "updateMobileCategories",
        payload: filteredProduct,
      });
    } else {
      dispatch({
        type: "updateMobileCategories",
        payload: categories,
      });
    }
  };

  const productSearch = (text) => {
    if (mobileSelectedCategory.length !== 0) {
      const filteredProduct = originalMobileSelectedCategory.filter(
        (x) =>
          x.glideStatus === "TRUE" &&
          (x?.product?.toLowerCase().includes(text.toLowerCase()) ||
            x?.skUs?.toLowerCase().includes(text.toLowerCase()))
      );

      dispatch({
        type: "updateSelectedMobileCategory",
        payload: filteredProduct,
      });
    } else {
      dispatch({
        type: "updateSelectedMobileCategory",
        payload: originalMobileSelectedCategory,
      });
    }
  };

  return (
    <ScreenWrapper
      title={categorySelected ? categoryName : "Categories"}
      showBackBtn={categorySelected}
      backFunction={goBackHandler}
      searchFunction={mobileSelectedCategory.length ? productSearch : search}
    >
      <div className="overflow-y-scroll mb-24">
        {categorySelected ? <CategoryProductsScreen /> : <MobileCategories />}
      </div>
    </ScreenWrapper>
  );
};

export default CategoryTab;
