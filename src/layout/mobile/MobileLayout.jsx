import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import BottomTabNavigation from "../../components/mobile/BottomTabNavigation";
import Header from "../../components/mobile/Header";
import ProductDetailsBody from "../../components/mobile/mobileProductDetail";

import { routes } from "./routes";
import OrderForm from "../../components/mobile/orderForm";
import OrderConfirm from "../../components/mobile/orderConfirm";
const MobileLayer = () => {
  const productName = useSelector((state) => state.productName);
  const selectedMobileItem = useSelector((state) => state.mobileProductSelect);
  const showOrderForm = useSelector((state) => state.showOrderForm);
  const orderProduct = useSelector((state) => state.orderProduct);
  return (
    <div className="flex h-screen flex-1  flex-col">
      {/* Handle when a product is selected */}
      <div className="h-screen flex-1 flex flex-col">
        {/* Header Goes here */}
        <Header />
        {showOrderForm ? (
          <OrderForm item={orderProduct} />
        ) : (
          <>
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
                      <ProductDetailsBody
                        {...props}
                        item={selectedMobileItem}
                      />
                    )}
                  />
                )}
                <Route path="/confirmorder/:sku" component={OrderConfirm} />
                <Redirect from="/" to="/home" />
              </Switch>
            </div>
          </>
        )}
      </div>

      {/* Bottom Tab navigator */}
      <BottomTabNavigation />
    </div>
  );
};

export default MobileLayer;
