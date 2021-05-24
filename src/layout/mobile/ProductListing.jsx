import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gDriveFileId } from "../../utils/utils";
import useSheetData from "../../hooks/useSheetData";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Link } from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const ProductListing = () => {
  const [data, loading] = useSheetData({
    sheet: "resellerCatalog",
  });
  const mobileProducts = useSelector((state) => state.mobileProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "getMobileProducts",
      payload: data,
    });
  }, [data, dispatch]);

  if (loading && mobileProducts.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin indicator={antIcon} />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {mobileProducts.map((item, idx) =>
          item.glideStatus === "TRUE" ? (
            <ProductCard item={item} key={idx} />
          ) : null
        )}
      </div>
    </>
  );
};

export default ProductListing;

export const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const selectProduct = () => {
    dispatch({
      type: "selectMobileProduct",
      payload: item,
    });
  };

  return (
    <>
      <Link to={`/${item.product.toLowerCase()}`} onClick={selectProduct}>
        <div className="mx-4">
          <div className="rounded-lg flex flex-col overflow-hidden">
            <div className="h-32">
              <img
                src={`https://drive.google.com/thumbnail?id=${gDriveFileId({
                  gURL: item.titleImage,
                })}`}
                alt="productImage"
                className="w-full h-full object-cover"
              />
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
