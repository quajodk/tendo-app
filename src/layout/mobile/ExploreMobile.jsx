import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gDriveFileId, isSafari } from "../../utils/utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { ImageWithLoading } from "./ProductListing";
import ScreenWrapper from "../../components/ScreenWrapper";
import useSheetData from "../../hooks/useSheetData";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ExploreMobile = () => {
  const [data, loading] = useSheetData({
    sheet: "evansExplore?filter[glideStatus]=TRUE",
    method: "GET",
  });
  const mobileExploreProducts = useSelector(
    (state) => state.mobileExploreProducts
  );
  const originalMobileExploreProducts = useSelector(
    (state) => state.originalMobileExploreProducts
  );
  const dispatch = useDispatch();

  const init = useRef({ dispatch });

  useEffect(() => {
    const { dispatch } = init.current;
    mobileExploreProducts.length === 0 &&
      dispatch({
        type: "getMobileExploreProducts",
        payload: data,
      });
  }, [data, mobileExploreProducts.length]);

  const search = (text) => {
    if (mobileExploreProducts.length !== 0) {
      const filteredProduct = originalMobileExploreProducts.filter(
        (x) =>
          x.glideStatus === "TRUE" &&
          (x?.product?.toLowerCase().includes(text.toLowerCase()) ||
            x?.skUs?.toLowerCase().includes(text.toLowerCase()))
      );

      dispatch({
        type: "updateMobileExploreProducts",
        payload: filteredProduct,
      });
    } else {
      dispatch({
        type: "updateMobileExploreProducts",
        payload: originalMobileExploreProducts,
      });
    }
  };

  return (
    <ScreenWrapper title="Explore" searchFunction={search}>
      {loading && mobileExploreProducts.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 mx-4">
          {mobileExploreProducts.map((item) =>
            item.glideStatus === "TRUE" ? (
              <ExploreCard item={item} key={item.id} />
            ) : null
          )}
        </div>
      )}
    </ScreenWrapper>
  );
};

export default ExploreMobile;

export const ExploreCard = ({ item }) => {
  const dispatch = useDispatch();

  const selectProduct = () => {
    dispatch({
      type: "selectMobileProduct",
      payload: item,
    });
  };

  const imageSrc = isSafari()
    ? `https://drive.google.com/thumbnail?id=${gDriveFileId({
        gURL: item.titleImage,
      })}`
    : `https://drive.google.com/uc?id=${gDriveFileId({
        gURL: item.titleImage,
      })}`;

  return (
    <>
      <Link
        to={`/product/${item.product?.replace("/", "$")}`}
        onClick={selectProduct}
      >
        <div onClick={selectProduct}>
          <div className="rounded-lg flex flex-col overflow-hidden">
            <div className="h-32">
              <ImageWithLoading src={imageSrc} />
            </div>
            <div
              className="flex flex-col p-3 flex-grow text-white"
              style={{ backgroundColor: "rgb(30, 34, 43)" }}
            >
              <div className="mb-1">
                <p className="text-xs font-bold text-blue-700 overflow-ellipsis uppercase whitespace-nowrap">
                  {item.supplierGenericNameGh}
                </p>
                <p className="font-normal text-sm overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {item.product}
                </p>
              </div>
              <div className="text-sm text-gray-400 font-normal">
                GHS {item.wholesale}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
