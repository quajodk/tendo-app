import React, { useEffect, useRef, useState, Fragment } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
// import Header from "../../components/mobile/Header";
import ProductDetailsBody from "../../components/mobile/mobileProductDetail";

import { routes } from "./routes";
import OrderForm from "../../components/mobile/orderForm";
import OrderConfirm from "../../components/mobile/orderConfirm";
// import Modal from "../../components/Modal";
import MobileLoginForm from "../../components/mobile/mobileLoginForm";
import MobileRegisterForm from "../../components/mobile/mobileRegisterForm";
import UserOrders from "../../components/mobile/userOrders";
import OrderDetails from "../../components/mobile/orderDetails";
import DeliveryPrices from "../../components/mobile/deliveryPrices";
import Settings from "../../components/Settings";
import NotificationsPage from "../../components/mobile/notification";
import { Dialog, Transition } from "@headlessui/react";
import { request } from "../../utils/utils";
import CategoryTab from "./tabs/CategoryTab";
// import { HiOutlineX } from "react-icons/hi";

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
        url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoNigeriaResellerApp/nigeriaUsers?filter[token]=${token}`,
      })
        .then(({ data }) => {
          if (data?.nigeriaUsers.length === 1) {
            dispatch({
              type: "authenticateUser",
              payload: data?.nigeriaUsers[0],
            });
            // check if user's successful orders is undefined
            request({
              url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetNigeria/nigeriaOrders?filter[username]=${
                data?.nigeriaUsers[0]?.username
              }&filter[orderStatus]=${"PROFIT PAID"}`,
              method: "GET",
            })
              .then((res) => {
                res && console.log("success");
                data.nigeriaUsers[0].successfulOrders =
                  res.nigeriaOrders.length;
                const nigeriaUser = data.nigeriaUsers[0];
                request({
                  url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoNigeriaResellerApp/nigeriaUsers/${data?.nigeriaUsers[0]?.id}`,
                  method: "PUT",
                  data: { nigeriaUser },
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
      <div className="flex h-screen flex-1  flex-col font-poppins">
        {/* Handle when a product is selected */}
        <div className="h-screen flex-1 flex flex-col">
          {/* Body Goes here */}
          <div className="flex-1 overflow-y-scroll bg-tendo-bg">
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
                exact
                path="/product/order"
                render={(props) => <OrderForm {...props} />}
              />

              <Route
                path={`/product/:productName`}
                render={(props) => <ProductDetailsBody {...props} />}
              />

              <Route
                path="/order/:orderNumber"
                render={(props) => <OrderDetails {...props} />}
              />
              <Route
                path="/categories/:categoryName"
                render={(props) => <CategoryTab {...props} />}
              />
              <Route path="/account/delivery" component={DeliveryPrices} />
              <Route path="/account/settings" component={Settings} />
              <Route
                path="/account/notification"
                component={NotificationsPage}
              />
              <Route path="/myorders" component={UserOrders} />
              <Route path="/confirmorder/:sku" component={OrderConfirm} />
              <Redirect from="/home" to="/" />
            </Switch>
          </div>
        </div>

        {/* Bottom Tab navigator */}
        {/* <BottomTabNavigation /> */}
      </div>

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
    </>
  );
};

export default MobileLayer;
