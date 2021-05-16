import React from "react";
import { useDispatch } from "react-redux";
import { gDriveFileId } from "../../utils/utils";

const ProductListing = ({ items }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {items
          ? items.map((item) =>
              item.glideStatus === "TRUE" ? (
                <ProductCard item={item} key={item.id} />
              ) : null
            )
          : "Loading"}
      </div>
    </>
  );
};

export default ProductListing;

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const selectProduct = () => {
    dispatch({
      type: "selectMobileProduct",
      payload: item,
    });
  };

  return (
    <>
      <div className="mx-4" onClick={selectProduct}>
        <div className="rounded-lg flex flex-col overflow-hidden">
          <div className="h-32">
            <img
              src={`https://drive.google.com/thumbnail?id=${gDriveFileId({
                gURL: item.titleImage,
              })}`}
              alt="productImage"
              className="w-full"
              style={{ objectFit: "contain" }}
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
    </>
  );
};
