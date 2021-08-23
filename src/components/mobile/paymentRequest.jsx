import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { request } from "../../utils/utils";
import ScreenWrapper from "../ScreenWrapper";
import { Dialog, Transition } from "@headlessui/react";
import { message } from "antd";
import { HiOutlineX } from "react-icons/hi";
import { AiOutlineLoading } from "react-icons/ai";

import UpdateUserPaymentForm from "./paymentDetails";

function PaymentRequest() {
  const [loading, setLoading] = React.useState(false);
  const [requestErr, setRequestErr] = React.useState(false);
  let [isPaymentOpen, setIsPaymentOpen] = React.useState(false);
  let [paymentOpen, setPaymentOpen] = React.useState(false);
  const [amt, setAmt] = React.useState(0);
  const auth = useSelector((state) => state.auth);
  const totalEarned = useSelector((state) => state.totalEarned);
  const { refNumber } = useParams();
  const dispatch = useDispatch();
  let history = useHistory();

  React.useEffect(() => {
    (auth?.paymentMethod === "" || auth?.paymentMethod === undefined) &&
      setPaymentOpen(true);
  }, [auth?.paymentMethod]);

  const onsubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const values = {};
    values.requestRefNumber = refNumber;
    values.username = auth?.username;
    values.momoProvider = auth?.paymentProvider;
    values.accountName = auth?.accountName;
    values.momoNumber = auth?.accountNumber;
    values.requestAmount = amt;
    values.status = "PENDING";
    values.requestDate = new Date().toLocaleDateString("en-GB");
    values.balanceAmount = totalEarned - values.requestAmount;

    if (values.requestAmount > totalEarned) {
      setLoading(false);
      message.error("You cannot request more than you have earned.", 10);
      return setRequestErr(true);
    }

    if (
      parseInt(values.requestAmount) < 0 ||
      parseInt(values.requestAmount) === 0
    ) {
      setLoading(false);
      message.error("You cannot request for amount less or equal zero", 10);
      return;
    }

    try {
      const res = await request({
        url: "https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetGhana/resellerProfitRequest",
        method: "POST",
        data: { resellerProfitRequest: values },
      });
      if (res) {
        dispatch({
          type: "getUserEarning",
          payload: totalEarned - parseInt(values.requestAmount),
        });

        auth.profitWithdrawn =
          parseInt(
            [undefined, "", NaN, null].includes(auth?.profitWithdrawn)
              ? 0
              : auth.profitWithdrawn
          ) + parseInt(values.requestAmount);
        const ghanaUser = auth;

        const response = await request({
          url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoGhanaGlide/ghanaUsers/${auth?.id}`,
          method: "PUT",
          data: { ghanaUser },
        });
        console.log(response, "ghanaUser");
        dispatch({
          type: "authenticateUser",
          payload: response?.ghanaUser,
        });

        setIsPaymentOpen(true);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  function closePaymentModal() {
    setIsPaymentOpen(false);
    history.goBack();
  }

  function closePaymentFormModal() {
    setPaymentOpen(false);
  }

  return (
    <ScreenWrapper title="Payment Request" showBackBtn>
      <div className="flex lg:justify-center justify-start w-full">
        <div className="flex-1 lg:w-1/2 w-full p-4">
          <div className="flex flex-col mt-6">
            <span className="text-base text-white font-bold mb-2">
              Request Details
            </span>
            <span className="text-sm font-medium text-gray-600 flex items-center mb-4">
              Confirm your payment details and continue
            </span>
            <span className="text-sm font-medium text-gray-600 flex items-center mb-2 flex justify-between">
              Payment Method:
              <span className="text-white ml-2 text-xs font-bold">
                {auth?.paymentMethod}
              </span>
            </span>
            <span className="text-sm font-medium text-gray-600 flex items-center mb-2 flex justify-between">
              Payment Provider:
              <span className="text-white ml-2 text-xs font-bold">
                {auth?.paymentProvider}
              </span>
            </span>
            <span className="text-sm font-medium text-gray-600 flex items-center mb-2 flex justify-between">
              Account Name:
              <span className="text-white ml-2 text-xs font-bold">
                {auth?.accountName}
              </span>
            </span>
            <span className="text-sm font-medium text-gray-600 flex items-center mb-2 flex justify-between">
              Account Number:
              <span className="text-white ml-2 text-xs font-bold">
                {auth?.accountNumber}
              </span>
            </span>
            <span className="text-sm font-medium text-gray-600 flex items-center mb-2 flex justify-between">
              Reference Number:
              <span className="text-yellow-500 ml-2 text-xs font-bold">
                #{refNumber}
              </span>
            </span>
          </div>

          <div className="flex flex-col mt-6">
            <span className="text-2xl font-bold text-white">
              GH&cent; {isNaN(totalEarned) ? 0.0 : totalEarned.toFixed(2)}
            </span>
            <span className="text-sm font-medium text-gray-600 flex items-center">
              Available to withdraw
            </span>
          </div>

          <form onSubmit={onsubmit}>
            <div className="mb-5 mt-4">
              <label
                htmlFor="email"
                className="block text-sm text-gray-600 font-medium"
              >
                Request Amount
              </label>
              <div className="mt-2 relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="requestAmount"
                  id="requestAmount"
                  required
                  className="focus:ring-gray-300 focus:border-gray-300 block w-full pl-7 pr-12 py-4 sm:text-sm border-gray-300 border-2 rounded-md"
                  value={amt}
                  onChange={(e) => {
                    if (e.target.value > totalEarned) {
                      setRequestErr(true);
                    }
                    setAmt(e.target.value);
                  }}
                  placeholder={`${totalEarned.toFixed(2)}`}
                />
              </div>
              <span
                className={`text-xs font-semibold ${
                  requestErr ? "text-red-500" : "text-yellow-500"
                } mt-1`}
              >
                Request amount can not be more than available amount
              </span>
            </div>
            <div className="flex">
              <div className="my-5 w-full">
                <button
                  type="submit"
                  className={`w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2  ${
                    loading || amt === 0 || amt === ""
                      ? "cursor-not-allowed bg-gray-200 text-blue-500"
                      : "bg-blue-500 text-white"
                  }`}
                  disabled={loading || amt === 0 || amt === "" ? true : false}
                >
                  {loading ? (
                    <>
                      <AiOutlineLoading
                        className="animate-spin mr-2"
                        size="24"
                      />{" "}
                      Submitting Request ...
                    </>
                  ) : (
                    "Submit Request"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <Transition appear show={isPaymentOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
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
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Payment request successful
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Your payment request has been successfully submitted.
                    Payment will be processed within 48 hours. You can use the
                    Reference number {refNumber} to track the status of the
                    request.
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closePaymentModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={paymentOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto bg-tendo-bg"
          onClose={closePaymentModal}
          open={paymentOpen}
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
                    onClick={closePaymentFormModal}
                    className="cursor-pointer"
                  />
                </Dialog.Title>

                <div className="w-full px-4 py-4">
                  <div className="w-full max-w-md mx-auto">
                    <UpdateUserPaymentForm setModal={setPaymentOpen} />
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

export default PaymentRequest;
