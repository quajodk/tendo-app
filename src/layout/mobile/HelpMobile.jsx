import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HiOutlineTicket,
  HiCreditCard,
  HiCog,
  HiSupport,
  HiOutlineInformationCircle,
  HiBell,
} from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { FiPackage } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import ScreenWrapper from "../../components/ScreenWrapper";
import { Dialog, Transition } from "@headlessui/react";
import { HiOutlineX } from "react-icons/hi";

const HelpMobile = () => {
  let [isPaymentOpen, setIsPaymentOpen] = React.useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();

  const login = () => {
    dispatch({
      type: "toggleMobileLogin",
    });
  };

  const message = `Hi I am ${
    auth && auth?.fullName
  }, a reseller on TendoNg 🇳🇬 App. I require some assistance`;

  // const confirmOrder = () => {
  //   const message = `Hi I am ${
  //     auth && auth?.fullName
  //   }, a reseller on TendoNg 🇳🇬 App. I require some assistance`;
  //   window.open(`https://wa.me/+2349014992643/?text=${message}`, "blank");
  // };

  const signOut = () => {
    dispatch({
      type: "authenticateUser",
      payload: null,
    });
    localStorage.removeItem("resellerToken");
    history.push("/");
  };

  function closePaymentModal() {
    setIsPaymentOpen(false);
  }

  function closeModalSignOut() {
    setIsPaymentOpen(false);
    signOut();
  }

  return (
    <ScreenWrapper title="Account">
      <div className="flex lg:justify-center justify-start w-full">
        <div className="flex-1 lg:w-1/2 w-full p-4">
          <div className="flex flex-col justify-start mb-4">
            {auth && (
              <>
                <span className="text-2xl font-bold text-white">
                  {auth?.fullName}
                </span>
                <span className="text-sm font-medium text-gray-600 flex items-center">
                  {auth?.username} -{" "}
                  <span className="text-white ml-2 text-xs">Referral code</span>
                </span>

                <span className="text-sm font-medium text-gray-600">
                  {auth?.phone}
                </span>
              </>
            )}
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
          </div>
          <div className="flex flex-col justify-start w-full">
            <Link to="/myorders" className="cursor-pointer">
              <div className="flex items-center text-lg text-tendo-active my-4">
                <HiOutlineTicket size={25} className="mr-6" /> My Orders
              </div>
            </Link>

            <Link to="/account/wallet" className="cursor-pointer">
              <div className="flex items-center text-lg text-tendo-active my-4 cursor-pointer">
                <HiCreditCard size={25} className="mr-6" /> My Earnings
              </div>
            </Link>

            <Link to="/account/delivery" className="cursor-pointer">
              <div className="flex items-center text-lg text-tendo-active my-4 cursor-pointer">
                <FiPackage size={25} className="mr-6" /> Delivery Prices
              </div>
            </Link>
            <Link to="/account/notification" className="cursor-pointer">
              <div className="flex items-center text-lg text-tendo-active my-4 cursor-pointer">
                <HiBell size={25} className="mr-6" /> Notifications
              </div>
            </Link>
            <Link to="/account/settings" className="cursor-pointer">
              <div className="flex items-center text-lg text-tendo-active my-4 cursor-pointer">
                <HiCog size={25} className="mr-6" /> Settings
              </div>
            </Link>
            <a
              className="flex items-center text-lg text-tendo-active my-4 cursor-pointer"
              href={`https://wa.me/+2349014992643/?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <HiSupport size={25} className="mr-6" /> Help
            </a>
            <div className="flex items-center text-lg text-tendo-active my-4">
              <HiOutlineInformationCircle size={25} className="mr-6" /> About
            </div>
            <div
              className="flex items-center text-lg text-tendo-active my-4 cursor-pointer"
              onClick={() => setIsPaymentOpen(true)}
            >
              <HiOutlineInformationCircle size={25} className="mr-6" /> Sign Out
            </div>
          </div>
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
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are sure you want sign out?
                  </p>
                </div>

                <div className="mt-4 flex justify-between">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closePaymentModal}
                  >
                    No, keep me signed in
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-gray-100 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModalSignOut}
                  >
                    Yes, sign me out
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </ScreenWrapper>
  );
};

export default HelpMobile;
