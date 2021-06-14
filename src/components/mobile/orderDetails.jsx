import React, { useEffect, useState } from "react";
import ScreenWrapper from "../ScreenWrapper";
import { ImageWithLoading } from "../../layout/mobile/ProductListing";
import { gDriveFileId, isSafari } from "../../utils/utils";
import { FiCheckCircle } from "react-icons/fi";
import axios from "axios";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const OrderDetails = () => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [imageLink, setImageLink] = useState("");

  const { orderNumber } = useParams();

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/mainOrderSheetNigeria/nigeriaOrders?filter[orderNumber]=${orderNumber}`,
      headers: {
        Authorization: "Bearer VGVuZG8gUmVzZWxsZXIkIDIwMjE=",
        Accept: "application/json",
      },
    }).then((res) => {
      console.log(res);
      setLoading(false);
      setOrder(res?.data);
      setImageLink("");
    });
  }, [orderNumber]);

  const imageSrc = isSafari()
    ? `https://drive.google.com/thumbnail?id=${gDriveFileId({
        gURL: imageLink,
      })}`
    : `https://drive.google.com/uc?id=${gDriveFileId({
        gURL: imageLink,
      })}`;

  if (loading && !order) {
    return (
      <ScreenWrapper title="orders" showBackBtn>
        <div className="flex justify-center items-center h-screen">
          <Spin indicator={antIcon} />
        </div>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper title={`Order - #${orderNumber}`} showBackBtn>
      <div className="min-h-max lg:grid lg:grid-cols-2 overflow-y-scroll">
        <div className="px-5 py-5">
          <div className="mx-2 my-4 relative rounded-lg overflow-hidden">
            <ImageWithLoading src={imageSrc} />
          </div>
        </div>
        <div>
          <div className="mx-4 mt-5 mb-20">
            <button
              type="button"
              className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-blue-500"
              style={{
                backgroundColor: "rgba(33, 150, 243, 0.118)",
                borderColor: "rgba(33, 150, 243, 0.118)",
              }}
              //   onClick={orderProduct}
            >
              Check Order Status
              <FiCheckCircle size={24} className="mr-2" />
            </button>
          </div>
          <div className="h-24 lg:h-0 mt-16 lg:mt-0"></div>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default OrderDetails;
