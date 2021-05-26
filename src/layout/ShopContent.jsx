import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router";
import ProductDetailsBody from "../components/mobile/mobileProductDetail";
import OrderConfirm from "../components/mobile/orderConfirm";
import UserOrders from "../components/mobile/userOrders";
import { routes } from "./mobile/routes";
import axios from "axios";
import Modal from "../components/Modal";
import MobileLoginForm from "../components/mobile/mobileLoginForm";
import MobileRegisterForm from "../components/mobile/mobileRegisterForm";
import OrderForm from "../components/mobile/orderForm";

const ShopContent = () => {
  const dispatch = useDispatch();
  const productName = useSelector((state) => state.productName);
  const selectedMobileItem = useSelector((state) => state.mobileProductSelect);
  const showOrderForm = useSelector((state) => state.showOrderForm);
  const orderProduct = useSelector((state) => state.orderProduct);
  const showMobileLogin = useSelector((state) => state.showMobileLogin);
  const mobileShowSignUp = useSelector((state) => state.mobileShowSignUp);
  const auth = useSelector((state) => state.auth);
  const [referralCode, setReferralCode] = useState("");
  const location = useLocation();

  const token = localStorage.getItem("resellerToken") ?? null;
  const refLink = new URLSearchParams(location.search);
  const refCode = refLink?.get("refCode");

  const init = useRef({ dispatch, auth, refCode });

  useEffect(() => {
    const { dispatch, auth, refCode } = init.current;
    setReferralCode(refCode || null);

    !auth &&
      !token &&
      refCode &&
      dispatch({
        type: "toggleMobileSignUp",
      });

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
    <Fragment>
      {showOrderForm ? (
        <OrderForm item={orderProduct} />
      ) : (
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
              path={`/${productName
                ?.replace("(", " ")
                .replace(")", " ")
                .toLowerCase()}`}
              render={(props) => (
                <ProductDetailsBody {...props} item={selectedMobileItem} />
              )}
            />
          )}
          <Route path="/myorders" component={UserOrders} />
          <Route path="/confirmorder/:sku" component={OrderConfirm} />
          <Redirect from="/" to="/home" />
        </Switch>
      )}
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
        <MobileRegisterForm refCode={referralCode} />
      </Modal>
    </Fragment>
  );
};

export default ShopContent;
