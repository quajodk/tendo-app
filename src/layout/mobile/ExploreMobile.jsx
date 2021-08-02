import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { gDriveFileId, isSafari } from "../../utils/utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { ImageWithLoading } from "./ProductListing";
import ScreenWrapper from "../../components/ScreenWrapper";
import useSheetData from "../../hooks/useSheetData";
import DataPagination from "../DataPagination";

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
  const copyOfExploreProducts = useSelector(
    (state) => state.copyOfExploreProducts
  );
  const searchTerm = useSelector((state) => state.searchTerm);
  const dispatch = useDispatch();

  const init = useRef({ dispatch });

  useEffect(() => {
    const { dispatch } = init.current;
    mobileExploreProducts.length === 0 &&
      dispatch({
        type: "getMobileExploreProducts",
        payload: data,
      });

    data.length &&
      dispatch({
        type: "saveCopyOfExploreProducts",
        payload: data,
      });
  }, [data, mobileExploreProducts.length]);

  const search = () => {
    if (mobileExploreProducts.length !== 0) {
      const filteredProduct = originalMobileExploreProducts.filter(
        (x) =>
          x.glideStatus === "TRUE" &&
          (x?.product?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            x?.skUs?.toLowerCase().includes(searchTerm.toLowerCase()))
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

  const onSearchClear = () => {
    dispatch({
      type: "updateMobileExploreProducts",
      payload: copyOfExploreProducts,
    });
  };

  return (
    <ScreenWrapper
      title="Explore"
      searchFunction={search}
      clearSearchFunction={onSearchClear}
    >
      {loading && mobileExploreProducts.length === 0 ? (
        <div className="flex justify-center items-center h-full">
          <Spin indicator={antIcon} />
        </div>
      ) : (
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-4 mx-4">
          {/* {mobileExploreProducts.map((item) =>
            item.glideStatus === "TRUE" ? (
              <ExploreCard item={item} key={item.id} />
            ) : null
          )} */}
          {/* @TODO: testing pagination */}
          <DataPagination
            RenderComponent={ExploreCard}
            data={mobileExploreProducts}
            dataLimit={20}
          />
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

  return (
    <>
      <Link
        to={`/product/${item.product?.replace("/", "$")}`}
        onClick={selectProduct}
      >
        <div onClick={selectProduct}>
          <div className="rounded-lg flex flex-col overflow-hidden">
            <div className="h-32">
              <ImageWithLoading src={item?.newImageServerLink} />
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
                &#8358; {item.wholesale}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
