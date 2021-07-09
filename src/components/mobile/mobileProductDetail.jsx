import React, { useEffect, useRef, useState } from "react";
import {
  FiClipboard,
  FiImage,
  FiShoppingCart,
  FiCheckSquare,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { ImageWithLoading } from "../../layout/mobile/ProductListing";
import { gDriveFileId, isSafari, request } from "../../utils/utils";
import ScreenWrapper from "../ScreenWrapper";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Link, useHistory } from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ProductDetailsBody = () => {
  const { productName } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const selectedMobileItem = useSelector((state) => state.mobileProductSelect);
  const auth = useSelector((state) => state.auth);
  const init = useRef({
    dispatch,
  });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1224 });
  let history = useHistory();

  useEffect(() => {
    const { dispatch } = init.current;
    !selectedMobileItem &&
      request({
        url: `https://api.sheety.co/a565db2f5f48f6cbd0782a1342697a80/tendoGhanaGlide/evansHome?filter[product]=${productName.replace(
          "$",
          "/"
        )}&filter[glideStatus]=TRUE`,
        method: "GET",
      })
        .then((res) => {
          setLoading(false);

          dispatch({
            type: "selectMobileProduct",
            payload: res?.evansHome[0],
          });
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
  }, [productName, selectedMobileItem]);

  const orderProduct = () => {
    if (!auth) {
      dispatch({
        type: "toggleMobileSignUp",
      });
    }
    dispatch({
      type: "toggleOrderForm",
      payload: selectedMobileItem,
    });
    return history.push("/product/order");
  };

  if (loading && !selectedMobileItem) {
    return (
      <ScreenWrapper
        // title={isTabletOrMobile ? selectedMobileItem.product : ""}
        showBackBtn
      >
        <div className="flex justify-center items-center h-screen">
          <Spin indicator={antIcon} />
        </div>
      </ScreenWrapper>
    );
  }

  const imageSrc = isSafari()
    ? `https://drive.google.com/thumbnail?id=${gDriveFileId({
        gURL: selectedMobileItem?.titleImage,
      })}`
    : `https://drive.google.com/uc?id=${gDriveFileId({
        gURL: selectedMobileItem?.titleImage,
      })}`;

  const message = `Hi I would like to check the availability of the product with SKU ${selectedMobileItem?.skUs} on TendoGh 🇬🇭 App`;

  // const check = () => {
  //   const message = `Hi I would like to check the availability of the product with SKU ${selectedMobileItem?.skUs} on TendoGh 🇬🇭 App`;
  //   window.open(`https://wa.me/+233503247275/?text=${message}`, "blank");
  // };

  return (
    <ScreenWrapper
      title={isTabletOrMobile ? selectedMobileItem.product : ""}
      showBackBtn
    >
      <div className="min-h-max lg:grid lg:grid-cols-2 overflow-y-scroll">
        <div className="px-5 py-5">
          <div className="mx-2 my-4 relative rounded-lg overflow-hidden">
            <ImageWithLoading src={imageSrc} />
          </div>
        </div>
        <div>
          <div className="px-2 py-4">
            <p className="text-white font-bold text-base">
              {selectedMobileItem?.product}
            </p>
          </div>
          <div
            className="px-2 py-4"
            style={{
              position: "relative",
              transition: "background-color 250ms ease-out 0s",
              display: "flex",
              alignItems: "center",
              minHeight: "3.375rem",
            }}
          >
            <div
              style={{
                textDecoration: "none",
                flexGrow: 1,
                flexShrink: 1,
                width: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p
                className="text-sm font-normal text-gray-500"
                style={{
                  textOverflow: "inherit",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflow: "visible",
                }}
              >
                Supplier Name
              </p>
              <p className="text-sm font-medium text-white">
                {" "}
                {selectedMobileItem?.supplierGenericNameGh}
              </p>
            </div>
          </div>
          <p className="px-2 py-4 text-base font-medium text-white">
            {" "}
            GHS {selectedMobileItem?.wholesale}
          </p>
          <hr className="my-4 mx-2" />
          <div
            style={{
              position: "relative",
              padding: "8px 16px",
              transition: "background-color 250ms ease-out 0s",
              display: "flex",
              alignItems: "center",
              minHeight: "3.375rem",
            }}
          >
            <div
              style={{
                textDecoration: "none",
                flexGrow: 1,
                flexShrink: 1,
                width: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p
                className="text-sm font-medium text-gray-500"
                style={{
                  textOverflow: "inherit",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflow: "visible",
                }}
              >
                Description
              </p>
              <p
                className="text-sm font-normal text-white"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {" "}
                {`${
                  selectedMobileItem &&
                  selectedMobileItem["cleanDescriptionWith\n\nSkUs"]
                }`}
              </p>
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                color: "rgb(33, 150, 243)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(33, 150, 243, 0.118)",
                minWidth: "40px",
                marginLeft: "10px",
                flexShrink: 0,
              }}
              onClick={() => {
                navigator.clipboard.writeText(
                  selectedMobileItem &&
                    selectedMobileItem["cleanDescriptionWith\n\nSkUs"]
                );
              }}
            >
              <FiClipboard size={24} />
            </div>
          </div>
          <div className="mx-4 my-2">
            <a
              href={selectedMobileItem?.imageLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-blue-500"
              style={{
                backgroundColor: "rgba(33, 150, 243, 0.118)",
                borderColor: "rgba(33, 150, 243, 0.118)",
              }}
            >
              <div className="flex flex-row">
                <FiImage size={24} className="mr-2" />
                View Product Gallery
              </div>
            </a>
          </div>

          <div
            style={{
              position: "relative",
              padding: "8px 16px",
              transition: "background-color 250ms ease-out 0s",
              display: "flex",
              alignItems: "center",
              minHeight: "3.375rem",
            }}
          >
            <div
              style={{
                textDecoration: "none",
                flexGrow: 1,
                flexShrink: 1,
                width: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <p
                className="text-sm font-medium text-gray-500"
                style={{
                  textOverflow: "inherit",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  overflow: "visible",
                }}
              >
                Product SKU
              </p>
              <p className="text-base font-semibold text-white">
                {selectedMobileItem?.skUs}
              </p>
            </div>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                color: "rgb(33, 150, 243)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(33, 150, 243, 0.118)",
                minWidth: "40px",
                marginLeft: "10px",
                flexShrink: 0,
              }}
              onClick={() => {
                navigator.clipboard.writeText(selectedMobileItem?.skUs);
              }}
            >
              <FiClipboard size={24} />
            </div>
          </div>
          <a
            className="flex justify-between mt-4 mb-12 mx-4 text-blue-500 cursor-pointer"
            href={`https://wa.me/+233503247275/?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-medium uppercase">Check Availability</span>
            <FiCheckSquare size={24} />
          </a>
          {/* <div
            className="flex justify-between mt-4 mb-12 mx-4 text-blue-500 cursor-pointer"
            onClick={check}
          >
            <span className="font-medium uppercase">Check Availability</span>
            <FiCheckSquare size={24} />
          </div> */}
          <div className="mx-4 mt-8 mb-20">
            <Link
              to="/product/order"
              className="w-full flex justify-center py-4 px-4 border border-transparent text-base font-medium rounded-md blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 text-blue-500"
              style={{
                backgroundColor: "rgba(33, 150, 243, 0.118)",
                borderColor: "rgba(33, 150, 243, 0.118)",
              }}
              onClick={orderProduct}
            >
              <FiShoppingCart size={24} className="mr-2" />
              Order Product
            </Link>
          </div>
          <div className="h-24 lg:h-0 mt-20 lg:mt-0"></div>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default ProductDetailsBody;
