import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";
import { message } from "antd";
import _ from "lodash";

const OrderForm = ({ item }) => {
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const closeOrderForm = () => {
    dispatch({
      type: "toggleOrderForm",
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
        className="h-screen overflow-x-auto"
      >
        <div
          className="bg-black z-20"
          style={{
            position: "absolute",
            pointerEvents: "auto",
            left: "env(safe-area-inset-left)",
            right: "env(safe-area-inset-right)",
            top: "env(safe-area-inset-top)",
          }}
        >
          <div
            className="p-4"
            style={{
              color: "rgb(33, 150, 243)",
              height: 44,
              flexShrink: 0,
              display: "flex",
              position: "relative",
              alignItems: "center",
            }}
          >
            <div
              className="flex content-center justify-center text-blue-500 text-base cursor-pointer"
              onClick={closeOrderForm}
            >
              Cancel
            </div>
            <div
              className="mx-4"
              style={{
                flexGrow: 1,
                textAlign: "center",
                fontWeight: 500,
                fontSize: 16,
                lineHeight: 19,
                color: "rgb(255, 255, 255)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                opacity: 1,
                transition: "opacity 0.2s ease 0s",
              }}
            >
              Order Form
            </div>
            <button
              type="submit"
              className="flex content-center justify-center text-blue-500 text-base"
            >
              Submit
            </button>
          </div>
        </div>
        <div
          className="flex flex-col relative min-h-full z-2 py-4"
          style={{
            paddingBottom: "calc(0px + env(safe-area-inset-bottom))",
            backgroundColor: "rgb(21, 24, 30)",
            paddingTop: "calc(env(safe-area-inset-top) + 96px)",
          }}
        >
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
                defaultValue={item.skUs}
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
        </div>
      </form>
    </>
  );
};

export default OrderForm;
