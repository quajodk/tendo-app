import React, { useEffect, useRef } from "react";
import { FiTruck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import ConfirmBg from "../../assets/confirm-order-bg.jpeg";
import useSheetData from "../../hooks/useSheetData";
import { useHistory } from "react-router-dom";
import ScreenWrapper from "../ScreenWrapper";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const OrderConfirm = () => {
  const [data, loading] = useSheetData({ sheet: "deliveryLocations" });
  const deliveryLocations = useSelector((state) => state.deliveryLocations);
  const dispatch = useDispatch();
  const init = useRef({ dispatch });
  // const { sku } = useParams();
  const history = useHistory();

  useEffect(() => {
    const { dispatch } = init.current;
    dispatch({
      type: "getDeliveryRate",
      payload: data,
    });
  }, [data]);

  // const message = `Hi I would like to confirm my order with product SKU ${sku} on TendoGh 🇬🇭 App.`;

  const goHome = () => {
    return history.push("/");
  };

  return (
    <>
      <ScreenWrapper title="Confirm an Order" showBackBtn>
        <div className="w-screen flex-1 overflow-y-scroll bg-tendo-bg z-20">
          <div className="relative h-36">
            <img
              src={ConfirmBg}
              alt=""
              className="object-cover w-full h-full bg-transparent"
            />
          </div>
          <div className="mx-4 my-6 p-3 bg-green-500 bg-opacity-50 rounded-sm border-1 text-white flex flex-col">
            <p className="text-sm font-semibold">Order notice</p>

            <p>
              Your order will be delivered within 2 - 3 working days after order
              confirmation
            </p>
            <p className="text-xs">
              Note: There is instant delivery option, which comes with a
              different delivery cost. Confirm your order with our agents and
              inquire more about this offer.
            </p>
          </div>
          <div className="text-center px-4 py-2">
            <span className="text-xl text-white font-bold">
              Your order was successfully placed! Kindly confirm below.
            </span>
          </div>

          <div className="text-center px-4 py-2">
            <span className="text-xs text-gray-400">
              You will be redirected to WhatsApp, to talk to our customer care
              representative.
            </span>
          </div>
          <div className="flex justify-between">
            <div className="mx-4 my-5 w-full">
              <a
                className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white hover:text-white"
                href={`https://rebrand.ly/tendosupport`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp size={24} className="mr-2" />
                Confirm Order
              </a>
            </div>
            <div className="mx-4 my-5 w-full">
              <button
                className="w-full flex justify-center py-4 px-4 border border-transparent lg:text-base font-medium rounded-md bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-white text-sm"
                type="button"
                onClick={goHome}
              >
                Continue Shopping
              </button>
            </div>
          </div>
          <div className="mx-4 my-2 p-3 bg-blue-600 bg-opacity-10 rounded-sm border-1 text-blue-400 flex flex-col">
            <div className="text-xs">
              <p>Processing Fee: </p>
            </div>
            <p>
              We charge a 10% processing fee on reseller profits only. This is
              to enable us cover the transaction costs involved in paying
              suppliers, logistics companies and resellers.{" "}
            </p>
          </div>

          <div className="flex flex-col p-4"></div>
          <div className="text-center px-4 py-2">
            <span className="text-base text-white font-normal">
              You will receive an alert when the supplier accepts your order. In
              the meantime you can check the status of an existing order here:
            </span>
          </div>
          <div className="mx-4 my-5">
            <button
              type="button"
              className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-blue-500"
              style={{
                backgroundColor: "rgba(33, 150, 243, 0.118)",
                borderColor: "rgba(33, 150, 243, 0.118)",
              }}
              onClick={() => history.push("/myorders")}
            >
              <FiTruck size={24} className="mr-2" /> Check Status of Existing
              Orders
            </button>
          </div>
          <div className="flex justify-between px-4 pb-2">
            <span className="font-bold text-sm text-white">Delivery Rate</span>
          </div>
          {loading && deliveryLocations.length && (
            <div className="flex justify-center items-center">
              <Spin indicator={antIcon} />
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 mx-4 mb-14">
            {deliveryLocations.length &&
              deliveryLocations.map((rate, idx) => (
                <DeliveryRateCard rate={rate} key={idx + 1} />
              ))}
          </div>
        </div>
      </ScreenWrapper>
    </>
  );
};

export default OrderConfirm;

export const DeliveryRateCard = ({ rate }) => {
  return (
    <>
      <div className="w-full rounded-lg flex flex-col p-4 justify-start bg-gray-800">
        <div>
          <span className="text-sm text-white font-medium my-1">
            {rate.locations}
          </span>
        </div>
        <div>
          <span className="text-xs text-gray-400 my-1">
            {rate.deliveryRateGhs}
          </span>
        </div>
      </div>
    </>
  );
};
