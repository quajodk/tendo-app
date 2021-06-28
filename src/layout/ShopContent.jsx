import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router";
import ProductDetailsBody from "../components/mobile/mobileProductDetail";
import OrderConfirm from "../components/mobile/orderConfirm";
import UserOrders from "../components/mobile/userOrders";
import { routes } from "./mobile/routes";
import axios from "axios";
// import Modal from "../components/Modal";
import MobileLoginForm from "../components/mobile/mobileLoginForm";
import MobileRegisterForm from "../components/mobile/mobileRegisterForm";
import OrderForm from "../components/mobile/orderForm";
import OrderDetails from "../components/mobile/orderDetails";
import DeliveryPrices from "../components/mobile/deliveryPrices";
import NotificationsPage from "../components/mobile/notification";
import Settings from "../components/Settings";
import { Dialog, Transition } from "@headlessui/react";

const ShopContent = () => {
  const dispatch = useDispatch();
  const productName = useSelector((state) => state.productName);
  const selectedMobileItem = useSelector((state) => state.mobileProductSelect);
  const showOrderForm = useSelector((state) => state.showOrderForm);
  const orderProduct = useSelector((state) => state.orderProduct);
  const showMobileLogin = useSelector((state) => state.mobileShowLogin);
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
        url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoGhanaGlide/users?filter[token]=${token}`,
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
              path={screen.path}
              component={screen.component ?? null}
              exact={screen.exact}
            />
          ))}
          {selectedMobileItem && (
            <Route
              path={`/${productName
                ?.replace("(", " ")
                .replace(")", " ")
                .replace("/", " ")
                .toLowerCase()}`}
              render={(props) => (
                <ProductDetailsBody {...props} item={selectedMobileItem} />
              )}
            />
          )}
          <Route
            path="/order/:orderNumber"
            render={(props) => <OrderDetails {...props} />}
          />
          <Route path="/account/delivery" component={DeliveryPrices} />
          <Route path="/account/settings" component={Settings} />
          <Route path="/account/notification" component={NotificationsPage} />
          <Route path="/myorders" component={UserOrders} />
          <Route path="/confirmorder/:sku" component={OrderConfirm} />
          <Redirect from="/home" to="/" />
        </Switch>
      )}
      {/* <Modal
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
      </Modal> */}
      {/* <Modal
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
      </Modal> */}
      <Transition appear show={showMobileLogin} as={Fragment}>
        <Dialog
          as="div"
          open={showMobileLogin}
          className="fixed inset-0 z-10 overflow-y-auto bg-tendo-bg"
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
                {/* <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-end"
                >
                  <HiOutlineX
                    onClick={closePaymentModal}
                    className="cursor-pointer"
                  />
                </Dialog.Title> */}

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
          className="fixed inset-0 z-10 overflow-y-auto bg-tendo-bg"
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
                {/* <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-end"
                >
                  <HiOutlineX
                    onClick={closePaymentModal}
                    className="cursor-pointer"
                  />
                </Dialog.Title> */}

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
    </Fragment>
  );
};

export default ShopContent;
