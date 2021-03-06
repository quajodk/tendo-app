import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  HiOutlineTicket,
  HiCreditCard,
  HiCog,
  HiSupport,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import ScreenWrapper from "../../components/ScreenWrapper";

const HelpMobile = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const login = () => {
    dispatch({
      type: "toggleMobileLogin",
    });
  };

  const confirmOrder = () => {
    const message = `Hi I am ${
      auth && auth?.fullName
    }, a reseller on TendoGh 🇬🇭 App. I require some assistance`;
    window.open(`https://wa.me/+233503247275/?text=${message}`, "blank");
  };
  return (
    <ScreenWrapper title="Account">
      <div className="flex lg:justify-center">
        <div className="flex-1 lg:w-1/2 p-4">
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
            <Link to="/myorders">
              <div className="flex items-center text-lg text-tendo-active my-4">
                <HiOutlineTicket size={25} className="mr-6" /> My Orders
              </div>
            </Link>

            <div className="flex items-center text-lg text-tendo-active my-4">
              <HiCreditCard size={25} className="mr-6" /> My Earnings
            </div>
            <div className="flex items-center text-lg text-tendo-active my-4">
              <HiCog size={25} className="mr-6" /> Settings
            </div>
            <div className="flex items-center text-lg text-tendo-active my-4">
              <HiSupport size={25} className="mr-6" /> Help
            </div>
            <div className="flex items-center text-lg text-tendo-active my-4">
              <HiOutlineInformationCircle size={25} className="mr-6" /> About
            </div>
          </div>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default HelpMobile;
