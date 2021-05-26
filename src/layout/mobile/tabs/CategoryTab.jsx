import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import CategoryProductsScreen from "../../../components/mobile/categoriesProducts";
import ScreenWrapper from "../../../components/ScreenWrapper";
import MobileCategories from "../MobileCategories";

const CategoryTab = () => {
  const mobileSelectedCategory = useSelector(
    (state) => state.mobileSelectedCategory
  );

  const { path } = useRouteMatch();
  console.log(path);
  return (
    <ScreenWrapper title="Categories">
      {mobileSelectedCategory.length ? (
        <CategoryProductsScreen />
      ) : (
        <MobileCategories />
      )}
    </ScreenWrapper>
  );
};

export default CategoryTab;
