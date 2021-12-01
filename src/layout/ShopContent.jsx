import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  // Suspense
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router";
import { routes } from "./mobile/routes";
import axios from "axios";
import { Dialog, Transition } from "@headlessui/react";
import { request } from "../utils/utils";
import MobileRegisterForm from "../components/mobile/mobileRegisterForm";
import MobileLoginForm from "../components/mobile/mobileLoginForm";
// import PageLoader from "../components/PageLoader";

const PromoTab = React.lazy(() => import("./mobile/tabs/PromoTab"));
const PromoMobile = React.lazy(() => import("./mobile/PromoMobile"));
const ProductDetailsBody = React.lazy(() =>
  import("../components/mobile/mobileProductDetail")
);
const OrderConfirm = React.lazy(() =>
  import("../components/mobile/orderConfirm")
);
const UserOrders = React.lazy(() => import("../components/mobile/userOrders"));
const OrderForm = React.lazy(() => import("../components/mobile/orderForm"));
const OrderDetails = React.lazy(() =>
  import("../components/mobile/orderDetails")
);
const DeliveryPrices = React.lazy(() =>
  import("../components/mobile/deliveryPrices")
);
const NotificationsPage = React.lazy(() =>
  import("../components/mobile/notification")
);
const Settings = React.lazy(() => import("../components/Settings"));
const CategoryTab = React.lazy(() => import("./mobile/tabs/CategoryTab"));
const Earning = React.lazy(() => import("../components/mobile/earnings"));
const PaymentRequest = React.lazy(() =>
  import("../components/mobile/paymentRequest")
);

const ShopContent = () => {
  const dispatch = useDispatch();

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
        url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoGhanaGlide/ghanaUsers?filter[token]=${token}`,
      })
        .then(({ data }) => {
          if (data?.ghanaUsers.length === 1) {
            dispatch({
              type: "authenticateUser",
              payload: data?.ghanaUsers[0],
            });
            // check if ghanaUser's successful orders is undefined
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
    <Fragment>
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
        <Route
          path="/promotions/:promoName"
          render={(props) => <PromoTab {...props} />}
        />
        <Route path="/account/delivery" component={DeliveryPrices} exact />
        <Route path="/account/wallet" component={Earning} exact />
        <Route path="/account/settings" component={Settings} exact />
        <Route
          path="/account/payment/:refNumber"
          component={PaymentRequest}
          exact
        />
        <Route path="/account/notification" component={NotificationsPage} />
        <Route path="/account/referral" component={PromoMobile} />
        <Route path="/myorders" component={UserOrders} />
        <Route path="/confirmorder/:sku" component={OrderConfirm} />
        <Redirect from="/home" to="/" />
      </Switch>

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
    </Fragment>
  );
};

export default ShopContent;
