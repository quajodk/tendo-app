import React from "react";
import ScreenWrapper from "../ScreenWrapper";
import { useDispatch, useSelector } from "react-redux";
import { request } from "../../utils/utils";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineWarning } from "react-icons/ai";
import { HiCreditCard } from "react-icons/hi";
import { Dialog, Transition } from "@headlessui/react";
import { HiOutlineX } from "react-icons/hi";
import UpdateUserPaymentForm from "./paymentDetails";
import { useHistory } from "react-router-dom";

function Earning() {
  let [isPaymentOpen, setIsPaymentOpen] = React.useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const numOfUserOrders = useSelector((state) => state.numOfUserOrders);
  const numOfCancelledUserOrders = useSelector(
    (state) => state.numOfCancelledUserOrders
  );
  const numOfSuccessUserOrders = useSelector(
    (state) => state.numOfSuccessUserOrders
  );
  const totalEarned = useSelector((state) => state.totalEarned);
  let history = useHistory();

  const init = React.useRef({ dispatch });

  React.useEffect(() => {
    const { dispatch } = init.current;
    // all orders
    request({
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetNigeria/nigeriaOrders?filter[username]=${auth?.username}`,
      method: "GET",
    })
      .then((res) => {
        dispatch({
          type: "getNumOfUserOrders",
          payload: res.nigeriaOrders.length,
        });
      })
      .catch((e) => console.log(e));

    // all cancelled orders
    request({
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetNigeria/nigeriaOrders?filter[username]=${auth?.username}&filter[orderStatus]=CANCELLED`,
      method: "GET",
    })
      .then((res) => {
        dispatch({
          type: "getNumOfCancelledUserOrders",
          payload: res.nigeriaOrders.length,
        });
      })
      .catch((e) => console.log(e));

    // all successful orders
    request({
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetNigeria/nigeriaOrders?filter[username]=${
        auth?.username
      }&filter[orderStatus]=${"PAYOUT READY"}`,
      method: "GET",
    })
      .then((res) => {
        dispatch({
          type: "getNumOfSuccessfulUserOrders",
          payload: res.nigeriaOrders.length,
        });
      })
      .catch((e) => console.log(e));

    // all successful orders
    request({
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetNigeria/nigeriaOrders?filter[username]=${
        auth?.username
      }&filter[orderStatus]=${"PAYOUT READY"}`,
      method: "GET",
    })
      .then((res) => {
        const amtEarned = res.nigeriaOrders.reduce((acc, cur) => {
          return (
            acc +
            parseInt(
              cur?.totalAmountToCollectFromCustomer -
                (parseInt(
                  cur?.deliveryCost.toString().replace("&#8358; ", "")
                ) +
                  parseInt(cur?.productPrice))
            )
          );
        }, 0);

        dispatch({
          type: "getUserEarning",
          payload: amtEarned - (auth?.profitWithdrawn ?? 0),
        });
      })
      .catch((e) => console.log(e));
  }, [auth?.username, auth?.profitWithdrawn]);

  const login = () => {
    dispatch({
      type: "toggleMobileLogin",
    });
  };

  function closePaymentModal() {
    setIsPaymentOpen(false);
  }

  const requestPayment = () => {
    (auth?.paymentMethod === "" || auth?.paymentMethod === undefined) &&
      setIsPaymentOpen(true);

    const refNumber = `TN${Math.floor(Math.random() * 90000) + 10000}`;
    history.push(`/account/payment/${refNumber}`);
  };

  return (
    <ScreenWrapper title="Wallet" showBackBtn>
      <div className="flex lg:justify-center justify-start w-full">
        <div className="flex-1 lg:w-1/2 w-full p-4">
          {(auth?.paymentMethod === "" ||
            auth?.paymentMethod === undefined) && (
            <div
              className="bg-yellow-200 p-2 flex items-center rounded-sm my-4"
              onClick={() => setIsPaymentOpen(true)}
            >
              <AiOutlineWarning className="mr-2 text-red-500 h-6 w-6" /> Payment
              details not available.{" "}
              <span className="text-blue-800 ml-1"> Add here</span>
            </div>
          )}
          <div className="flex flex-col justify-start mb-4">
            <span className="text-2xl font-bold text-white">
              GH&cent; {isNaN(totalEarned) ? 0.0 : totalEarned.toFixed(2)}
            </span>
            <span className="text-sm font-medium text-gray-600 flex items-center">
              Profit Earned - (Available to withdraw)
            </span>
          </div>

          <div className="my-10 flex justify-between items-center">
            <div className="flex flex-col justify-center items-center">
              <span className="text-2xl font-bold text-white">
                {numOfUserOrders}
              </span>
              <span className="text-sm font-medium text-gray-600 flex items-center">
                Orders
              </span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-2xl font-bold text-white">
                {numOfCancelledUserOrders}
              </span>
              <span className="text-sm font-medium text-gray-600 flex items-center">
                Cancelled Orders
              </span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="text-2xl font-bold text-white">
                {numOfSuccessUserOrders}
              </span>
              <span className="text-sm font-medium text-gray-600 flex items-center">
                Successful Orders
              </span>
            </div>
          </div>

          {!auth && (
            <div className="flex">
              <div className="my-5 w-full">
                <button
                  type="button"
                  className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white"
                  onClick={login}
                >
                  <BsFillPersonFill size={24} className="mr-2" /> Login
                </button>
              </div>
            </div>
          )}
          {auth && (
            <div className="flex">
              <div className="my-5 w-full">
                <button
                  type="button"
                  className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white"
                  onClick={requestPayment}
                >
                  <HiCreditCard size={24} className="mr-2" /> Request Payout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Transition appear show={isPaymentOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto bg-tendo-bg"
          onClose={closePaymentModal}
          open={isPaymentOpen}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
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
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl bg-">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-end"
                >
                  <HiOutlineX
                    onClick={closePaymentModal}
                    className="cursor-pointer"
                  />
                </Dialog.Title>

                <div className="w-full px-4 py-4">
                  <div className="w-full max-w-md mx-auto">
                    <UpdateUserPaymentForm setModal={setIsPaymentOpen} />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </ScreenWrapper>
  );
}

export default Earning;
