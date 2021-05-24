import React from "react";
import { useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import CategoryProductsScreen from "../../../components/mobile/categoriesProducts";
import MobileCategories from "../MobileCategories";

const CategoryTab = () => {
  const mobileSelectedCategory = useSelector(
    (state) => state.mobileSelectedCategory
  );

  const { path } = useRouteMatch();
  console.log(path);
  return (
    <div className="flex-1">
      {mobileSelectedCategory.length ? (
        <CategoryProductsScreen />
      ) : (
        <MobileCategories />
      )}
    </div>
  );
};

export default CategoryTab;
