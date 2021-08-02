import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ScreenWrapper from "../../../components/ScreenWrapper";
import ProductListing from "../ProductListing";
import { Dialog, Transition } from "@headlessui/react";
import { HiOutlineX } from "react-icons/hi";
import UpdateUserPaymentForm from "../../../components/mobile/paymentDetails";
import { AiOutlineWarning } from "react-icons/ai";

const HomeTab = () => {
  const dispatch = useDispatch();
  let [isPaymentOpen, setIsPaymentOpen] = React.useState(false);
  const mobileProducts = useSelector((state) => state.orginalMobileProducts);
  const auth = useSelector((state) => state.auth);
  const copyOfProducts = useSelector((state) => state.copyOfProducts);
  const searchTerm = useSelector((state) => state.searchTerm);

  const search = () => {
    if (mobileProducts.length !== 0) {
      const filteredProduct = mobileProducts.filter(
        (x) =>
          x.glideStatus === "TRUE" &&
          (x?.product?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            x?.skUs?.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      dispatch({
        type: "updateMobileProducts",
        payload: filteredProduct,
      });
    } else {
      dispatch({
        type: "updateMobileProducts",
        payload: mobileProducts,
      });
    }
  };

  function closePaymentModal() {
    setIsPaymentOpen(false);
  }

  const onSearchClear = () => {
    dispatch({
      type: "updateMobileProducts",
      payload: copyOfProducts,
    });
  };

  return (
    <ScreenWrapper
      title="Home"
      searchFunction={search}
      clearSearchFunction={onSearchClear}
    >
      {auth &&
        (auth?.paymentMethod === "" || auth?.paymentMethod === undefined) && (
          <div
            className="bg-yellow-200 p-2 flex items-center rounded-md my-4 mx-4"
            onClick={() => setIsPaymentOpen(true)}
          >
            <AiOutlineWarning className="mr-2 text-red-500 h-6 w-6" /> Payment
            details not available.{" "}
            <span className="text-blue-800 ml-1"> Add here</span>
          </div>
        )}
      <ProductListing />
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
};

export default HomeTab;
