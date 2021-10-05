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
import { FaWallet, FaRegTrashAlt } from "react-icons/fa";
import { Popconfirm } from "antd";

function Earning() {
  let [isPaymentOpen, setIsPaymentOpen] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);
  const [totalCashOut, setTotalCashOut] = React.useState(0);
  const [allProfits, setAllProfits] = React.useState(0);
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
  const totalWithdrawn = useSelector((state) => state.totalCashOut);
  let history = useHistory();

  const init = React.useRef({ dispatch });

  React.useEffect(() => {
    const { dispatch } = init.current;
    // all orders
    request({
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetGhana/newAppOrders?filter[username]=${auth?.username}`,
      method: "GET",
    })
      .then((res) => {
        // console.log(res, "all orders");
        dispatch({
          type: "getNumOfUserOrders",
          payload: res.newAppOrders.length,
        });
      })
      .catch((e) => console.log(e));

    // all cancelled orders
    request({
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetGhana/newAppOrders?filter[username]=${auth?.username}&filter[orderStatus]=CANCELLED`,
      method: "GET",
    })
      .then((res) => {
        dispatch({
          type: "getNumOfCancelledUserOrders",
          payload: res.newAppOrders.length,
        });
      })
      .catch((e) => console.log(e));

    // all successful orders
    request({
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetGhana/newAppOrders?filter[username]=${
        auth?.username
      }&filter[orderStatus]=${"PAYOUT READY"}`,
      method: "GET",
    })
      .then((res) => {
        dispatch({
          type: "getNumOfSuccessfulUserOrders",
          payload: res.newAppOrders.length,
        });
      })
      .catch((e) => console.log(e));

    // all transactions
    request({
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetGhana/resellerProfitRequest?filter[username]=${auth?.username}`,
    })
      .then((res) => {
        setTransactions(res.resellerProfitRequest);
      })
      .catch((e) => console.log(e));

    // total paid transactions
    request({
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetGhana/resellerProfitRequest?filter[username]=${auth?.username}&filter[status]=PAID`,
    })
      .then((res) => {
        // console.log(res, "paid");
        const snapshot = res.resellerProfitRequest.reduce((acc, cur) => {
          return acc + parseFloat(cur?.requestAmount);
        }, 0);
        console.log(snapshot, "snapshot");
        setTotalCashOut(snapshot.toFixed(2));
        dispatch({
          type: "setTotalCashOut",
          payload: snapshot.toFixed(2),
        });
      })
      .catch((e) => console.log(e));

    // total earn from successful orders
    request({
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetGhana/newAppOrders?filter[username]=${
        auth?.username
      }&filter[orderStatus]=${"PAYOUT READY"}`,
      method: "GET",
    })
      .then((res) => {
        // console.log(res, "response");
        const amtEarned = res.newAppOrders.reduce((acc, cur) => {
          // console.log(cur?.deliveryCost.toString().replace("GHS ", ""));
          const processingFee =
            (parseFloat(
              parseInt(cur?.totalAmountToCollectFromCustomer) -
                (parseInt(cur?.deliveryCost.toString().replace("GHS ", "")) +
                  parseInt(cur?.productPrice) * parseInt(cur?.productQty ?? 1))
            ) *
              10) /
            100;

          // console.log(processingFee, "processing fee");
          // console.log(
          //   parseFloat(
          //     parseInt(cur?.totalAmountToCollectFromCustomer) -
          //       (parseInt(cur?.deliveryCost.toString().replace("GHS ", "")) +
          //         parseInt(cur?.productPrice) * parseInt(cur?.productQty ?? 1))
          //   ),
          //   "accumulator"
          // );

          return (
            acc +
            parseFloat(
              parseInt(cur?.totalAmountToCollectFromCustomer) -
                (parseInt(cur?.deliveryCost.toString().replace("GHS ", "")) +
                  parseInt(cur?.productPrice) *
                    parseInt(cur?.productQty ?? 1)) -
                processingFee
            )
          );
        }, 0);
        // console.log(amtEarned, "amt earn");

        setAllProfits(amtEarned.toFixed(2));
        dispatch({
          type: "getUserEarning",
          payload:
            amtEarned -
            parseInt(
              ["", undefined, null, NaN].includes(totalWithdrawn)
                ? 0
                : totalWithdrawn
            ),
        });
      })
      .catch((e) => console.log(e));
  }, [auth?.username, totalWithdrawn]);

  const login = () => {
    dispatch({
      type: "toggleMobileLogin",
    });
  };

  function closePaymentModal() {
    setIsPaymentOpen(false);
  }

  const requestPayment = () => {
    if (auth?.paymentMethod === "" || auth?.paymentMethod === undefined) {
      setIsPaymentOpen(true);
    }
    const refNumber = `TN${Math.floor(Math.random() * 90000) + 10000}`;
    return history.push(`/account/payment/${refNumber}`);
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
            <span className="text-sm font-medium text-gray-600 flex items-center">
              Total Earned: GH&cent; {allProfits}
            </span>
            <span className="text-sm font-medium text-gray-600 flex items-center">
              Profit Withdrawn: GH&cent; {totalCashOut ?? 0}
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
          {auth && (
            <div className="my-6 flex flex-col py-12">
              <span className="text-sm font-medium text-gray-600">
                Transactions
              </span>
              <hr className="border border-2 border-tendo-active my-4" />
              {transactions.length > 0 ? (
                transactions?.map((transaction, index) => (
                  <TransactionCard
                    request={transaction}
                    key={index + 1}
                    totalEarned={totalEarned}
                    auth={auth}
                  />
                ))
              ) : (
                <span className="text-white font-medium">
                  List of requests will appear here
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <Transition appear show={isPaymentOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-tendo-bg"
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

const TransactionCard = ({ request, totalEarned = 0, auth }) => {
  const dispatch = useDispatch();
  const confirmDelete = async () => {
    if (request?.status !== "PENDING") return;
    try {
      const res = await request({
        url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetGhana/resellerProfitRequest/${request?.id}`,
        method: "DELETE",
      });
      if (res) {
        dispatch({
          type: "getUserEarning",
          payload: totalEarned + parseInt(request.requestAmount),
        });
        auth.profitWithdrawn =
          parseInt(
            [undefined, "", NaN, null].includes(auth?.profitWithdrawn)
              ? 0
              : auth.profitWithdrawn
          ) - parseInt(request?.requestAmount);
        const ghanaUser = auth;
        const response = await request({
          url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoGhanaGlide/ghanaUsers/${auth?.id}`,
          method: "PUT",
          data: { ghanaUser },
        });
        // console.log(response, "ghanaUser");
        dispatch({
          type: "authenticateUser",
          payload: response?.ghanaUser,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full rounded-lg flex p-4 justify-start bg-gray-800 my-2">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex justify-center items-center text-tendo-active rounded-lg mr-2">
          <FaWallet size={40} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <div>
              <span className="text-sm text-white font-medium">
                GH&cent; {request?.requestAmount}
              </span>
            </div>
            <div>
              <span
                className={`text-sm text-white font-medium p-1 rounded-md ${
                  request?.status === "PAID" ? "bg-green-500" : "bg-yellow-300"
                }`}
              >
                {request?.status}
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <div>
              <span className="text-xs text-gray-400">
                {request?.requestRefNumber}
              </span>
            </div>
            <div>
              <span className="text-xs text-gray-400">
                {request?.requestDate}
              </span>
            </div>
          </div>
        </div>
      </div>
      {request?.status === "PENDING" && (
        <Popconfirm
          title={`Are you sure to delete request ${request?.requestRefNumber}`}
          onConfirm={confirmDelete}
          // onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <FaRegTrashAlt className="text-red-500 mx-2" />
        </Popconfirm>
      )}
    </div>
  );
};
