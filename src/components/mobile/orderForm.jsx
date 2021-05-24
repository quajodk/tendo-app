import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message } from "antd";
import _ from "lodash";
import { useHistory } from "react-router-dom";

const OrderForm = ({ item }) => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const dispatch = useDispatch();
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
    axios({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer TEST_TOKEN",
      },
      data: { order: values },
      url: "https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/productCatalogueGhana/orders",
    })
      .then((res) => {
        if (res.data) {
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
      <form
        onSubmit={handleSubmit(onOrderSubmit)}
        className="w-screen flex-1 overflow-y-scroll bg-tendo-bg z-20"
      >
        <div className="flex flex-col relative">
          <div className="px-4 pt-1 pb-3">
            <label
              htmlFor="sku"
              className="block text-xs font-medium lg:text-black text-white"
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
              htmlFor="qnty"
              className="block text-xs font-medium lg:text-black text-white"
            >
              Product Quantity
            </label>
            <div className="mt-2 border-b border-teal-500 py-2">
              <input
                type="text"
                name="productQty"
                id="qnty"
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
              className="block text-xs font-medium lg:text-black text-white"
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
              className="block text-xs font-medium lg:text-black text-white"
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
              className="block text-xs font-medium lg:text-black text-white"
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
              htmlFor="customerLocation"
              className="block text-xs font-medium lg:text-black text-white"
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
              className="block text-xs font-medium lg:text-black text-white"
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
              className="block text-xs font-medium lg:text-black text-white"
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
              className="block text-xs font-medium lg:text-black text-white"
            >
              Reseller Name
            </label>
            <div className="mt-2 border-b border-teal-500 py-2">
              <input
                type="text"
                name="resellerName"
                id="resellerName"
                required
                ref={register({ required: true })}
                className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>
          </div>
          <div className="px-4 pt-1 pb-3">
            <label
              htmlFor="resellerPhone"
              className="block text-xs font-medium lg:text-black text-white"
            >
              Reseller Phone Number
            </label>
            <div className="mt-2 border-b border-teal-500 py-2">
              <input
                type="text"
                name="resellerPhoneNumber"
                id="resellerPhone"
                required
                ref={register({ required: true })}
                className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>
          </div>
          <div className="px-4 pt-1 pb-3">
            <label
              htmlFor="momoNumber"
              className="block text-xs font-medium lg:text-black text-white"
            >
              MOMO Number To Send Profit To
            </label>
            <div className="mt-2 border-b border-teal-500 py-2">
              <input
                type="text"
                name="momoNumberToSendProfitTo"
                id="momoNumber"
                required
                ref={register({ required: true })}
                className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>
          </div>
          <div className="px-4 pt-1 pb-3">
            <label
              htmlFor="momoAccountName"
              className="block text-xs font-medium lg:text-black text-white"
            >
              What is Your MOMO Account Name
            </label>
            <div className="mt-2 border-b border-teal-500 py-2">
              <input
                type="text"
                name="whatIsYourMomoAccountName"
                id="momoAccountName"
                required
                ref={register({ required: true })}
                className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>
          </div>
          <div className="px-4 pt-1 pb-3">
            <label
              htmlFor="deliveryNote"
              className="block text-xs font-medium lg:text-black text-white"
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
          <div className="px-4 pt-1 pb-3">
            <label
              htmlFor="referralCode"
              className="block text-xs font-medium lg:text-black text-white"
            >
              First Sale? Who Referred You?
            </label>
            <div className="mt-2 border-b border-teal-500 py-2">
              <input
                type="text"
                name="whoReferredYou?"
                id="referralCode"
                ref={register({ required: false })}
                className="appearance-none bg-transparent border-none w-full text-blue-500 text-base mr-3 py-1 px-2 leading-tight focus:outline-none"
              />
            </div>
          </div>
          <div className="flex">
            <div className="mx-4 my-5 w-full">
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default OrderForm;
