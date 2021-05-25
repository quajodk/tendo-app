import React, { useEffect, useRef } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import BottomTabNavigation from "../../components/mobile/BottomTabNavigation";
import Header from "../../components/mobile/Header";
import ProductDetailsBody from "../../components/mobile/mobileProductDetail";

import { routes } from "./routes";
import OrderForm from "../../components/mobile/orderForm";
import OrderConfirm from "../../components/mobile/orderConfirm";
import Modal from "../../components/Modal";
import MobileLoginForm from "../../components/mobile/mobileLoginForm";
import MobileRegisterForm from "../../components/mobile/mobileRegisterForm";
import UserOrders from "../../components/mobile/userOrders";

const MobileLayer = () => {
  const dispatch = useDispatch();
  const productName = useSelector((state) => state.productName);
  const selectedMobileItem = useSelector((state) => state.mobileProductSelect);
  const showOrderForm = useSelector((state) => state.showOrderForm);
  const orderProduct = useSelector((state) => state.orderProduct);
  const showMobileLogin = useSelector((state) => state.showMobileLogin);
  const mobileShowSignUp = useSelector((state) => state.mobileShowSignUp);
  const init = useRef({ dispatch });

  const token = localStorage.getItem("resellerToken") ?? null;

  useEffect(() => {
    const { dispatch } = init.current;

    token &&
      axios({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer TEST_TOKEN",
        },
        url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/productCatalogueGhana/users?filter[token]=${token}`,
      })
        .then(({ data }) => {
          console.log(data, "user");
          if (data?.users.length === 1) {
            dispatch({
              type: "authenticateUser",
              payload: data?.users[0],
            });
          }
        })
        .catch((e) => {
          console.log(e);
        });
  }, [token]);

  return (
    <>
      <div className="flex h-screen flex-1  flex-col font-poppins">
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
                  <Route path="/myorders" component={UserOrders} />
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
      <Modal
        show={showMobileLogin}
        // canClose={!loading}
        setShow={() =>
          dispatch({
            type: "toggleMobileLogin",
          })
        }
        size={100}
      >
        <MobileLoginForm />
      </Modal>
      <Modal
        show={mobileShowSignUp}
        // canClose={!loading}
        setShow={() =>
          dispatch({
            type: "toggleMobileSignUp",
          })
        }
        size={100}
      >
        <MobileRegisterForm />
      </Modal>
    </>
  );
};

export default MobileLayer;
