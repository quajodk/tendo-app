import React from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import BottomTabNavigation from "../../components/mobile/BottomTabNavigation";
import Header from "../../components/mobile/Header";
import ProductDetailsBody from "../../components/mobile/mobileProductDetail";
import CategoryProductsScreen from "../../components/mobile/mobileProductDetail";

import { routes } from "./routes";
const MobileLayer = () => {
  const { path } = useRouteMatch();
  const productName = useSelector((state) => state.productName);
  const selectedMobileItem = useSelector((state) => state.mobileProductSelect);
  const categoryName = useSelector((state) => state.categoryName);
  return (
    <div className="flex h-screen flex-1  flex-col">
      {/* Handle when a product is selected */}
      <div className="h-screen flex-1 flex flex-col">
        {/* Header Goes here */}
        <Header />
        {/* Body Goes here */}
        <div className="flex-1 overflow-y-scroll bg-tendo-bg">
          <Switch>
            {routes.map((screen, screenID) => (
              <Route
                key={screenID}
                path={`/${screen.title?.toLowerCase()}`}
                component={screen.component ?? null}
                exact={screen.exact}
              />
            ))}
            {selectedMobileItem && (
              <Route
                path={`/${productName?.toLowerCase()}`}
                render={(props) => (
                  <ProductDetailsBody {...props} item={selectedMobileItem} />
                )}
              />
            )}
            <Redirect from="/" to="/home" />
          </Switch>
        </div>
      </div>

      {/* Bottom Tab navigator */}
      <BottomTabNavigation />
    </div>
  );
};

export default MobileLayer;
