import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gDriveFileId } from "../../utils/utils";
import useSheetData from "../../hooks/useSheetData";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { ImageWithLoading } from "./ProductListing";
import ScreenWrapper from "../../components/ScreenWrapper";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ExploreMobile = () => {
  const [data, loading] = useSheetData({ sheet: "resellerCatalog" });
  const mobileProducts = useSelector((state) => state.mobileProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "getMobileProducts",
      payload: data,
    });
  }, [data, dispatch]);

  return (
    <ScreenWrapper title="Explore">
      {loading && mobileProducts.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 mx-4">
          {mobileProducts.map((item) =>
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

  const imageSrc = `https://drive.google.com/thumbnail?id=${gDriveFileId({
    gURL: item.titleImage,
  })}`;

  return (
    <>
      <Link to={`/${item.product.toLowerCase()}`} onClick={selectProduct}>
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
