import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import CategoryProductsScreen from "../../../components/mobile/categoriesProducts";
import MobileCategories from "../MobileCategories";

const CategoryTab = () => {
  const categoryName = useSelector((state) => state.categoryName);
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

      {/* <Switch>
        <Route
          exact
          path={path}
          render={(props) => <MobileCategories {...props} />}
        />
        <Route
          path={`${path}/${categoryName}`}
          render={(props) => <CategoryProductsScreen {...props} />}
        />
      </Switch> */}
    </div>
  );
};

export default CategoryTab;
