import React, { useEffect, useRef } from "react";
import ScreenWrapper from "../ScreenWrapper";
import { useDispatch, useSelector } from "react-redux";
import useSheetData from "../../hooks/useSheetData";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { DeliveryRateCard } from "./orderConfirm";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const DeliveryPrices = () => {
  const [data, loading] = useSheetData({ sheet: "deliveryLocations" });
  const deliveryLocations = useSelector((state) => state.deliveryLocations);
  const dispatch = useDispatch();
  const init = useRef({ dispatch });

  useEffect(() => {
    const { dispatch } = init.current;
    dispatch({
      type: "getDeliveryRate",
      payload: data,
    });
  }, [data]);

  if (loading && deliveryLocations.length === 0) {
    return (
      <ScreenWrapper title="orders" showBackBtn>
        <div className="flex justify-center items-center h-screen">
          <Spin indicator={antIcon} />
        </div>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper title="Delivery Prices" showBackBtn>
      <div className="w-screen flex-1 overflow-y-scroll bg-tendo-bg z-20">
        <div className="grid grid-cols-1 gap-4 mx-4 mb-14 lg:pb-0 pb-16">
          {deliveryLocations.length &&
            deliveryLocations.map((rate, idx) => (
              <DeliveryRateCard rate={rate} key={idx + 1} />
            ))}
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default DeliveryPrices;
