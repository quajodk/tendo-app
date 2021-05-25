import React from "react";
import { useSelector } from "react-redux";
import {
  HiOutlineTicket,
  HiCreditCard,
  HiCog,
  HiSupport,
  HiOutlineInformationCircle,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const HelpMobile = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <div className="flex-1 p-4">
        <div className="flex flex-col justify-start mb-4">
          {auth && (
            <>
              <span className="text-2xl font-bold text-white">
                {auth?.fullName}
              </span>
              <span className="text-sm font-medium text-gray-600">
                {auth?.username}
              </span>

              <span className="text-sm font-medium text-gray-600">
                {auth?.phone}
              </span>
            </>
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
    </>
  );
};

export default HelpMobile;
