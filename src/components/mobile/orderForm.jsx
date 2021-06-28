import React, { useEffect, useRef, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import useSheetData from "../../hooks/useSheetData";
import { message } from "antd";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import ScreenWrapper from "../ScreenWrapper";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
// import { request } from "../../utils/utils";

const OrderForm = ({ item }) => {
  const { register, handleSubmit } = useForm();
  const [selectedDelivery, setSelectedDelivery] = useState({});
  const [data, loading] = useSheetData({ sheet: "deliveryLocations" });
  const deliveryLocations = useSelector((state) => state.deliveryLocations);
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const init = useRef({ dispatch });

  useEffect(() => {
    const { dispatch } = init.current;
    dispatch({
      type: "getDeliveryRate",
      payload: data,
    });
  }, [data]);

  const closeOrderForm = () => {
    dispatch({
      type: "toggleOrderForm",
      payload: null,
    });
  };

  const onOrderSubmit = (values) => {
    if (_.isEmpty(values))
      return message.error("Form fields can not be empty", 5);
    const hide = message.loading("Loadings..", 0);
    values.orderStatus = "PENDING";
    values.username = auth?.username;
    values.orderedOn = new Date().toLocaleDateString("en-GB");
    values.orderNumber = `RS${Math.floor(Math.random() * 90000) + 10000}`;
    values.deliveryLocation = selectedDelivery.locations;
    values.deliveryCost = selectedDelivery.deliveryRateGhs;

    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer VGVuZG8gUmVzZWxsZXIkIDIwMjE=",
      },
      data: { newAppOrder: values },
      url: "https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetGhana/newAppOrders",
    })
      .then(async (res) => {
        if (res.data) {
          const slackMsg = {
            text: `You Have New Order\n\nOrder Number: ${values?.orderNumber}\nOrder Status: ${values?.orderStatus}\nProduct SKU: ${values?.productSku}\nOrder Cost: ${values?.totalAmountToCollectFromCustomer}\n\nDelivery Information\nDelivery Location: ${values?.deliveryLocation}\nDelivery Cost: ${values?.deliveryCost}\n\nReseller Information\nReseller Name: ${values?.resellerName}\nReseller Number: ${values?.resellerPhoneNumber}\n\nCustomer Information\nCustomer Name: ${values?.customerName}\nCustomer Location: ${values?.customerLocation}\nCustomer Phone: ${values?.customerPhoneNumber}`,
          };

          fetch(process.env.REACT_APP_SLACK_WEBHOOK, {
            method: "POST",
            credentials: "omit",
            body: JSON.stringify(slackMsg),
          })
            .then((res) => res.json())
            .then((res) => console.log(res))
            .catch((e) => console.log(e));

          hide();
          message.success("Order was placed successfully", 5);
          closeOrderForm();
          history.push(`confirmorder/${item?.skUs}`);
        }
      })
      .catch((e) => {
        hide();
        message.error("Something went wrong, try again", 5);
        console.log(e);
      });
  };

  return (
    <>
      <ScreenWrapper
        title="Order Form"
        showBackBtn
        backFunction={() => dispatch({ type: "closeOrderForm" })}
      >
        <div className="flex lg:justify-center">
          <form
            onSubmit={handleSubmit(onOrderSubmit)}
            className="w-screen flex lg:justify-center flex-1 overflow-y-scroll bg-tendo-bg z-20"
          >
            <div className="flex flex-col w-full lg:w-1/2 relative">
              <div className="px-4 pt-1 pb-3">
                <label
                  htmlFor="sku"
                  className="block text-xs font-medium text-white"
                >
                  Product SKU
                </label>
                <div className="mt-2 border-b border-teal-500 py-2">
                  <input
                    type="text"
                    name="productSku"
                    id="sku"
                    required
                    defaultValue={item?.skUs}
                    ref={register({ required: true })}
                    className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
                    placeholder="SKU"
                  />
                </div>
              </div>
              <div className="px-4 pt-1 pb-3">
                <label
                  htmlFor="productQty"
                  className="block text-xs font-medium text-white"
                >
                  Product Quantity
                </label>
                <div className="mt-2 border-b border-teal-500 py-2">
                  <input
                    type="number"
                    name="productQty"
                    id="productQty"
                    required
                    ref={register({ required: true })}
                    className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
                    placeholder="Quantity"
                  />
                </div>
              </div>
              <div className="px-4 pt-1 pb-3">
                <label
                  htmlFor="productSpec"
                  className="block text-xs font-medium text-white"
                >
                  Product Spec (Size, type, color, final price, etc)
                </label>
                <div className="mt-2 border-b border-teal-500 py-2">
                  <input
                    type="text"
                    name="productSpec (type,Size,Color,Etc)"
                    id="productSpec"
                    required
                    ref={register({ required: true })}
                    className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
                    placeholder="eg, Nike React (size 42, blue)"
                  />
                </div>
              </div>

              <div className="px-4 pt-1 pb-3">
                <label
                  htmlFor="totalAmount"
                  className="block text-xs font-medium text-white"
                >
                  Total Amount To collect from Customer
                </label>
                <div className="mt-2 border-b border-teal-500 py-2">
                  <input
                    type="text"
                    name="totalAmountToCollectFromCustomer"
                    id="totalAmount"
                    required
                    ref={register({ required: true })}
                    className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
                    placeholder="Sum up Cost of Product, Profit &amp; Delivery"
                  />
                </div>
              </div>
              <div className="px-4 pt-1 pb-3">
                <label
                  htmlFor="customerName"
                  className="block text-xs font-medium text-white"
                >
                  Customer Name
                </label>
                <div className="mt-2 border-b border-teal-500 py-2">
                  <input
                    type="text"
                    name="customerName"
                    id="customerName"
                    required
                    ref={register({ required: true })}
                    className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div className="px-4 pt-1 pb-3">
                <label
                  htmlFor="totalAmount"
                  className="block text-xs font-medium text-white"
                >
                  Delivery zone &amp; price
                </label>
                <div className="mt-2 py-2">
                  <Listbox
                    value={selectedDelivery}
                    onChange={setSelectedDelivery}
                  >
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                      <span className="block truncate">
                        {_.isEmpty(selectedDelivery)
                          ? "Select delivery location"
                          : selectedDelivery.locations}
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                          className="w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      {loading ? (
                        <Listbox.Options className="absolute w-full mx-4 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          Loading ...
                        </Listbox.Options>
                      ) : (
                        <Listbox.Options className="absolute w-full mx-4 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {deliveryLocations.map((rate, idx) => (
                            <Listbox.Option
                              key={idx + 1}
                              value={rate}
                              className={({ active }) =>
                                `${
                                  active
                                    ? "text-amber-900 bg-amber-100"
                                    : "text-gray-900"
                                }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                              }
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={`${
                                      selected ? "font-medium" : "font-normal"
                                    } block truncate`}
                                  >
                                    {rate.locations}
                                  </span>
                                  {selected ? (
                                    <span
                                      className={`${
                                        active
                                          ? "text-amber-600"
                                          : "text-amber-600"
                                      }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                    >
                                      <CheckIcon
                                        className="w-5 h-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
                                  <p>{rate.deliveryRateGhs}</p>
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      )}
                    </Transition>
                  </Listbox>
                </div>
              </div>
              <div className="px-4 pt-1 pb-3">
                <label
                  htmlFor="customerLocation"
                  className="block text-xs font-medium text-white"
                >
                  Customer Location
                </label>
                <div className="mt-2 border-b border-teal-500 py-2">
                  <input
                    type="text"
                    name="customerLocation"
                    id="customerLocation"
                    required
                    ref={register({ required: true })}
                    className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div className="px-4 pt-1 pb-3">
                <label
                  htmlFor="landmark"
                  className="block text-xs font-medium text-white"
                >
                  Landmark Close To Location
                </label>
                <div className="mt-2 border-b border-teal-500 py-2">
                  <input
                    type="text"
                    name="landmarkCloseToLocation"
                    id="landmark"
                    required
                    ref={register({ required: true })}
                    className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div className="px-4 pt-1 pb-3">
                <label
                  htmlFor="customerPhoneNumber"
                  className="block text-xs font-medium text-white"
                >
                  Customer Phone Number
                </label>
                <div className="mt-2 border-b border-teal-500 py-2">
                  <input
                    type="text"
                    name="customerPhoneNumber"
                    id="customerPhoneNumber"
                    required
                    ref={register({ required: true })}
                    className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div className="px-4 pt-1 pb-3">
                <label
                  htmlFor="resellerName"
                  className="block text-xs font-medium text-white"
                >
                  Reseller Name
                </label>
                <div className="mt-2 border-b border-teal-500 py-2">
                  <input
                    type="text"
                    name="resellerName"
                    id="resellerName"
                    required
                    defaultValue={auth?.fullName}
                    ref={register({ required: true })}
                    className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div className="px-4 pt-1 pb-3">
                <label
                  htmlFor="resellerPhone"
                  className="block text-xs font-medium text-white"
                >
                  Reseller Phone Number
                </label>
                <div className="mt-2 border-b border-teal-500 py-2">
                  <input
                    type="text"
                    name="resellerPhoneNumber"
                    id="resellerPhone"
                    required
                    defaultValue={auth?.phone}
                    ref={register({ required: true })}
                    className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div className="px-4 pt-1 pb-3">
                <label
                  htmlFor="momoNumber"
                  className="block text-xs font-medium text-white"
                >
                  MOMO Number To Send Profit To
                </label>
                <div className="mt-2 border-b border-teal-500 py-2">
                  <input
                    type="text"
                    name="momoNumberToSendProfitTo"
                    id="momoNumber"
                    required
                    defaultValue={auth?.accountNumber}
                    ref={register({ required: true })}
                    className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div className="px-4 pt-1 pb-3">
                <label
                  htmlFor="momoAccountName"
                  className="block text-xs font-medium text-white"
                >
                  What is Your MOMO Account Name
                </label>
                <div className="mt-2 border-b border-teal-500 py-2">
                  <input
                    type="text"
                    name="whatIsYourMomoAccountName"
                    id="momoAccountName"
                    required
                    defaultValue={auth?.accountName}
                    ref={register({ required: true })}
                    className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div className="px-4 pt-1 pb-3">
                <label
                  htmlFor="deliveryNote"
                  className="block text-xs font-medium text-white"
                >
                  Delivery Instructions
                </label>
                <div className="mt-2 border-b border-teal-500 py-2">
                  <input
                    type="text"
                    name="deliveryInstructions"
                    id="deliveryNote"
                    ref={register({ required: false })}
                    className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div className="px-4 pt-1 pb-3 hidden">
                <label
                  htmlFor="referralCode"
                  className="block text-xs font-medium text-white"
                >
                  First Sale? Who Referred You?
                </label>
                <div className="mt-2 border-b border-teal-500 py-2">
                  <input
                    type="text"
                    name="whoReferredYou?"
                    id="referralCode"
                    defaultValue={auth?.referralCode}
                    ref={register({ required: false })}
                    className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex mb-12">
                <div className="mx-4 my-5 w-full">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white"
                  >
                    Place Order
                  </button>
                </div>
              </div>
              <div className="h-8"></div>
            </div>
          </form>
        </div>
      </ScreenWrapper>
    </>
  );
};

export default OrderForm;
