import React, { useEffect, useRef, useState, Fragment, Suspense } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ProductDetailsBody from "../../components/mobile/mobileProductDetail";

import { routes } from "./routes";
import OrderForm from "../../components/mobile/orderForm";
import OrderConfirm from "../../components/mobile/orderConfirm";
import MobileLoginForm from "../../components/mobile/mobileLoginForm";
import MobileRegisterForm from "../../components/mobile/mobileRegisterForm";
import UserOrders from "../../components/mobile/userOrders";
import OrderDetails from "../../components/mobile/orderDetails";
import DeliveryPrices from "../../components/mobile/deliveryPrices";
import Settings from "../../components/Settings";
import NotificationsPage from "../../components/mobile/notification";
import Earning from "../../components/mobile/earnings";
import PaymentRequest from "../../components/mobile/paymentRequest";
import { Dialog, Transition } from "@headlessui/react";
import { request } from "../../utils/utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const PromoTab = React.lazy(() => import("./tabs/PromoTab"));
const CategoryTab = React.lazy(() => import("./tabs/CategoryTab"));
const PromoMobile = React.lazy(() => import("./tabs/PromoMobile"));

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const MobileLayer = () => {
  const dispatch = useDispatch();

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
      dispatch({
        type: "toggleMobileSignUp",
      });

    token &&
      axios({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer VGVuZG8gUmVzZWxsZXIkIDIwMjE=",
        },
        url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoGhanaGlide/ghanaUsers?filter[token]=${token}`,
      })
        .then(({ data }) => {
          if (data?.ghanaUsers.length === 1) {
            dispatch({
              type: "authenticateUser",
              payload: data?.ghanaUsers[0],
            });

            request({
              url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetGhana/newAppOrders?filter[username]=${
                data?.ghanaUsers[0]?.username
              }&filter[orderStatus]=${"PAYOUT READY"}`,
              method: "GET",
            })
              .then((res) => {
                res && console.log("success");
                data.ghanaUsers[0].successfulOrders = res.newAppOrders.length;
                const ghanaUser = data.ghanaUsers[0];
                request({
                  url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoGhanaGlide/ghanaUsers/${data?.ghanaUsers[0]?.id}`,
                  method: "PUT",
                  data: { ghanaUser },
                })
                  .then((resp) => resp && console.log("success"))
                  .catch((e) => console.log(e));
              })
              .catch((e) => console.log(e));
          }
        })
        .catch((e) => {
          console.log(e);
        });
  }, [token]);

  return (
    <>
      <div className="flex h-screen flex-1  flex-col font-poppins overflow-y-scroll bg-tendo-bg">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <Spin indicator={antIcon} />
            </div>
          }
        >
          <Switch>
            {routes.map((screen, screenID) => (
              <Route
                key={screenID}
                path={screen.path}
                component={screen.component ?? null}
                exact={screen.exact}
              />
            ))}
            <Route
              key="order"
              path="/product/order"
              render={(props) => <OrderForm {...props} />}
            />

            <Route
              key="product details"
              path={`/product/:productName`}
              render={(props) => <ProductDetailsBody {...props} />}
            />

            <Route
              key="order details"
              path="/order/:orderNumber"
              render={(props) => <OrderDetails {...props} />}
            />
            <Route
              key="category products"
              path="/categories/:categoryName"
              render={(props) => <CategoryTab {...props} />}
            />

            <Route
              key="delivery list"
              path="/account/delivery"
              component={DeliveryPrices}
            />
            <Route key="wallet" path="/account/wallet" component={Earning} />
            <Route
              key="settings"
              path="/account/settings"
              component={Settings}
            />
            <Route
              key="payment"
              path="/account/payment/:refNumber"
              component={PaymentRequest}
            />
            <Route
              key="notifications"
              path="/account/notification"
              component={NotificationsPage}
            />

            <Route key="user order" path="/myorders" component={UserOrders} />
            <Route
              key="confirm orders"
              path="/confirmorder/:sku"
              component={OrderConfirm}
            />
            <Route key="promo products" path="/promotions/:promoName">
              <PromoTab />
            </Route>
            <Route key="refer a friend" path="/account/referral">
              <PromoMobile />
            </Route>
            <Redirect from="/home" to="/" />
          </Switch>
        </Suspense>
      </div>

      <Transition appear show={showMobileLogin} as={Fragment}>
        <Dialog
          as="div"
          open={showMobileLogin}
          className="fixed inset-0 z-30 overflow-y-auto bg-tendo-bg"
          onClose={() =>
            dispatch({
              type: "toggleMobileLogin",
            })
          }
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl bg-">
                <div className="w-full px-4 py-4">
                  <div className="w-full max-w-md mx-auto">
                    <MobileLoginForm />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={mobileShowSignUp} as={Fragment}>
        <Dialog
          as="div"
          open={mobileShowSignUp}
          className="fixed inset-0 z-30 overflow-y-auto bg-tendo-bg"
          onClose={() =>
            dispatch({
              type: "toggleMobileSignUp",
            })
          }
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="w-full px-4 py-4">
                  <div className="w-full max-w-md mx-auto">
                    <MobileRegisterForm refCode={referralCode} />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default MobileLayer;
