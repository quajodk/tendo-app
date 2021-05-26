import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router";
import ProductDetailsBody from "../components/mobile/mobileProductDetail";
import OrderConfirm from "../components/mobile/orderConfirm";
import UserOrders from "../components/mobile/userOrders";
import { routes } from "./mobile/routes";
import axios from "axios";
import OrderForm from "../components/mobile/orderForm";
import Modal from "../components/Modal";
import MobileLoginForm from "../components/mobile/mobileLoginForm";
import MobileRegisterForm from "../components/mobile/mobileRegisterForm";

const ShopContent = () => {
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
