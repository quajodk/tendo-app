import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineTicket, HiCreditCard, HiUser } from "react-icons/hi";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import ScreenWrapper from "../components/ScreenWrapper";
import { Dialog, Transition, RadioGroup } from "@headlessui/react";
import { HiOutlineX } from "react-icons/hi";
import UpdateUserAccountForm from "./mobile/profileUpdateForm";

const Settings = () => {
  let [isOpen, setIsOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const login = () => {
    dispatch({
      type: "toggleMobileLogin",
    });
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(!isOpen);
  }

  // const message = `Hi I am ${
  //     auth && auth?.fullName
  //   }, a reseller on TendoGh 🇬🇭 App. I require some assistance`;
  //   window.open(`https://wa.me/+233503247275/?text=${message}`, "blank");

  //   const message = `Hi I am ${
  //     auth && auth?.fullName
  //   }, a reseller on TendoGh 🇬🇭 App. I require some assistance`;

  // const confirmOrder = () => {
  //   const message = `Hi I am ${
  //     auth && auth?.fullName
  //   }, a reseller on TendoNg 🇳🇬 App. I require some assistance`;
  //   window.open(`https://wa.me/+2349014992643/?text=${message}`, "blank");
  // };
  return (
    <ScreenWrapper title="Settings" showBackBtn>
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
            <div
              className="flex items-center text-lg text-tendo-active my-4 cursor-pointer"
              onClick={openModal}
            >
              <HiUser size={25} className="mr-6" /> Update Account
            </div>

            <div className="flex items-center text-lg text-tendo-active my-4 cursor-pointer">
              <HiCreditCard size={25} className="mr-6" /> Add Payment Details
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto bg-tendo-bg"
          onClose={closeModal}
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
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-end"
                >
                  <HiOutlineX onClick={closeModal} className="cursor-pointer" />
                </Dialog.Title>

                <div className="w-full px-4 py-4">
                  <div className="w-full max-w-md mx-auto">
                    <UpdateUserAccountForm setModal={setIsOpen} />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </ScreenWrapper>
  );
};

export default Settings;
