import React from "react";

const ProductListing = ({ items }) => {
  return (
    <>
      <div className="flex flex-col w-full">
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
  return (
    <>
      <div className="m-4">
        <div className="rounded-lg">
          <div
            className="w-full relative"
            style={{
              paddingBottom: "33.3333%",
            }}
          >
            <img src={item.titleImage} alt="" />
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
